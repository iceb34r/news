import React, { Component } from 'react';
import logo from "./404.jpg";
import "./NotFound.css";

class NotFound extends Component {
    render() {
        return (
            <div className='imageError'>
                <img src={logo} alt="img404" className='imageError'/>
                <h1 className='textError'>Страница не найдена 404</h1>
            </div>
        );
    }
}

export default NotFound;