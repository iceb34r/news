import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import New from "../New/New";
import "./News.css";
import "./NewsMedia.css";

function News() {
  const [news, setNews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectChanged, setSelectChanged] = useState("");
  const [modeEntity, setModeEntity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [sortDesc, setSortDesc] = useState(false);

  useEffect(() => {
    if (fetching) {
      switch (modeEntity) {
        case "find":
          handleFinder();
          break;
        case "sort":
          handleSort();
          break;

        default:
          handleAllNews();
          break;
      }
    }
  }, [fetching, modeEntity]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  const handleAllNews = () => {
    axios
      .get(
        `https://api.spaceflightnewsapi.net/v3/articles?_start=${currentPage}`
      )
      .then((res) => {
        setNews([...news, ...res.data]);
        setCurrentPage((prevState) => prevState + 10);
      })
      .finally(() => setFetching(false));
  };

  const handleSort = () => {
    axios
      .get(
        `https://api.spaceflightnewsapi.net/v3/articles?_sort=publishedAt&_start=${currentPage}`
      )
      .then((res) => {
        setNews([...news, ...res.data]);
        setCurrentPage((prevState) => prevState + 10);
      })
      .finally(() => setFetching(false));
  };

  const handleFinder = () => {
    axios
      .get(
        `https://api.spaceflightnewsapi.net/v3/articles?` +
          `${selectChanged}_contains=${searchInput}` +
          `&_start=${currentPage}`
      )
      .then((res) => {
        setNews([...news, ...res.data]);
        setCurrentPage((prevState) => prevState + 10);
      })
      .finally(() => setFetching(false));
  };

  const setupSort = () => {
    setNews([]);
    setFetching(true);
    setCurrentPage(1);
    setSortDesc(!sortDesc);
    let sortColumn = sortDesc ? "" : "sort";
    setModeEntity(sortColumn);
  };
  return (
    <div className="main-container">
      <div className="finderStyle">
        <div className="inputFinder">
          <input
            type="text"
            placeholder="Поиск по новостям"
            className="input inputStyle"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />

          <button
            className="buttonFind inputStyle"
            onClick={() => {
              setNews([]);
              setFetching(true);
              setModeEntity("find");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <path
                  d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                  fill="#392B4B"
                />
                <path
                  d="M11.4118 8.58603C11.7908 8.96603 11.9998 9.46802 11.9998 10H13.9998C14.0007 9.47445 13.8974 8.95392 13.6959 8.46851C13.4944 7.9831 13.1987 7.54245 12.8258 7.17202C11.3118 5.66002 8.68683 5.66002 7.17383 7.17202L8.58583 8.58803C9.34583 7.83003 10.6558 7.83203 11.4118 8.58603Z"
                  fill="#392B4B"
                />
              </g>
            </svg>
          </button>
        </div>
        <select
          className="select inputStyle"
          id="select"
          onChange={(event) => setSelectChanged(event.target.value)}
          value={selectChanged}
        >
          <option hidden>Поиск по</option>
          <option value="title">по заголовку</option>
          <option value="summary">по описанию</option>
        </select>

        <div className="sort inputStyle">
          <a onClick={setupSort}>Сортировка по дате публикации</a>
        </div>
      </div>

      <div>
        {news.map((news) => (
          <New news={news} key={news.id} />
        ))}
      </div>
    </div>
  );
}

export default News;
