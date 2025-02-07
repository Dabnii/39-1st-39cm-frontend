import React, { useEffect, useState } from "react";
import BestProductTop from "./Product/BestProductTop";
import BestProductBottom from "./Product/BestProductBottom";
import "../BestProductList/BestProductList.scss";
import { useSearchParams } from "react-router-dom";
function BestProductList() {
  const [women, setWomen] = useState([]);
  const [titleHandler, setTitleHandler] = useState(0);
  const titleName = titleData[titleHandler];

  const ipAddress = "13.124.197.217";

  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get("product_gender");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  useEffect(() => {
    fetch(
      `http://${ipAddress}:3000/products?limit=&offset=&sort=${sort}&color=&min_price=&max_price=&category=${category}&brand=&product_gender=${gender}`
    )
      .then((response) => response.json())
      .then((result) => setWomen(result.products));
  }, [gender, category, sort]);
  const movePage = (gender, category, data) => {
    searchParams.set("product_gender", gender);
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.set("category", "");
    }
    setSearchParams(searchParams);
    setTitleHandler(data.id);
  };
  const moveCategory = (category) => {
    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.set("category", "");
    }
    setSearchParams(searchParams);
  };
  const moveSort = (sort) => {
    if (sort) {
      searchParams.set("sort", sort);
    } else {
      searchParams.set("sort", "");
    }
    setSearchParams(searchParams);
  };
  // useEffect(() => {
  //   // fetch("/data/kimdongki/Women.json")
  //   //   .then((response) => response.json())
  //   //   .then((result) => setWomen(result));
  //   fetch(
  //     `http://${ipAddress}:3000/products?limit=&offset=&sort=&color=&min_price=1100&max_price=1200000&category=&brand=&product_gender=2`
  //   )
  //     .then((response) => response.json())
  //     .then((result) => setWomen(result.products));
  // }, []);
  return (
    <div className="bestProduct">
      <div className="leftSide">
        <div className="leftCategories">
          <h2 className="title">BEST</h2>
          <ul className="leftSideList">
            <ul className="categoryNameList">
              {titleData.map((data, index) => (
                <li key={index} className="categoryName">
                  <button
                    key={data.id}
                    className="firstName"
                    onClick={() => movePage(data.gender, data.category, data)}
                  >
                    {data.title}
                  </button>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </div>
      <div className="mainPage">
        <h2 className="kindOfThing">{titleName.title}</h2>
        <div className="categories">
          <ul className="categoriesList">
            <span className="list">
              <input className="kind" type="radio" name="categoryMediumList" />
              <label
                className="choice"
                title="categoryMediumList"
                onClick={() => moveCategory("")}
              >
                {titleName.category1}
              </label>
            </span>
            <span className="list">
              <input
                className="kind"
                type="radio"
                name="secondCategoryMediumList"
                value="secondCategoryMediumList"
              />
              <label
                className="choice"
                title="categoryMediumList"
                onClick={() => moveCategory(3)}
              >
                {titleName.category2}
              </label>
            </span>
            <span className="list">
              <input
                className="kind"
                type="radio"
                name="thirdCategoryMediumList"
                value="thirdCategoryMediumList"
              />
              <label
                className="choice"
                title="categoryMediumList"
                onClick={() => moveCategory(4)}
              >
                {titleName.category3}
              </label>
              <div className="sortFilter">
                <div>
                  <input
                    onClick={() => moveSort("review")}
                    className="sort"
                    type="radio"
                    value="리뷰순"
                    name="sort"
                  />
                  리뷰순
                </div>
                <div>
                  <input
                    onClick={() => moveSort("like")}
                    className="sort"
                    type="radio"
                    value="좋아요순"
                    name="sort"
                  />
                  좋아요순
                </div>
                <div>
                  <input
                    onClick={() => moveSort("")}
                    className="sort"
                    type="radio"
                    value="가격순"
                    name="sort"
                  />
                  가격순
                </div>
              </div>
            </span>
          </ul>
        </div>
        <ul className="productListTop">
          {women &&
            women.map((obj, index) => {
              if (index < 3) {
                return (
                  <BestProductTop
                    key={index}
                    product={obj}
                    searchParams={searchParams}
                  />
                );
              } else {
                return null;
              }
            })}
        </ul>
        <ul className="productListBottom">
          {women &&
            women.map((product, index) => {
              if (index > 2) {
                return (
                  <BestProductBottom
                    key={index}
                    product={product}
                    searchParams={searchParams}
                  />
                );
              } else {
                return null;
              }
            })}
        </ul>
      </div>
    </div>
  );
}
const titleData = [
  {
    id: 0,
    title: "여성의류",
    category1: "전체",
    category2: "상의",
    category3: "하의",
    gender: 2,
    category: "",
  },
  {
    id: 1,
    title: "남성의류",
    category1: "전체",
    category2: "상의",
    category3: "하의",
    gender: 1,
    category: "",
  },
  {
    id: 2,
    title: "신발",
    category1: "전체",
    gender: "",
    category: "2",
  },
];
export default BestProductList;
