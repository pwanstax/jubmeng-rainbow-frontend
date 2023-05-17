import axios from "axios";

export const checkLogin = async () => {
  if (sessionStorage.getItem("user_id")) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVICE_DOMAIN}/auth/check-login`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log("still have user_id but no jwt");
      return error;
    }
  } else {
    return false;
  }
};
