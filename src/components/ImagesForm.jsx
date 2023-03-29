import React, {useState, useEffect} from "react";

const ImagesForm = ({setData, step, setStep}) => {
  const [newImages, setNewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState();
  const atLeast = 5;
  useEffect(() => {
    if (newImages.length < 1) return;
    const URLs = [];
    newImages.forEach((image) => URLs.push(URL.createObjectURL(image)));
    setImages(images.concat(URLs));
    setImageFiles(imageFiles.concat(newImages));
  }, [newImages]);

  const handleImage = async (event) => {
    const {name, files} = event.target;
    setNewImages([...files]);
    validateImage(event);
  };
  const validateImage = (event) => {
    let {name, files} = event.target;
    if (images.length + files.length < atLeast) {
      setError(`Please insert at least ${atLeast} images.`);
    } else {
      setError("");
    }
  };
  const removeImage = (e) => {
    e.preventDefault();
    const idx = parseInt(e.target.name);
    const temp = [...images];
    const temp2 = [...imageFiles];
    temp.splice(idx, 1);
    temp2.splice(idx, 1);
    if (images.length - 1 < atLeast) {
      setError(`Please insert at least ${atLeast} images.`);
    } else {
      setError("");
    }

    setImages(temp);
    setImageFiles(temp2);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < atLeast) {
      setError(`Please insert at least ${atLeast} images.`);
      return;
    } else {
      setError("");
    }
    setData(imageFiles);
    setStep(step + 1);
  };
  return (
    <div className="images-form">
      <div className="form">
        <div className="control">
          <label>
            Images<span className="required"> *</span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImage}
            onBlur={validateImage}
            accept="image/png, image/gif, image/jpeg"
            style={{width: "95px"}}
          />
        </div>
        {/* <hr className="line-between"></hr> */}
        <div className="images">
          {images.map((value, index) => {
            return (
              <div>
                <button
                  name={index}
                  className="delete-img"
                  onClick={removeImage}
                >
                  delete
                </button>
                <img src={value} />
              </div>
            );
          })}
        </div>
        {error && <span className="error">{error}</span>}
        <button type="submit" className="btn submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ImagesForm;
