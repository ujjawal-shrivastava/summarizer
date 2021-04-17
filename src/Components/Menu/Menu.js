import React,{ useState,useEffect,useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Star from '../../assets/shuriken.svg';
import './Menu.css';

const Menu = ({flag,toggle,toggleScroll}) => {

    gsap.registerPlugin(ScrollTrigger);
    const ref1=useRef(null);
    const ref2=useRef(null);

    const ToggleMenu=()=>{
        if(flag){
            gsap.to(ref1.current,{
                rotation:-3,
                delay:0,
                duration:0.5
            });
            gsap.to(ref2.current,{
                top:"-120%",
                delay:1,
                ease:"power3",
                duration:0.5
            });return toggle(!flag);
        }
        gsap.to(ref1.current,{
            rotation:45,
            delay:0,
            duration:0.5
        });
        gsap.to(ref2.current,{
            opacity:1,
            top:"-10%",
            delay:1,
            ease:"power3",
            duration:1
        });toggle(!flag);
    }

    useEffect(()=>{
        window.onscroll=()=>{
            if(window.pageYOffset>50){
                toggleScroll(true);
            }else{
                toggleScroll(false);
            }
            gsap.to(ref1.current,{
                rotation:(window.pageYOffset),
                delay:0,
                duration:0,
                ease:"power3"
            });
        }
    },[])
    
    return (
        <div className="Menu">
            <img src={Star} alt="Menu" onClick={ToggleMenu} ref={ref1}/>
            <ul ref={ref2}>
                <li><a href="/" onClick={ToggleMenu}>Home</a></li>
                <li><a href="/summary" onClick={ToggleMenu}>Battlefield</a></li>
            </ul>
        </div>
    )
}

export default Menu;