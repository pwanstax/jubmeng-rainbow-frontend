import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MyProfile from "../components/MyProfile";
import MyProduct from "../components/MyProduct";
import SaveForLater from "../components/SaveForLater";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [menu, setMenu] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const changeParamsMenu = (event) => {
    searchParams.set("menu", event.target.value);
    setSearchParams(searchParams);
  };
  const menus = {
    me: "Profile",
    favorite: "Favorites",
    product: "My products",
    logout: "Logout",
  };

  // const handleLogout = async () => {
  //   sessionStorage.clear();
  //   const res = await axios.post(
  //     `${process.env.REACT_APP_SERVICE_DOMAIN}/auth/logout`,
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
          `${process.env.REACT_APP_SERVICE_DOMAIN}/user/info`,
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
  useEffect(() => {
    if (
      searchParams.get("menu") === null ||
      !(searchParams.get("menu") in menus)
    ) {
      searchParams.set("menu", "me");
      setSearchParams(searchParams);
    }
    setMenu(searchParams.get("menu"));
  }, [searchParams, setSearchParams]);

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
            {Object.keys(menus).map((key) => {
              return (
                <button
                  value={key}
                  key={`${key}-${menus[key]}`}
                  className={key === menu ? "selected" : ""}
                  onClick={changeParamsMenu}
                >
                  {menus[key]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="content">
          {menu === "me" && (
            <MyProfile
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              imageFile={imageFile}
            />
          )}
          {menu === "product" && <MyProduct />}
          {menu === "favorite" && <SaveForLater />}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
