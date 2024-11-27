const ObjectId = require ('mongoose').Types.ObjectId

const Pet = require ('../models/PetModel')

const getTokenHelper = require ('../helpers/GetTokenHelper')
const getUserByTokenHelper = require ('../helpers/GetUserByTokenHelper')

class PetController {
    static async create (requisition, response) {
        const { name, age, weight, color } = requisition.body
        const images = requisition.files || []
        const available = true

        if (!name) {
            return response.status (422).json ({ message: 'O nome é obrigatório!' })
        }
        if (!age) {
            return response.status (422).json ({ message: 'A idade é obrigatória!' })
        }
        if (!weight) {
            return response.status (422).json ({ message: 'O peso é obrigatório!' })
        }
        if (!color) {
            return response.status (422).json ({ message: 'A cor é obrigatória!' })
        }
        if (images.length === 0) {
            return response.status (422).json ({ message: 'A imagem é obrigatória!' })
        }

        const token = getTokenHelper (requisition)
        const user = await getUserByTokenHelper (token)

        const pet = new Pet ({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.forEach ((image) => {
            pet.images.push (image.filename)
        })

        try {
            const newPet = await pet.save()
            return response.status (201).json ({ message: "Pet cadastrado com sucesso!", newPet })
        } catch (error) {
            return response.status (500).json ({ message: error.message })
        }
    }

    static async getAll (requisition, response) {
        const pets = await Pet.find().sort ('-createdAt')

        return response.status (200).json ({ pets: pets })
    }

    static async getAllUserPets (requisition, response) {
        const token = getTokenHelper (requisition)
        const user = await getUserByTokenHelper (token)

        const pets = await Pet.find ({ 'user._id': user._id }).sort ('-createdAt')

        return response.status (200).json ({ pets: pets })
    }

    static async getAllUserrAdoptions (requisition, response) {
        const token = getTokenHelper (requisition)
        const user = await getUserByTokenHelper (token)

        const pets = await Pet.find ({ 'adopter._id': user._id }).sort ('-createdAt')

        return response.status (200).json ({ pets: pets })
    }

    static async getPetById (requisition, response) {
        const id = requisition.params.id

        if (!ObjectId.isValid (id)) {
            return response.status (422).json ({ message: 'ID inválido!' })
        }

        const pet = await Pet.findOne ({ _id: id })

        if (!pet) {
            return response.status (404).json ({ message: 'Pet não encontrado!' })
        }

        return response.status (200).json ({ pet: pet })
    }

    static async removePetById (requisition, response) {
        const id = requisition.params.id

        if (!ObjectId.isValid (id)) {
            return response.status (422).json ({ message: 'ID inválido!' })
        }

        const pet = await Pet.findOne ({ _id: id })

        if (!pet) {
            return response.status (404).json ({ message: 'Pet não encontrado!' })
        }

        const token = getTokenHelper (requisition)
        const user = await getUserByTokenHelper (token)

        if (pet.user._id.toString() !== user._id.toString()) {
            return response.status (403).json ({ message: 'Problema de solitação, tente novamente!' })
        }

        await Pet.findByIdAndDelete (id)

        return response.status (204).json ({ message: 'Pet removido com sucesso!' })
    }

    static async updatePet (requisition, response) {
        const id = requisition.params.id

        const { name, age, weight, color, available } = requisition.body

        const images = requisition.files

        const updatedData = {}

        const pet = await Pet.findOne ({ _id: id })

        if (!pet) {
            return response.status (404).json ({ message: 'Pet não encontrado!' })
        }

        const token = getTokenHelper (requisition)
        const user = await getUserByTokenHelper (token)

        if (pet.user._id.toString() !== user._id.toString()) {
            return response.status (403).json ({ message: 'Problema de solitação, tente novamente!' })
        }

        if (!name) {
            return response.status (422).json ({ message: 'O nome é obrigatório!' })
        } else {
            updatedData.name = name
        }
        if (!age) {
            return response.status (422).json ({ message: 'A idade é obrigatória!' })
        } else {
            updatedData.age = age
        }
        if (!weight) {
            return response.status (422).json ({ message: 'O peso é obrigatório!' })
        } else {
            updatedData.weight = weight
        }
        if (!color) {
            return response.status (422).json ({ message: 'A cor é obrigatória!' })
        } else {
            updatedData.color = color
        }
        if (images.length === 0) {
            return response.status (422).json ({ message: 'A imagem é obrigatória!' })
        } else {
            updatedData.images = []
            images.forEach ((image) => {
                updatedData.images.push (image.filename)
            })
        }

        await Pet.findByIdAndUpdate (id, updatedData)

        return response.status (204).json ({ message: 'Pet atualizado com sucesso!' })
    }

    static async scheduleAdoption (requisition, response) {
        const id = requisition.params.id

        const pet = await Pet.findOne ({ _id: id })

        if (!pet) {
            return response.status (404).json ({ message: 'Pet não encontrado!' })
        }

        const token = getTokenHelper (requisition)
        const user = await getUserByTokenHelper (token)

        if (pet.user._id.equals (user._id)) {
            return response.status (422).json ({ message: 'Você não pode agendar uma visita com o seu próprio Pet!' })
        }

        if (pet.adopter) {
            if (pet.adopter._id.equals (user._id)) {
                return response.status (422).json ({ message: 'Você já agendou uma visita com esse Pet!' })
            }
        }

        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate (id, pet)

        return response.status (204).json (
            { message: `Visita agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}` }
        )
    }

    static async concludeAdoption (requisition, response) {
        const id = requisition.params.id

        const pet = await Pet.findOne ({ _id: id })

        if (!pet) {
            return response.status (404).json ({ message: 'Pet não encontrado!' })
        }

        const token = getTokenHelper (requisition)
        const user = await getUserByTokenHelper (token)

        if (pet.user._id.toString() === user._id.toString()) {
            return response.status (422).json ({ message: 'Erro de solicitação, tente novamente!' })
        }

        pet.available = false

        await Pet.findByIdAndUpdate (id, pet)

        return response.status (200).json ({ message: 'Adoção concluída com sucesso!' })
    }
}

module.exports = PetController
