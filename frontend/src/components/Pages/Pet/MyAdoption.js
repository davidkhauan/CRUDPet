import api from "../../../utils/api";
import { useState, useEffect } from "react";
// import RoundedImage from "../../Layout/RoundedImage/RoundedImage";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <h1>Minhas Adoções</h1>
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
                  <p className="card-text">
                    <strong>Ligue para:</strong> {pet.user.phone}
                  </p>
                  <p className="card-text">
                    <strong>Fale com:</strong> {pet.user.name}
                  </p>
                  <div className="d-flex justify-content-between">
                    {pet.available ? (
                      <p className="text-warning">Adoção em processo</p>
                    ) : (
                      <p className="text-success">Parabéns por concluir a adoção</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há pets adotados!</p>
        )}
      </div>
    </section>
  );
}

export default MyAdoptions;
