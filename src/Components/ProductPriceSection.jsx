export default function ProductPriceSection({
  currentProductData,
  RedCrossLine = {},
}) {
  return (
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
        {Object.keys(RedCrossLine)?.length && <RedCrossLine></RedCrossLine>}
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
              fontWeight: "700",
              fontSize: "28px",
            }}
          >
            ₹{currentProductData?.price}
          </span>{" "}
          incl VAT
        </strong>
      </div>
      <div style={{ display: "flex" }}>
        {currentProductData?.price - (currentProductData?.price * 10) / 100} ex
        VAT
        {/* ₹{currentProductData?.price - 10}  */}
      </div>
      <div className="tax-price"></div>
      <div className="slanted-line"></div>
    </div>
  );
}
