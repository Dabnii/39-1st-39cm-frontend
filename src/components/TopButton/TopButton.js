import React from "react";
import "./TopButton.scss";

function TopButton() {
  const hendleScrollUp = e => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollDown = e => {
    if (window.scrollY) return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="topToEndContainer">
        <button className="toTop" onClick={hendleScrollUp}>
          <img src="/images/leedabin/arrowUpSmall.png" alt="toTop" />
        </button>
        <button className="toEnd" onClick={handleScrollDown}>
          <img src="/images/leedabin/arrowDownSmall.png" alt="toEnd" />
        </button>
      </div>
    </>
  );
}

export default TopButton;
