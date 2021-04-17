import React,{ useEffect,useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import samurai from '../../assets/samurai.jpg';
import samurai1 from '../../assets/samurai1.jpg';
import pointer from '../../assets/pointer2.png';
import SummaryJAP from '../../assets/SummJP.jpg';
import CallJP from '../../assets/callgrp.jpg';
import Ninja from '../../assets/NinjaDuel.png';
import pointer1 from '../../assets/pointer4.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arrow from '../../assets/up-arrow.svg'
import TextDecorator from '../TextDecorator/TextDecorator';
import './Home.css';

const Home = ({moveup}) => {

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() =>{
        window.onload=()=>{
            scroll.scrollToTop();            
        }
        if(moveup){
            scroll.scrollToTop();
        }
    },[moveup]);

    return (
        <div className="Home">
            <div className="Home_1">
                <div className="Home_2">
                    <h1>The</h1>
                    <h1>Summarizing</h1>
                    <h1>Samurai</h1>
                </div>
                <img src={samurai} alt="Warrior"/>
            </div>
            <div className="Home_3">
                <h1 className="Homehdr_1">Long text and you're running out of time?</h1>
                <div className="Homebx_1">
                    Japanese is a Japonic or Japanese-Ryukyuan language spoken mainly in Japan. According to the 2010 census there are 125 million Japanese speakers in Japan. There are another 3 million Japanese speakers elsewhere, particularly in Brazil, the USA, Peru, Argentina, Australia, Canada, the Philippines and Taiwan.
                    Japanese is part of the Japonic or Japanese-Ryukyuan language family. Related languages include the Ryukyuan languages, such as Okinawan, which are spoken in the Ryukyuan islands. This language family is classified as isolated with no known links to other language families.
                </div>
                <div className="txt_flx">
                    <span>R</span>
                    <span>E</span>
                    <span>F</span>
                    <span>I</span>
                    <span>N</span>
                    <span>E</span>
                    <span>D</span>
                </div>
                <img src={pointer} alt="" className="HomeImg_1"/>
                <h1 className="Homehdr_2">Get your text eased up in a Jiff! All thanks to our text KATANA...</h1>
                <div className="Homebx_2">
                Japanese is a Japonic or Japanese-Ryukyuan language spoken mainly in Japan. There are 125 million Japanese speakers in Japan and 3 million others in Brazil, the USA, Peru, Argentina, Australia, Canada, the Philippines and Taiwan. This language family is classified as isolated with no known links to other language families.
                </div>
            </div>
            <div className="Home_4">
                    <h1>Give us your text and leave the rest to the Warrior.</h1>
                    <div className="Home4bx1">
                        <h1>Be it summarizing your text.</h1>
                        <img src={SummaryJAP} alt=""/>
                    </div>
                    <div className="Home4bx2">
                        <img src={CallJP} alt=""/>
                        <h1>Be it you wanting to vocabularize your text.</h1>
                    </div>
            </div>
            <div className="Home_5">
                <h1>Consider it done.</h1>
                <img src={samurai1} alt="" className="Home5Img1"/>
            </div>
        </div>
    )
}

export default Home;