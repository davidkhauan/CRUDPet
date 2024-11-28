import api from "../../../../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PetForm from "../../../Form/PetForm/PetFrom";
import useFlashMessage from "../../../../hooks/useFlashMessage";

function AddPet() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerPet(pet) {
    let msgType = "success";

    const formData = new FormData();

    Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    try {
      const response = await api.post('pets/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setFlashMessage("Pet cadastrado com sucesso!", msgType);
      navigate("/pets"); // Redireciona para a página de pets
      return response.data;
    } catch (error) {
      console.error(error);
      msgType = "error";
      setFlashMessage("Ocorreu um erro ao cadastrar o pet.", msgType);
    }
  }

  return (
    <section>
      <h1>Adicionar Pet</h1>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  );
}

export default AddPet;