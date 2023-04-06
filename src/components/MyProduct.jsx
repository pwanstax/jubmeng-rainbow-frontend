import axios from "axios";
import {useState, useEffect} from "react";
import ProductCard from "./ProductCard";

const MyProduct = () => {
  const [myProducts, setMyProduct] = useState();
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const username = sessionStorage.getItem("username");
        const res = await axios.get(
          `http://localhost:8080/products/me/${username}`,
          {
            withCredentials: true,
          }
        );
        setMyProduct(res.data.myProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteProducts();
  }, []);
  return (
    <div className="myproduct-container">
      {!myProducts || !myProducts.length ? (
        <>no product and no time to dev this condition</>
      ) : (
        <div className="myproduct-wraper">
          {myProducts.map((product, i) => {
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

export default MyProduct;
