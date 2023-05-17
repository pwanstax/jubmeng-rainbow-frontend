import axios from "axios";
import {useState, useEffect} from "react";
import ProductCard from "./ProductCard";

const SaveForLater = () => {
  const [myFavorites, setMyFavorites] = useState();
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVICE_DOMAIN}/user/save-for-later`,
          {
            withCredentials: true,
            headers: {user_id: sessionStorage.getItem("user_id")},
          }
        );

        setMyFavorites(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteProducts();
  }, []);
  return (
    <div className="myfavorite-container">
      {!myFavorites || !myFavorites.length ? (
        <>no product and no time to dev this condition</>
      ) : (
        <div className="myfavorite-wraper">
          {myFavorites.map((product, i) => {
            return (
              <div className="each-product" key={i}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SaveForLater;
