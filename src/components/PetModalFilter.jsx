import React from "react";
import {useNavigate} from "react-router-dom";

const PetModalFilter = ({
  showModal,
  setShowModal,
  petInputList,
  setPetInputList,
}) => {
  const toggleList = (array, item) => {
    // const index = array.indexOf(item);
    // if (index === -1) {
    //   array.push(item);
    // } else {
    //   array.splice(index, 1);
    // }
    // setPetInputList(array);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/clinic");
  };
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".modal") &&
      !event.target.closest(".service-button")
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
              <div onClick={() => toggleList(petInputList, "Dog")}>
                <i className="fa-solid fa-dog"></i>Dog
              </div>
              <div onClick={() => toggleList(petInputList, "Cat")}>
                <i className="fa-solid fa-cat"></i>Cat
              </div>
              <div onClick={() => toggleList(petInputList, "Fish")}>
                <i className="fa-solid fa-fish"></i>Fish
              </div>
              <div onClick={() => toggleList(petInputList, "Horse")}>
                <i className="fa-solid fa-horse"></i>Horse
              </div>
              <div onClick={() => toggleList(petInputList, "Otter")}>
                <i className="fa-solid fa-otter"></i>Otter
              </div>
              <div onClick={() => toggleList(petInputList, "Shrimp")}>
                <i className="fa-solid fa-shrimp"></i>Shrimp
              </div>
              <div onClick={() => toggleList(petInputList, "Kiwi")}>
                <i className="fa-solid fa-kiwi-bird"></i>Kiwi Bird
              </div>
              <div onClick={() => toggleList(petInputList, "Frog")}>
                <i className="fa-solid fa-frog"></i>Frog
              </div>
              <div onClick={() => toggleList(petInputList, "Spider")}>
                <i className="fa-solid fa-spider"></i>Spider
              </div>
              <div onClick={() => toggleList(petInputList, "Bird")}>
                <i className="fa-solid fa-dove"></i>Bird
              </div>
              <div onClick={() => toggleList(petInputList, "Cow")}>
                <i className="fa-solid fa-cow"></i>Cow
              </div>
              <div onClick={() => toggleList(petInputList, "Worm")}>
                <i className="fa-solid fa-worm"></i>Worm
              </div>
            </div>
            <button onClick={handleClick}>Let's go!</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetModalFilter;
