import React, {useState, useEffect} from "react";

const PetModalFilter = ({
  showModal,
  setShowModal,
  petInputList,
  setPetInputList,
  ref,
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
  console.log(petInputList);

  return (
    <>
      {showModal && (
        <div
          className="modal-container"
          style={{display: showModal ? "flex" : "none"}}
        >
          <div ref={ref}>
            <h1>Type of pet ?!</h1>
            <div className="pet">
              <div onClick={() => toggleList(petInputList, "Dog")}>
                <i class="fa-solid fa-dog"></i>Dog
              </div>
              <div onClick={() => toggleList(petInputList, "Cat")}>
                <i class="fa-solid fa-cat"></i>Cat
              </div>
              <div onClick={() => toggleList(petInputList, "Fish")}>
                <i class="fa-solid fa-fish"></i>Fish
              </div>
              <div onClick={() => toggleList(petInputList, "Horse")}>
                <i class="fa-solid fa-horse"></i>Horse
              </div>
              <div onClick={() => toggleList(petInputList, "Otter")}>
                <i class="fa-solid fa-otter"></i>Otter
              </div>
              <div onClick={() => toggleList(petInputList, "Shrimp")}>
                <i class="fa-solid fa-shrimp"></i>Shrimp
              </div>
              <div onClick={() => toggleList(petInputList, "Kiwi")}>
                <i class="fa-solid fa-kiwi-bird"></i>Kiwi Bird
              </div>
              <div onClick={() => toggleList(petInputList, "Frog")}>
                <i class="fa-solid fa-frog"></i>Frog
              </div>
              <div onClick={() => toggleList(petInputList, "Spider")}>
                <i class="fa-solid fa-spider"></i>Spider
              </div>
              <div onClick={() => toggleList(petInputList, "Bird")}>
                <i class="fa-solid fa-dove"></i>Bird
              </div>
              <div onClick={() => toggleList(petInputList, "Cow")}>
                <i class="fa-solid fa-cow"></i>Cow
              </div>
              <div onClick={() => toggleList(petInputList, "Worm")}>
                <i class="fa-solid fa-worm"></i>Worm
              </div>
            </div>
            <button onClick={() => setShowModal(!showModal)}>Let's go!</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetModalFilter;
