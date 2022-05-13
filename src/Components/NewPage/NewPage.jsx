import "./NewPage.css";
import "./NewPageMedia.css";
import { useParams } from "react-router";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import SimilarNews from "../SimilarNews/SimilarNews";

const NewPage = () => {
  const [newEntity, setNewEntity] = useState({
    publishedAt: "",
    title: "",
    id: 0,
  });

  const [isPinned, setIsPinned] = useState(false);

  const params = useParams();

  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v3/articles/" + params.id)
      .then((res) => {
        setNewEntity(res.data);
      });
  }, [params]);

  useEffect(() => {
    if (localStorage.getItem("bookmarks")) {
      const exist = JSON.parse(localStorage.getItem("bookmarksId")).indexOf(Number(params.id)) != -1;
      setIsPinned(exist);
    }
  }, [params]);

  let temp = [];
  let tempId = [];
  let id = newEntity.id;

  const handleClick = () => {
    if (localStorage.getItem("bookmarks")) {
      temp = JSON.parse(localStorage.getItem("bookmarks"));
      tempId = JSON.parse(localStorage.getItem("bookmarksId"));
    }

    if (temp.length == 0 || !tempId.includes(Number(id))) {
      temp.push(newEntity);
      tempId.push(Number(id));
      localStorage.setItem("bookmarks", JSON.stringify(temp));
      localStorage.setItem("bookmarksId", JSON.stringify(tempId));
    } else {
      // const newArr = temp.filter(item => item.id !== newEntity.id);
      temp.splice(tempId.indexOf(Number(id)), 1);
      tempId.splice(tempId.indexOf(Number(id)), 1);
      localStorage.setItem("bookmarks", JSON.stringify(temp));
      localStorage.setItem("bookmarksId", JSON.stringify(tempId));
    }
    setIsPinned(!isPinned);
  };

  return (
    <div className="cardWrapper">
      <div>
        <div className="publushInfo publushInfo-newsPage">
          <p>
            {newEntity.publishedAt.slice(11, 16)},
            {newEntity.publishedAt.slice(0, 4)}.
            {newEntity.publishedAt.slice(5, 7)}.
            {newEntity.publishedAt.slice(8, 10)},
          </p>
          <a href={newEntity.url} target="_blank" className="sourceLink">
            {newEntity.newsSite}
          </a>

          <button type="button" className="buttonStore" onClick={handleClick}>
            {isPinned ? 'Удалить из закладок' : 'Добавить в закладку'}
          </button>

        </div>
        <h1 className="titleHeaderPage">{newEntity.title}</h1>
        <img src={newEntity.imageUrl} alt="newImage" className="newImg" />

        <p className="newSummary">{newEntity.summary}</p>
      </div>
      <div className="similarNews">
        <SimilarNews news={newEntity.title.slice(0, 10)} key={newEntity.id} />
      </div>
    </div>
  );
};

export default NewPage;
