import axios from "axios";
import {useState} from "react";

const MyProfile = ({userInfo, setUserInfo, isEdit, setIsEdit, imageFile}) => {
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleChange = (event) => {
    const {name, value} = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const submitUserInfo = async () => {
    try {
      const id = sessionStorage.getItem("user_id");
      const formData = new FormData();
      formData.append("id", id);

      for (const [key, value] of Object.entries(userInfo)) {
        formData.append(key, value);
      }

      if (imageFile) {
        console.log("in");
        formData.append("image", imageFile);
      }

      await axios.patch(`http://localhost:8080/user/info`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toggleIsEdit();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="detail card">
      <div className="header">
        <h2>My profile</h2>
        <button onClick={isEdit ? submitUserInfo : toggleIsEdit}>
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
      <div className="info-container">
        {userInfo &&
          Object.keys(userInfo).map((key, index) => {
            return key !== "image" ? (
              <div className="text" key={index}>
                <div className="label">{key}</div>
                <div className="value">
                  {isEdit ? (
                    <input
                      id={key}
                      name={key}
                      className=""
                      value={userInfo[key]}
                      onChange={handleChange}
                      disabled={
                        key === "username" || key === "email" || key === "image"
                      }
                    />
                  ) : (
                    <h4>{userInfo[key]}</h4>
                  )}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
      </div>
    </div>
  );
};

export default MyProfile;
