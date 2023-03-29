import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const PetModalFilter = ({showModal, setShowModal, pickService}) => {
  const pets = [
    {
      name: "Dog",
      icon: "fa-dog",
    },
    {
      name: "Cat",
      icon: "fa-cat",
    },
    {
      name: "Fish",
      icon: "fa-fish",
    },
    {
      name: "Horse",
      icon: "fa-horse",
    },
    {
      name: "Otter",
      icon: "fa-otter",
    },
    {
      name: "Shrimp",
      icon: "fa-shrimp",
    },
    {
      name: "Kiwi Bird",
      icon: "fa-kiwi-bird",
    },
    {
      name: "Frog",
      icon: "fa-frog",
    },
    {
      name: "Spider",
      icon: "fa-spider",
    },
    {
      name: "Bird",
      icon: "fa-dove",
    },
    {
      name: "Cow",
      icon: "fa-cow",
    },
    {
      name: "Worm",
      icon: "fa-worm",
    },
  ];
  const navigate = useNavigate();
  const [petInputList, setPetInputList] = useState([]);

  const toggleList = (array, item) => {
    const index = array.indexOf(item);
    if (index === -1) {
      array.push(item);
    } else {
      array.splice(index, 1);
    }
    setPetInputList([...array]);
  };
  const handleClick = () => {
    const petsString = petInputList.join("%2C");
    navigate(`/${pickService}?pets=${petsString}`);
  };
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".modal") &&
      !event.target.closest(".service-button") &&
      event.target.className !== "product-button"
    ) {
      setShowModal(false);
    }
  });
  return (
    <>
      {showModal && (
        <div
          className="modal-container"
          style={{display: showModal ? "flex" : "none"}}
        >
          <div className="modal">
            <h1>Type of pet ?!</h1>
            <div className="pet">
              {pets.map((pet) => (
                <div
                  key={pet.name}
                  onClick={() =>
                    toggleList(petInputList, pet.name.toLowerCase())
                  }
                  className={`pet-item ${
                    petInputList.includes(pet.name.toLowerCase())
                      ? "selected"
                      : ""
                  }`}
                >
                  <i className={`fa-solid ${pet.icon}`}></i>
                  {pet.name}
                </div>
              ))}
            </div>
            <button onClick={handleClick}>Let's go!</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetModalFilter;
