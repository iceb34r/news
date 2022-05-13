import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import New from "../New/New";
import "./PinNew.css";
import Pagination from "../Pagination/Pagination";

const PinNew = () => {
  const [newPins, setNewPins] = useState([{ id: 0 }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(2);

  var pinnedNews = [];
  if (localStorage.getItem("bookmarks")) {
    pinnedNews = JSON.parse(localStorage.getItem("bookmarks"));
  }

  useEffect(() => {
    setNewPins(pinnedNews);
  }, []);

  const lastNewsIndex = currentPage * newsPerPage;
  const firstNewIndex = lastNewsIndex - newsPerPage;
  const currentNews = newPins.slice(firstNewIndex, lastNewsIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (pinnedNews.length != 0) {
    return (
      <div>
        <div>
          {currentNews.map((newPins) => (
            <New news={newPins} key={newPins.id} />
          ))}
        </div>
        {pinnedNews.length > newsPerPage &&
        <Pagination 
            newsPerPage = {newsPerPage}
            totalNews = {pinnedNews.length}
            paginate = {paginate}
            currentPage = {currentPage}
        /> 
        }
      </div>
    );
  } else {
    return (
      <>
        <h1 className="emptyPinnedNews">
          Список ваших закрепленных новостей пуст!
        </h1>
      </>
    );
  }
};

export default PinNew;
