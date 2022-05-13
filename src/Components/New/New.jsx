import React, { Component, useEffect, useState } from "react";
import "./New.css";
import "./NewMedia.css";
import { useNavigate } from 'react-router-dom'

const New = (props) => {

    let publishedAtTime = props.news?.publishedAt?.slice(11,16);
    let publishedAtYear =  props.news?.publishedAt?.slice(0,4);
    let publishedAtMonth =props.news?.publishedAt?.slice(5,7);
    let publishedAtDay =props.news?.publishedAt?.slice(8,10);
    const navigate = useNavigate();

    return (
        <div className="newWrapper">
            <img src={props.news.imageUrl} 
                alt="imageUrl" className="imgNew"/>
            <div className="post">
                <h1 className="titleHeader">{props.news.title}</h1>
                <div className="dispFlex">
                    <a href={props.news.url} target="_blank" className="source">
                        {props.news.newsSite}
                    </a>
                    <p>
                        {publishedAtTime}, {publishedAtDay}.{publishedAtMonth}.{publishedAtYear}
                    </p>
                </div>
                {/* {props.news.publishedAt} */}
                <button type="button" className="button" onClick={() => navigate('/news/' + props.news.id)}>
                    Читать
                </button>
            </div>
        </div>
    );
}

export default New;