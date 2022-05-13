import React, { Component } from 'react';
import "./About.css";
import "./AboutMedia.css";
import kot from "./kot.png";

class About extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className='about-main'>
                        <img
                            src={kot}
                            className="cardImg"
                            alt="profileGit"
                        />
                        <div className="card-body">
                            <h3>
                                Автор данного проекта: <br />
                                студент группы РПИС-91: <br />
                                <br /> <span>Обухов Григорий Владимирович</span>
                            </h3>
                            <a href="https://github.com/iceb34r" className="buttonA" target="blank">
                                Бонус
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default About;