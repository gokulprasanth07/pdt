import logo from "./logo.svg";
import "./App.css";
import useFetch from "./useFetch";
import { PDT_URL } from "./Utils/Helper";
import React, { useState, useEffect } from "react";
import PDListingPage from "./Components/PDListingPage";
import PdtSlider from "./Components/PdtSlider";
import SidePanel from "./Components/SidePanel";
import CartPriceSection from "./Components/CartPriceSection";

import styled from "styled-components";

const FrequentText = styled.div`
  font-size: 24px;
  font-weight: 685;
  display: flex;
  padding-left: 132px;
`;

const Strip = styled.div`
  margin-top: 12.5%;
  margin-bottom: 12.5%;
  height: 790px;
  background: #f0f1f2;
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

const Content = styled.div`
  padding-top: 42px;
`;

function App() {
  const [data, isLoading, isError] = useFetch(PDT_URL);

  const [cart, setCart] = useState({});
  const [cartPrice, setCartPrice] = useState({ total: 0, dicountedPrice: 0 });
  const [uniqPdts, setUniqPdts] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // console.log(">>> data fetch from use fetch", data, isLoading, isError);

  // console.log("KART: ", cart);

  useEffect(() => {
    let cartIds = cart ? Object.keys(cart) : null;
    console.log("IDDDD: ", cartIds);
    // let filteredPdts = data.filter();
    const filteredPdts = data.filter((item) =>
      cartIds.includes(String(item?.id))
    );

    let totalPrice = 0,
      discountedPrice = 0;
    filteredPdts.forEach((item) => {
      let total = item.price * cart[item?.id];
      totalPrice += total;
      discountedPrice +=
        item.price - (item?.price * item?.discountPercentage) / 100;
      discountedPrice = discountedPrice * cart[item?.id];
    });
    console.log(
      ">>> filteredPdts",
      cart,
      filteredPdts,
      totalPrice,
      Math.round(discountedPrice)
    );
    setCartPrice({
      total: totalPrice,
      dicountedPrice: Math.round(discountedPrice),
    });
  }, [cart]);

  return (
    <div className="App">
      <Strip>
        <Content>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            {isLoading ? (
              <h2>loading...</h2>
            ) : (
              <PDListingPage
                currentProductData={data.slice(0, 1)}
                cart={cart}
                setCart={setCart}
                uniqPdts={uniqPdts}
                setUniqPdts={setUniqPdts}
              />
            )}
            &nbsp;{" "}
            <div
              style={{ fontSize: "24px", fontWeight: "700", marginTop: "20%" }}
            >
              +
            </div>{" "}
            &nbsp;
            <div className="pdt-slider">
              <PdtSlider
                cart={cart}
                setCart={setCart}
                cartPrice={cartPrice}
                setCartPrice={setCartPrice}
                uniqPdts={uniqPdts}
                setUniqPdts={setUniqPdts}
              />
            </div>
            <div
              className="cart-price-section"
              style={{ left: "1220px", top: "596px", position: "absolute" }}
            >
              <CartPriceSection cartPrice={cartPrice} RedCrossLine={RedCrossLine} cart={cart} />
              {/* <strong>x{cartPrice?.total} | {cartPrice?.dicountedPrice}</strong> */}
              <br />
              <div>
                <button
                  style={{
                    height: "46px",
                    width: "256px",
                    background: "black",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={() => setIsPanelOpen(!isPanelOpen)}
                >
                  {" "}
                  <span style={{ fontSize: "18px" }}>
                    Add {Object.keys(cart).length} items to bucket
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Content>
      </Strip>
      <SidePanel
        cart={cart}
        cartPrice={cartPrice}
        RedCrossLine={RedCrossLine}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      />
    </div>
  );
}

export default App;
