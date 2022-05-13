import React from "react";
import "./SimilarNew.css";
import "./SimilarNewMedia.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const SimilarNew = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  if (params.id != props.similarNews.id) {
    return (
      <div className="similarWrapper">
        <button
          type="button"
          className="buttonSim"
          onClick={() => navigate("/news/" + props.similarNews.id)}
        >
          {props.similarNews.title}
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SimilarNew;
