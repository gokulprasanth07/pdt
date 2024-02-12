import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React, { useState, useEffect } from "react";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";

const Slider = ({ currentPd }) => {
  const [zoomEnabled, setZoomEnabled] = useState(false);
  return (
    <div className="Slider">
      <Carousel>
        {currentPd &&
          currentPd.images &&
          currentPd.images.length &&
          currentPd.images.map((it) => (
            <>
              {zoomEnabled ? (
                <InnerImageZoom src={it} zoomSrc={it} />
              ) : (
                <img src={it} />
              )}
              <div style={{ paddingTop: "24px", borderRadius: "6px" }}>
                <button
                  style={{ padding: "5px" }}
                  onClick={() => setZoomEnabled(!zoomEnabled)}
                >
                  {" "}
                  {zoomEnabled ? "disable" : "enable"} zoom
                </button>
              </div>
            </>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
