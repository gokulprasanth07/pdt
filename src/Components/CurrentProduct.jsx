import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";

import CurrentProductModal from "./CurrentProductModal";
import ProductPriceSection from "./ProductPriceSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding-top: 32px;
  padding-left: 36px;
  padding-left: 132px;
  cursor: pointer;
`;

const RedCrossLine = styled.div`
  position: absolute;
  top: 12px;
  left: 36px;
  width: 30%;
  height: 20%;
  display: flex;
  border-top: 2px solid red;
  transform: rotate(150deg);
`;

const DiscountedPrice = styled.div`
  &:after {
    position: absolute;
    border-top: 1px solid black;
    transform: rotate(165deg);
  }
`;

const CurrentProduct = ({
  isSlider = false,
  currentProductData,
  isCurrPdt = true,
  cart,
  setCart,
  setItemOpen,
  setIndex,
  index,
  open: sliderItemOpen,
}) => {
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(false);

  // useEffect(() => console.log(">>> added", added), [added]);
  useEffect(() => console.log(cart), [cart]);

  const addQuantity = () => {
    setCart((prev) => ({
      ...prev,
      [currentProductData?.id]: (prev[currentProductData?.id] || 0) + 1,
    }));
  };

  const decreaseQty = () => {
    setCart((prev) => ({
      ...prev,
      [currentProductData?.id]: Math.max(
        (prev[currentProductData?.id] || 0) - 1,
        0
      ),
    }));
  };

  const makeQtyZero = () => {
    setCart((prev) => ({
      ...prev,
      [currentProductData?.id]: 0,
    }));
  };

  return (
    <Wrapper>
      <div
        onClick={() => {
          if (isSlider) {
            console.log(">>> inga dhaaaaan");

            setItemOpen(!sliderItemOpen);
            setIndex(index);
            console.log(">>> inga dhaaaaan");
          }
        }}
      >
        <img
          style={{ display: "flex" }}
          src={currentProductData && currentProductData?.images?.[3]}
          width="320"
          alt="pdt img"
          height="270"
          onClick={() => {
            console.log(">>> inga dhaaaaan");

            setOpen(!open);
          }}
        />
        <div
          style={{
            top: `${isCurrPdt ? "372px" : "36px"}`,
            position: "absolute",
            left: `${isCurrPdt ? "356px" : "272px"}`,
          }}
        >
          <Checkbox
            checked={
              cart &&
              currentProductData &&
              currentProductData?.id &&
              cart[currentProductData?.id] > 0
            }
            sx={{
              color: "black",
              "&.Mui-checked": {
                color: "black",
              },
            }}
            onChange={
              (cart &&
                currentProductData &&
                currentProductData?.id &&
                cart[currentProductData?.id] === 0) ||
              !cart[currentProductData?.id]
                ? addQuantity
                : makeQtyZero
            }
          />
        </div>
      </div>
      <div
        style={{ display: "flex", alignItems: "flex-end", paddingTop: "12px" }}
      >
        <Rating name="half-rating" defaultValue={4} precision={0.5} /> &nbsp; 1{" "}
      </div>
      <CurrentProductModal
        open={open}
        setOpen={setOpen}
        currentProductData={currentProductData}
        cart={cart}
        setCart={setCart}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlignLast: "left",
          paddingTop: "4px",
        }}
      >
        {" "}
        <div
          style={{ display: "flex", textAlign: "left", textAlignLast: "left" }}
        >
          <span style={{ fontWeight: "680" }}>This Item: &nbsp;</span>
          {currentProductData?.title}
        </div>
      </div>
      <ProductPriceSection
        currentProductData={currentProductData}
        RedCrossLine={RedCrossLine}
      />
      <div style={{ paddingTop: "12px" }}>
        {(cart &&
          currentProductData &&
          currentProductData?.id &&
          cart[currentProductData?.id] === 0 &&
          isSlider) ||
        !cart[currentProductData?.id] ? (
          <div
            onClick={addQuantity}
            style={{
              display: "flex",
              border: "1px solid lightgrey",
              borderRadius: "6px",
              width: "82%",
              paddingTop: "12px",
              paddingBottom: "12px",
              cursor: "pointer",
              background: "white",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              add to bundle
            </span>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid lightgrey",
              borderRadius: "6px",
              width: "82%",
              background: "white",
            }}
          >
            <div
              style={{
                paddingLeft: "14px",
                paddingRight: "14px",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
            >
              <span
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={decreaseQty}
              >
                -
              </span>
              <span
                style={{
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  fontSize: "24px",
                }}
              >
                {(cart &&
                  currentProductData &&
                  currentProductData?.id &&
                  cart[currentProductData?.id]) ||
                  0}
              </span>
              <span
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={addQuantity}
              >
                +
              </span>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CurrentProduct;
