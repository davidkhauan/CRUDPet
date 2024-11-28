import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import RoundedImage from "../../Layout/RoundedImage/RoundedImage";
import useFlashMessage from "../../../hooks/useFlashMessage";

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id) {
    let msgType = "success";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function concludeAdoption(id) {
    let msgType = "success";

    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Meus Pets Cadastrados</h1>
        <Link to="/pet/add" className="btn btn-primary">
          Cadastrar Pet
        </Link>
      </div>
      <div className="row">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                  className="card-img-top"
                  alt={pet.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>Ligue para:</strong> {pet.user.phone}
                    </div>
                    <div>
                      <strong>Fale com:</strong> {pet.user.name}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    {pet.available ? (
                      <>
                        {pet.adopter && (
                          <button
                            className="btn btn-warning"
                            onClick={() => concludeAdoption(pet._id)}
                          >
                            Concluir adoção
                          </button>
                        )}
                        <Link to={`/pet/edit/${pet._id}`} className="btn btn-secondary">
                          Editar
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => removePet(pet._id)}
                        >
                          Excluir
                        </button>
                      </>
                    ) : (
                      <p>Pet já adotado</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há pets cadastrados!</p>
        )}
      </div>
    </section>
  );
}

export default MyPets;
