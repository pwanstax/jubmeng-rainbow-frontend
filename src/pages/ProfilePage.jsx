import axios from "axios";
import {useEffect, useState} from "react";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
      const res = await axios.patch(
        `http://localhost:8080/user/info`,
        {
          id: id,
          ...userInfo,
        },
        {
          withCredentials: true,
        }
      );
      toggleIsEdit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    const res = await axios.post(
      `http://localhost:8080/user/logout`,
      {
        cookie_name: "auth",
      },
      {
        withCredentials: true,
      }
    ); // change path to backend service

    alert(res.data);
    window.location.assign("/");
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
        console.log(res.data);
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
            <h2>{`${userInfo.firstName}`}</h2>
            <h2>{`${userInfo.lastName}`}</h2>
            <h4>{`@${userInfo.username}`}</h4>
          </div>
          <div className="menu card">
            <button>My profile</button>
            <button>Be a seller</button>
            <button>My bookmarks</button>
            <button onClick={handleLogout}>Log out</button>
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
                  return (
                    <div className="text" key={`${key}`}>
                      <div className="label">{key}</div>
                      <div className="value">
                        {isEdit ? (
                          <input
                            id={`${key}`}
                            name={`${key}`}
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
