import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import useFetch from "../useFetch";
import { PDT_URL } from "../Utils/Helper";
import "./SliderStyles/SliderStyles.css";
import CurrentProduct from "./CurrentProduct";
import CurrentProductModal from "./CurrentProductModal";

import React, { useEffect, useState } from "react";

const PdtSlider = ({
  cart,
  setCart,
  cartPrice,
  setCartPrice,
  uniqPdts,
  setUniqPdts,
}) => {
  const [data, isLoading, isError] = useFetch(PDT_URL);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log("DEBUG MODAL OPEN", open, index, data[index]);
  }, [open, index]);

  //   console.log(">>> PDT SLIDER", isLoading, data);
  return isLoading ? (
    <h2>loading...</h2>
  ) : (
    <div
      className="Slider"
      style={{
        width: "8%",
        paddingTop: "1.4%",
      }}
    >
      <Carousel centerMode centerSlidePercentage={50}>
        {data &&
          data.length &&
          data.slice(8, 30).map((it, index) => (
            <div>
              <CurrentProduct
                currentProductData={it}
                isCurrPdt={false}
                cart={cart}
                setCart={setCart}
                cartPrice={cartPrice}
                setCartPrice={setCartPrice}
                uniqPdts={uniqPdts}
                setUniqPdts={setUniqPdts}
                isSlider={true}
                //open props
                open={open}
                setItemOpen={setOpen}
                setIndex={setIndex}
                index={index}
              />
              {/* <span onClick={(e) => e.preventDefault()}>thing</span> */}
            </div>
          ))}
      </Carousel>
      <CurrentProductModal
        open={open}
        setOpen={setOpen}
        currentProductData={data[index + 8]}
        cart={cart}
        setCart={setCart}
        cartPrice={cartPrice}
        setCartPrice={setCartPrice}
        uniqPdts={uniqPdts}
        setUniqPdts={setUniqPdts}
      />
    </div>
  );
};

export default PdtSlider;
