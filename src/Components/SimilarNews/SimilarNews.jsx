import React, { Component, useEffect, useState } from "react";
import SimilarNew from "../SimilarNew/SimilarNew";
import axios from "axios";
import "./SimilarNews.css";

const SimilarNews = (props) => {
  const [similarNews, setSimilarNews] = useState([{ news: "" }]);

  useEffect(() => {
    axios
      .get(
        "https://api.spaceflightnewsapi.net/v3/articles?_limit=5&title_contains=" +
          props.news
      )
      .then((res) => {
        setSimilarNews(res.data);
      });
  }, [props]);

  return (
    <div>
      <h3>Похожие новости:</h3>
      {similarNews.map((similarNews) => (
        <SimilarNew similarNews={similarNews} key={similarNews.id} />
      ))}
    </div>
  );
};

export default SimilarNews;
