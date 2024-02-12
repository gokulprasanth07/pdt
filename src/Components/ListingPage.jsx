import TabsComponent from "./TabsComponent";
import GamingsListingPage from "./GamingListingPage";
import { useEffect } from "react";
import useFetch from "../useFetch";
import { PDT_URL } from "../Utils/Helper";
import ProductPriceSection from "./ProductPriceSection";
import { Rating } from "@mui/material";

export default function ListingPage({ btnStyles1, btnStyles2 }) {
  const [data, isLoading, isError] = useFetch(PDT_URL);
  console.log(">>> LP >", data, isLoading);

  useEffect(() => {}, []);
  return (
    <div style={{ padding: "16px" }}>
      {" "}
      <div
        style={{
          paddingTop: "16px",
          paddingBottom: "16px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          margin: "auto",
        }}
      >
        <h2>Customers Also Bought</h2>
      </div>
      <GamingsListingPage value={"one"} handleChange={() => {}} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "56px",
          padding: "32px",
          width: "660px",
        }}
      >
        {isLoading ? (
          <h2>loading...</h2>
        ) : (
          data &&
          data?.length &&
          data.map((pdt, index) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <img src={pdt?.images[0]} width="300" height="300" />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Rating name="half-rating" defaultValue={4} precision={0.5} />{" "}
                &nbsp; <div>1</div>
              </div>
              <div>{pdt?.title}</div>

              <ProductPriceSection currentProductData={pdt} />
              <br />
              {index % 2 === 0 ? (
                <div>
                  <div style={{ paddingLeft: "36px" }}>
                    <button style={btnStyles1}>
                      <span style={{ fontWeight: "640", fontSize: "18px" }}>
                        Select Options
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ paddingRight: "30px" }}>
                    <button style={btnStyles2}>
                      <span style={{ fontWeight: "600", fontSize: "18px" }}>
                        Add To Basket
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
