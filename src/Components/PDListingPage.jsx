import styled from "styled-components";
import CurrentProduct from "./CurrentProduct";

const FrequentText = styled.div`
  font-size: 24px;
  font-weight: 685;
  display: flex;
  padding-left: 132px;
`;

const Strip = styled.div`
  margin-top: 2%;
  margin-bottom: 12.5%;
  height: 660px;
`;

const Content = styled.div`
  padding-top: 42px;
`;

const PDListingPage = ({
  currentProductData,
  cart,
  setCart,
  cartPrice,
  setCartPrice,
}) => {
  if (!currentProductData) {
    return null;
  }
  // console.log(">>> currentProductData", currentProductData);
  return (
    <Strip>
      <Content>
        <FrequentText>Frequently Bought Together</FrequentText>
        <CurrentProduct
          currentProductData={currentProductData[0]}
          cart={cart}
          cartPrice={cartPrice}
          setCart={setCart}
        />
      </Content>
    </Strip>
  );
};

export default PDListingPage;
