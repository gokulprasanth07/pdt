import Drawer from "@mui/material/Drawer";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

import ListingPage from "./ListingPage";
import GamingsListingPage from "./GamingListingPage";

import CartPriceSection from "../Components/CartPriceSection";

const btnStyles1 = {
  height: "46px",
  width: "266px",
  borderRadius: " 5px",
  background: "white",
  border: "2px solid black",
  cursor: "pointer",
  paddingTop: "12px",
  paddingBottom: "12px",
  paddingRight: "6px",
  paddingLeft: "6px",
};

const btnStyles2 = {
  height: "46px",
  width: "266px",
  borderRadius: " 5px",
  background: "black",
  border: "2px solid white",
  cursor: "pointer",
  paddingTop: "12px",
  paddingBottom: "12px",
  paddingRight: "6px",
  paddingLeft: "6px",
  color: "white",
};

export default function SidePanel({
  cart,
  isPanelOpen,
  setIsPanelOpen,
  cartPrice,
  RedCrossLine,
}) {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    console.log(">>> remove", cart);

    function promiseAll(ids) {
      const baseURL = "https://dummyjson.com/products/";

      const promises = Object.keys(ids).map((id) => {
        const url = `${baseURL}${id}`;
        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to fetch ${url}, status ${response.status}`
              );
            }
            return response.json();
          })
          .then((data) => ({ data }))
          .catch((error) => ({ [id]: { error: error.message } }));
      });

      return Promise.all(promises);
    }

    let images = [];
    promiseAll(cart)
      .then((responses) => {
        console.log("API Responses:", responses);
        responses.length &&
          responses.forEach((pdt) => {
            images.push(pdt?.data?.images?.[3]);
          });
        setImgs(images);
        console.log(">>> IMAGES", imgs);
      })
      .catch((error) => {
        console.error("Error fetching API responses:", error);
      });
  }, [cart]);

  return (
    <Drawer
      onBlur={() =>
        setIsPanelOpen((prevVal) => (prevVal === true ? false : true))
      }
      anchor={"right"}
      open={isPanelOpen}
      // open={true}
      onClose={() => {}}
    >
      <div style={{ background: "#f0f1f2" }}>
        <div style={{ paddingLeft: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: "24px",
              paddingRight: "24px",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              <strong>just added to your basket</strong>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setIsPanelOpen(false)}
            >
              <CloseIcon />
            </div>
          </div>
          <br />
          <div>
            {imgs.length &&
              imgs.map((img) => (
                <span>
                  <img src={img} width="60" height="60" />
                </span>
              ))}
          </div>

          <br />

          <CartPriceSection
            cartPrice={cartPrice}
            RedCrossLine={RedCrossLine}
            cart={cart}
          />

          <div style={{ display: "flex", gap: "24px", paddingTop: "24px" }}>
            <div style={{ paddingLeft: "36px" }}>
              <button style={btnStyles1}>
                <span style={{ fontWeight: "640", fontSize: "18px" }}>
                  Continue Shopping
                </span>
              </button>
            </div>
            <div style={{ paddingRight: "30px" }}>
              <button style={btnStyles2}>
                <span style={{ fontWeight: "600", fontSize: "18px" }}>
                  View Basket
                </span>
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div>
        <ListingPage btnStyles1={btnStyles1} btnStyles2={btnStyles2} />
      </div>
    </Drawer>
  );
}
