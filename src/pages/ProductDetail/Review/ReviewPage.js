import React from "react";
import ReactStars from "react-stars";
import "./ReviewPage.scss";

const ReviewPage = ({ pdData }) => {
  return (
    <>
      <section className="reviewContainer">
        <div className="reviewInfo">
          <div className="reviewTopLeftBox">
            <span className="reviewCount">리뷰 Review</span>
            <ReactStars
              className="reactStarts"
              value={pdData.score}
              edit={false}
              color2={"orangered"}
            />
          </div>
          <div className="reviewTopRightBox">
            <span className="reviewRule">
              50자 이상 포토리뷰 작성 시 최대 1,500 마일리지 적립
            </span>
          </div>
        </div>
        {pdData.reviews &&
          pdData.reviews.map(review => {
            return (
              <div className="reviewBox">
                <div className="reviewPhoto">
                  <img
                    className="reviewImage"
                    src={review.reviewImage}
                    alt="reviewPhoto"
                  />
                  <div className="reviewCtx">
                    <h3 className="reviewTitle">{review.reviewTitle}</h3>
                    <h3 className="reviewUser">{review.reviewUser}</h3>
                    <span className="ctx">{review.reviewContent}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default ReviewPage;
