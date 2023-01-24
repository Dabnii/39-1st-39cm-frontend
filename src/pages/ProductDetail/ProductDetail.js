import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import Swiper from "./Swiper/Swiper";
import ReviewPage from "./Review/ReviewPage";
import TopButton from "../../components/TopButton/TopButton";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const [showColorOpt, setShowColorOpt] = useState(false);
  const [showSizeOpt, setSHowSizeOpt] = useState(false);
  const [pickedColor, setPickedColor] = useState("");
  const [pickedSize, setPickedSize] = useState("");
  const [likePd, setLikePd] = useState();
  const [showBox, setShowBox] = useState(false);
  const [number, setNumber] = useState(0);
  const [amount, setAmount] = useState(0);
  const [pdData, setPdData] = useState({});
  const token = localStorage.getItem("TOKEN");
  const ipAddress = "13.124.197.217";
  const navigator = useNavigate();
  const params = useParams();
  const productId = params.productId;

  const addCart = () => {
    fetch(`http://${ipAddress}:3000/cart`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("TOKEN"),
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        productId: productId,
        amount: amount,
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("에러 발생!");
        } else {
          navigator("/Cart");
        }
      })
      .catch(error => alert("장바구니 추가에 실패하였습니다."));
  };

  const setPaymentItem = () => {
    if (localStorage.getItem("TOKEN")) {
      localStorage.setItem(
        "orderList",
        JSON.stringify([
          {
            productId: productId,
            productName: pdData.productName,
            productPrice: pdData.price,
            images: pdData.images,
            brandName: pdData.brandName,
            amount: amount,
          },
        ])
      );
      navigator("/Payment");
    } else alert("로그인이 필요한 서비스 입니다.");
  };

  useEffect(() => {
    //통신용입니다
    fetch(`http://${ipAddress}:3000/products/${productId}`, {
      headers: {
        productId: productId,
      },
    })
      // fetch("/data/product.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPdData(data.product[0]);
      });

    fetch(`http://${ipAddress}:3000/likes/product/${productId}`, {
      headers: {
        authorization: localStorage.getItem("TOKEN"),
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.isLiked);
        setLikePd(result.isLiked);
      });
  }, [productId]);

  const onIncrease = () => {
    setNumber(prevNum => prevNum + 1);
    setAmount(amount + 1);
  };

  const onDecrease = () => {
    if (number <= 0) {
      setNumber(0);
    } else {
      setNumber(prevNum => prevNum - 1);
      setAmount(amount - 1);
    }
  };
  return (
    <section className="productDetail">
      <TopButton />
      <div className="productDetailContainer">
        <div className="thumbnailContainer">
          <div className="productThumbnail">
            <Swiper pdData={pdData} />
          </div>
          <section className="productDetailBox">
            <div className="pdNameHeart">
              <div className="pdLeftBox">
                <h1>{pdData?.productName}</h1>
                <span className="score">
                  <span className="starts">
                    <ReactStars
                      className="reactStarts"
                      value={pdData.score}
                      edit={false}
                      color2={"orangered"}
                    />
                  </span>
                </span>
              </div>
              <div className="pdRightBox">
                {token ? (
                  <img
                    className="heartLineIcon"
                    alt="heart"
                    onClick={() => {
                      if (likePd === true) {
                        fetch(
                          `http://${ipAddress}:3000/likes/product/${productId}`,
                          {
                            method: "delete",
                            headers: {
                              "Content-Type": "application/json;charset=utf-8",
                              authorization: localStorage.getItem("TOKEN"),
                            },
                          }
                        )
                          .then(response => {
                            if (response.status !== 200) {
                              throw new Error("error");
                            } else {
                              //fetch 성공시
                              console.log("좋아요 삭제 성공");
                              setLikePd(prev => !prev);
                            }
                          })
                          .catch(error => {
                            console.log("좋아요 삭제 실패");
                          });
                      } else {
                        fetch(
                          `http://${ipAddress}:3000/likes/product/${productId}`,
                          {
                            method: "post",
                            headers: {
                              "Content-Type": "application/json;charset=utf-8",
                              authorization: localStorage.getItem("TOKEN"),
                            },
                          }
                        )
                          .then(response => {
                            if (response.status !== 201) {
                              throw new Error("error");
                            } else {
                              //fetch 성공시
                              console.log("좋아요 추가 성공");
                              setLikePd(prev => !prev);
                            }
                          })
                          .catch(error => {
                            console.log("좋아요 추가 실패");
                          });
                      }
                    }}
                    src={
                      likePd === false
                        ? "/images/leedabin/heartLine.png"
                        : "/images/leedabin/heartOrange.png"
                    }
                  />
                ) : (
                  <img
                    className="heartLineIcon"
                    alt="heart"
                    src="/images/leedabin/heartLine.png"
                    onClick={() => alert("로그인이 필요한 서비스 입니다!")}
                  />
                )}
              </div>
            </div>
            {pdData[0] !== null && (
              <h2 className="price">
                {Number(pdData.price).toLocaleString()}
                <span>원</span>
              </h2>
            )}
            <section
              className="colorWrapper"
              data-role="selectbox"
              onMouseLeave={() => setShowColorOpt(false)}
            >
              <section className="selectBox">
                <button
                  type="button"
                  className="toggleBtn"
                  onClick={() => setShowColorOpt(prev => !prev)}
                >
                  COLOR
                  <img
                    src="/images/leedabin/dropDown.png"
                    alt="downArrow"
                    className="ico-down"
                  />
                </button>
                {showColorOpt && (
                  <ul
                    className="selectBoxOption"
                    onClick={() => setShowBox(prev => !prev)}
                  >
                    <li>
                      <button
                        type="button"
                        className="optionBtn"
                        onClick={() => setPickedColor("Khaki Grey")}
                      >
                        Khaki Grey
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="optionBtn"
                        onClick={() => setPickedColor("Black")}
                      >
                        Black
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="optionBtn"
                        onClick={() => setPickedColor("Navy")}
                      >
                        Navy
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            <section
              className="sizeWrapper"
              data-role="selectbox"
              onMouseLeave={() => setSHowSizeOpt(false)}
            >
              <section className="selectBox">
                <button
                  type="button"
                  className="sizeToggleBtn"
                  onClick={() => setSHowSizeOpt(prev => !prev)}
                >
                  SIZE
                  <img
                    src="/images/leedabin/dropDown.png"
                    alt="downArrow"
                    className="ico-down"
                  />
                </button>
                {showSizeOpt && (
                  <ul
                    className="selectSizeOption"
                    onClick={() => setSHowSizeOpt(prev => !prev)}
                  >
                    <li>
                      <button
                        type="button"
                        className="optionBtnS"
                        onClick={() => setPickedSize("SMALL")}
                      >
                        SMALL
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="optionBtnM"
                        onClick={() => setPickedSize("MEDIUM")}
                      >
                        MEDIUM
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setPickedSize("LARGE")}
                        type="button"
                        className="optionBtnL"
                      >
                        LARGE
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </section>
            {showBox && (
              <section className="itemSelectContainer">
                <div className="itemOptBox">
                  <span className="itemOptName">{pickedColor}</span>
                  <span className="itemPickedSize">{pickedSize}</span>
                  <div className="optBtnContainer">
                    <button className="addOptMinus" onClick={onDecrease}>
                      -
                    </button>
                    <button className="addOptNum">{number}</button>
                    <button className="addOptAdd" onClick={onIncrease}>
                      +
                    </button>
                  </div>
                  <span className="itemOptAll">
                    {Number(pdData.price).toLocaleString()}
                  </span>
                </div>
                <div className="itemOptBottom">
                  <span className="finalPriceKor">총 상품 금액</span>
                  {pdData[0] !== null && (
                    <span className="finalPriceWon">
                      {Number(pdData.price * amount).toLocaleString()}
                      <span className="wonKor">원</span>
                    </span>
                  )}
                </div>
              </section>
            )}
            <div className="orderBtns">
              <button className="addCartBtn" type="button" onClick={addCart}>
                장바구니 담기
              </button>
              <button
                className="buyNowBtn"
                type="button"
                onClick={setPaymentItem}
              >
                바로 구매하기
              </button>
            </div>
          </section>
        </div>
      </div>
      <div>
        <div className="details">
          {pdData.images?.map((image, i) => (
            <img src={image} alt="thumbnail" className="detailsInfo" key={i} />
          ))}
        </div>
      </div>
      <ReviewPage pdData={pdData} />
    </section>
  );
};

export default ProductDetail;
