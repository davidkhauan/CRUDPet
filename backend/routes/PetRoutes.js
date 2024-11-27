const router = require ('express').Router()

const PetController = require ('../controllers/PetController')

const verifyToken = require ('../helpers/VerifyTokenHelper')
const { ImageUploadHelper } = require ('../helpers/ImageUploadHelper')

router.post ('/create', verifyToken, ImageUploadHelper.array ('images'), PetController.create)
router.post ('/', PetController.getAll)
router.get ('/mypets', verifyToken, PetController.getAllUserPets)
router.get ('/myadoptions', verifyToken,PetController.getAllUserrAdoptions)
router.patch ('/:id', PetController.getPetById)
router.delete ('/:id', verifyToken, PetController.removePetById)
router.patch ('/:id', verifyToken, ImageUploadHelper.array ('images'), PetController.updatePet)
router.patch ('/schedule/:id', verifyToken, PetController.scheduleAdoption)
router.patch ('/conclude/:id', verifyToken, PetController.concludeAdoption)

module.exports = router