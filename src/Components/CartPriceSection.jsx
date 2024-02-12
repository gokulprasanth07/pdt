export default function CartPriceSection({ cartPrice, cart, RedCrossLine }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <strong>{Object.keys(cart).length} items added</strong>
      </div>
      <div style={{ display: "flex" }}>Total bundle price</div>

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
          Was{" "}
          {cartPrice?.total + (cartPrice?.total - cartPrice?.dicountedPrice)}
          <RedCrossLine></RedCrossLine>
          <span style={{ paddingLeft: "4px" }}>₹</span>
        </div>
        <div
          className="original-price"
          style={{ display: "flex", alignItems: "end" }}
        >
          <strong>
            <span
              style={{
                fontWeight: "736",
                fontSize: "36px",
              }}
            >
              ₹{cartPrice?.total}
            </span>{" "}
            incl VAT
          </strong>
        </div>
        <div
          style={{
            display: "flex",
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          <div>
            {/* {currentProductData?.price - 10} */}
            {cartPrice.total - (cartPrice.total * 10) / 100} ex VAT
          </div>
          &nbsp;&nbsp;
          <div
            style={{
              display: "flex",
              width: "156px",
              justifyitems: "center",
              height: "32px",
              background: "#d80a00",
              borderRadius: "4px",
            }}
          >
            <div>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  fontSize: "16px",
                  padding: "6px 12px 6px 14px",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Save ₹{cartPrice.total - cartPrice.dicountedPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
