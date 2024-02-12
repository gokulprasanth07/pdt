import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slider from "./Slider";

import TabsComponent from "./TabsComponent";
import Description from "./Description";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
// import Divider from "@mui/material/Divider";

import Rating from "@mui/material/Rating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const Divider = styled.div`
  width: 100%;
  background: lightgray;
  height: 1.75px;
`;

const FilledDrive = styled.div`
  display: flex;
  width: 30%;
  justifyitems: center;
  height: 32px;
  background: #d80a00;
  border-radius: 4px;
  margin-top: 12px;
`;

const RedRadioColor = styled.div`
  width: 34px;
  height: 34px;
  background: #d80a00;
  border-radius: 50%;

  border: ${({ $selected }) => ($selected ? "3px solid white" : "none")};
  box-shadow: ${({ $selected }) =>
    $selected ? "0px 0px 0px 2px #d80a00" : "none"};
`;

const BlackRadioColor = styled.div`
  width: 34px;
  height: 34px;
  background: black;
  border-radius: 50%;

  border: ${({ $selected }) => ($selected ? "3px solid white" : "none")};
  box-shadow: ${({ $selected }) =>
    $selected ? "0px 0px 0px 2px black" : "none"};
`;

export default function CurrentProductModal({
  open,
  setOpen,
  currentProductData,
  cart,
  setCart,
  cartPrice,
  setCartPrice,
  uniqPdts,
  setUniqPdts,
}) {
  const handleOpen = () => {
    setOpen(true);
    console.log(">>> opened");
    const currentPdtIntitialQty =
      (cart &&
        currentProductData?.id &&
        cart[currentProductData?.id] &&
        cart[currentProductData?.id]) ||
      0;
    console.log("currentPdtIntitialQty", currentPdtIntitialQty);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(">>> closed");
  }; //TODO :change value to false;

  const [currentTab, setCurrentTab] = useState("over-view");
  const [value, setValue] = React.useState("one");
  const [radio, setRadio] = useState("red");

  const [qty, setQty] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("TAB", newValue);
    setValue(newValue);
  };

  useEffect(() => {
    setQty(
      (cart &&
        currentProductData &&
        currentProductData.id &&
        cart[currentProductData?.id]) ||
        0
    );
    // console.log(">>> current product", currentProductData);
  }, []);

  useEffect(() => console.log(currentTab), [currentTab]);

  //   useEffect(() => console.log(">>> CART STATE:", cart), [cart]);

  const addQuantity = () => {
    setCart((prev) => {
      console.log(">>> qty", cart[currentProductData?.id]);
      return {
        ...prev,
        [currentProductData?.id]: cart[currentProductData?.id]
          ? cart[currentProductData?.id] + 1
          : 1,
      };
    });
  };

  const decreaseQty = () => {
    setCart((prev) => {
      console.log(">>> qty", cart[currentProductData?.id]);
      return {
        ...prev,
        [currentProductData?.id]: cart[currentProductData?.id]
          ? cart[currentProductData?.id] - 1
          : 0,
      };
    });
  };

  //   useEffect(() => {
  //     return () => setQty(0);
  //   });

  const cartClickHandler = () => {
    // console.log(">>> CART", currentProductData?.id, cart, uniqPdts);
    const currentProductID = currentProductData?.id;
    const tempCurrCartData = cart;
    if (qty === 0) {
      return;
    }
    tempCurrCartData[currentProductID] = qty;
    // console.log(">>> LOG:", tempCurrCartData);
    setCart(tempCurrCartData);
    // if (!uniqPdts?.includes(currentProductID)) {
    //   uniqPdts?.push(currentProductID);
    //   setCart([...cart, { id: currentProductID, qty: 1 }]);
    // }
  };

  //   console.log("modal >", currentProductData);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{ fontWeight: 600 }}
              variant="h4"
              component="h1"
            >
              {currentProductData?.title || " "}
            </Typography>
            <span style={{ cursor: "pointer" }}>
              <CloseIcon onClick={handleClose} />
            </span>
          </div>
          <Rating name="half-rating" defaultValue={4} precision={0.5} />
          <br />
          {/* tabs section */}
          <TabsComponent value={value} handleChange={handleChange} />
          <Divider />
          {/* */}
          <br /> <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15%",
              //   justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%" }}>
              {value === "one" ? (
                <Slider currentPd={currentProductData} />
              ) : (
                <Description />
              )}
            </div>
            <div style={{ minWidth: "400px" }}>
              <div className="price-section">
                <div
                  className="discounted-price"
                  style={{
                    position: "relative",
                    display: "flex",
                    width: "100px",
                    height: "20px",
                    paddingTop: "6px",
                    color: "grey",
                  }}
                >
                  Was
                  <RedCrossLine></RedCrossLine>
                  <span style={{ paddingLeft: "4px" }}>
                    ₹
                    {Math.ceil(
                      (currentProductData?.price *
                        currentProductData?.discountPercentage) /
                        100
                    ) + currentProductData?.price}
                  </span>
                </div>
                <div
                  className="original-price"
                  style={{ display: "flex", alignItems: "end" }}
                >
                  <strong>
                    <span
                      style={{
                        fontWeight: "720",
                        fontSize: "36px",
                      }}
                    >
                      ₹{currentProductData?.price}
                    </span>{" "}
                    incl VAT
                  </strong>
                </div>
                <div style={{ display: "flex" }}>
                  ₹{currentProductData?.price - 10} ex VAT
                </div>
                <div className="tax-price"></div>
                <div className="slanted-line"></div>
              </div>
              <FilledDrive>
                <div>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      padding: "4px 10px 10px 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Save ₹{currentProductData?.discountPercentage}
                  </span>
                </div>
              </FilledDrive>
              <br />
              <Divider /> <br />
              <div>
                <strong> Color : {radio === "red" ? "Red" : "Black"}</strong>{" "}
              </div>
              <div style={{ display: "flex", gap: "12px", paddingTop: "12px" }}>
                <RedRadioColor
                  onClick={() => setRadio("red")}
                  $selected={radio === "red"}
                />
                <BlackRadioColor
                  onClick={() => setRadio("black")}
                  $selected={radio === "black"}
                />
              </div>
              <br />
              <Divider />
              <br />
              <div
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "6px",
                  width: "32%",
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
              <br />
              <div
                style={{
                  width: "100%",
                  background: "black",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    paddingLeft: "40%",
                    paddingRigt: "20%",
                    color: "white",
                  }}
                  onClick={cartClickHandler}
                >
                  Update
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
