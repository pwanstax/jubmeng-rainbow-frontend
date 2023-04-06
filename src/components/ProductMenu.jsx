import React, {useState} from "react";

const ProductMenu = ({handleClick, setSearchQuery, searchQuery}) => {
  const [showModal, setShowModal] = useState(false); // Add state variable for modal display
  const [chosenPetCount, setChosenPetCount] = useState(1);
  const [chosenServiceCount, setChosenServiceCount] = useState(0);
  const [chosenArea, setChosenArea] = useState("");
  const handleSearchClick = () => {
    setSearchQuery(document.querySelector(".product-search input").value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
    }
  };

  const handleButtonClick = () => {
    setShowModal(true); // Display the modal when button is clicked
  };

  const handleModalClose = () => {
    setShowModal(false); // Hide the modal when it is closed
  };

  return (
    <div className="product-menu-container">
      <div className="product-search">
        <input
          type="text"
          placeholder="Find your service.."
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="product-menu">
        <div onClick={() => handleButtonClick()} className="pet product-button">
          <div className="text">
            <h2>Pets</h2>
            <div style={{height: chosenPetCount === 0 ? "10px" : undefined}}>
              {chosenPetCount > 0 ? `· ${chosenPetCount} selected` : ""}
            </div>
          </div>
          <i className="fa-solid fa-syringe"></i>
        </div>
        <hr />
        <div
          onClick={() => handleButtonClick()}
          className="service product-button"
        >
          <div className="text">
            <h2>Services</h2>
            <div
              style={{height: chosenServiceCount === 0 ? "10px" : undefined}}
            >
              {chosenServiceCount > 0 ? `· ${chosenServiceCount} selected` : ""}
            </div>
          </div>
          <i className="fa-solid fa-stethoscope"></i>
        </div>
        <hr />
        <div
          onClick={() => handleButtonClick()}
          className="area product-button"
        >
          <div className="text">
            <h2>Area</h2>
            <div style={{height: chosenArea === "" ? "10px" : undefined}}>
              {chosenArea ? `· ${chosenArea}` : ""}
            </div>
          </div>
          <i className="fa-solid fa-mountain-city"></i>
        </div>
        <hr />
        <div
          onClick={() => handleClick("friendly-place")}
          className="last product-button"
        >
          <i
            className="search fa-solid fa-magnifying-glass"
            onClick={handleSearchClick}
          ></i>
        </div>
      </div>
      {showModal && ( // Render modal if showModal state is true
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <p>Modal content goes here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMenu;
