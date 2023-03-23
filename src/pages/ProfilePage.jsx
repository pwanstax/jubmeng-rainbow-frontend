import axios from "axios";
import {useEffect, useState} from "react";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [imageFile, setImageFile] = useState(null);
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

  // const handleLogout = async () => {
  //   sessionStorage.clear();
  //   const res = await axios.post(
  //     `http://localhost:8080/user/logout`,
  //     {
  //       cookie_name: "auth",
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   ); // change path to backend service

  //   alert(res.data);
  //   window.location.assign("/");
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInfo({
        ...userInfo,
        image: reader.result,
      });
    };

    if (file) {
      setImageFile(file); // Store the file object
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = sessionStorage.getItem("user_id");
        const res = await axios.post(
          `http://localhost:8080/user/info`,
          {
            id: id,
          },
          {
            withCredentials: true,
          }
        );
        const filtered = Object.fromEntries(
          Object.entries(res.data).filter(
            ([key, val]) => typeof val === "string"
          )
        );
        setUserInfo(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="profilepage-container">
      <div className="profile-container">
        <div className="content">
          <div className="profile card">
            <img className="profile-picture" src={userInfo.image} alt="" />
            {isEdit && (
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            )}
            <h2>{`${userInfo.firstName}`}</h2>
            <h2>{`${userInfo.lastName}`}</h2>
            <h4>{`@${userInfo.username}`}</h4>
          </div>
          <div className="menu card">
            <button>My profile</button>
            <button>Be a seller</button>
            <button>My bookmarks</button>
            {/* <button onClick={handleLogout}>Log out</button> */}
          </div>
        </div>
        <div className="content">
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
                              key === "username" ||
                              key === "email" ||
                              key === "image"
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
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
