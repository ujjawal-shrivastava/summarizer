import React,{ useState,useEffect,useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { gsap } from 'gsap';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import CopyIcon from '../../assets/copy.svg';
import Katana from '../../assets/katana2.jpg'
import setting from '../../assets/settings.svg';
import bar from '../../assets/bar.png';
import Sushi1 from '../../assets/sushi1.svg'
import Sushi2 from '../../assets/sushi2.svg'
import './Summary.css';

const Summary = ({moveup}) => {

    const [loading,toggleLoader]=useState(false);
    const [Settingflag,toggleSet]=useState(false);
    const [DisplayContext,ChangeDisplay]=useState(1);
    const [Disable,ToggleDisable]=useState(false);
    const [TextAreaValue,UpdateValue]=useState('');
    const [InfoDisplay,UpdateDisplay]=useState({
        info:'No Info as of yet!',
        status:false
    });
    const [Settings,UpdateSettings]=useState({
        summarize:true,
        paraphrase:false
    });
    const [result,UpdateResult]=useState({
        text:{
            summary:"You'll get your refined text right here. Select from the options what you're"
            +" upto and press submit to get your filtered text."+
            "You'll get your refined text right here. Select from the options what you're"
            +" upto and press submit to get your filtered text.",
            paraphrase:"You'll get your refined text right here. Select from the options what you're"
            +" upto and press submit to get your filtered text."
        },
        status:false
    });
    const ref1=useRef(null);
    const ref2=useRef(null);
    const ref3=useRef(null);
    const ref4=useRef(null);

    const ToggleSettings=()=>{
        toggleSet(!Settingflag);
        if(!Settingflag){
            gsap.to(ref4.current,{
                scale:1,
                delay:0.5,
                duration:0.6
            });return;
        }
        gsap.to(ref4.current,{
            scale:0,
            delay:0.5,
            duration:0.6
        });
    }

    const HandleChange=(evt)=>{
        if((Settings.paraphrase&&evt.target.value.length>50)||
            (Settings.summarize&&evt.target.value.length>300)){
            if(evt.target.value.length>=TextAreaValue.length){
                ToggleDisable(true);
                ToggleDisplay("Word limit reached!");
                setTimeout(()=>{
                    ToggleDisable(false);
                },1000);
            }
            UpdateValue(evt.target.value.trim());
            return;
        }
        if(evt.target.value.trim()){
            return UpdateValue(evt.target.value.trim());
        }
    }

    const ToggleDisplay=(text)=>{
        UpdateDisplay({
            info:text,
            status:true
        });
        setTimeout(()=>{
            UpdateDisplay({
                info:"No info as of yet",
                status:false
            });
        },5000);
    }

    const HandleSubmit=()=>{
        if(!(Settings.summarize||Settings.paraphrase)){
            return ToggleDisplay("Select Some mode to proceed.")
        }
        if(!TextAreaValue){
            return;
        }
        if(loading){
            return ToggleDisplay("Your request is being processed!");
        }
        toggleLoader(true);
        axios.post("https://summarizer-api-coderbros.herokuapp.com/summarize",{
            text:TextAreaValue,
            mode:Settings.summarize&&Settings.paraphrase?"BOTH":Settings.summarize?
            "SUMMARY":"PARAPHRASE"
        })
        .then(response=>{
            toggleLoader(false);
            console.log(response);
            setTimeout(()=>{
                if(Settings.summarize&&Settings.paraphrase){
                   return; 
                }
                if(Settings.summarize){
                    return UpdateResult({
                        text:{
                            summary:response.data.processed_text,
                            paraphrase:"Select this option to view results"
                        },
                        status:true
                    },1000);
                }
                UpdateResult({
                    text:{
                        summary:"Select this option to view results",
                        paraphrase:response.data.processed_text
                    },
                    status:true
                },1000);
            },1000);
        })
        .catch(err=>{
            toggleLoader(false);
            ToggleDisplay("Opps! Some error has occured! Try again!");
        });
    }

    useEffect(()=>{
        window.onload=()=>{
            scroll.scrollToTop();            
        }
        if(moveup){
            scroll.scrollToTop();
        }
        if(loading){
            const interval=setInterval(()=>{
                gsap.to(ref1.current,{
                    opacity:(new Date().getSeconds())%2+0.3,
                    ease:"power3",
                    delay:0,
                    duration:0.1
                });
                gsap.to(ref2.current,{
                    opacity:(new Date().getSeconds())%2+0.3,
                    ease:"power3",
                    delay:0.1,
                    duration:0.1
                });
                gsap.to(ref3.current,{
                    opacity:(new Date().getSeconds())%2+0.3,
                    ease:"power3",
                    delay:0.2,
                    duration:0.1
                });
            },100);
            setTimeout(()=>{
                toggleLoader(false);
                clearInterval(interval);
            },30000);return;
        }
    },[loading,moveup]);

    return (
        <div className="summary">
            <div className="summary_1">
                <img src={Katana} alt=""/>
                <h1>The Katana will cut any & every text in its way.</h1>
                <h1>Scroll Down and Slaughter your text to ashes.</h1>
            </div>
            <div className="summary_2">
                <h1 onClick={()=>toggleLoader(!loading)}>Present your text below to filter it.</h1>
                <div className="sm-cat">
                    <h1 style={{
                        background:DisplayContext==1?"black":"transparent",
                        color:DisplayContext==1?"white":"black"
                    }}onClick={()=>ChangeDisplay(1)} >Summary</h1>
                    <h1 style={{
                        background:DisplayContext==0?"black":"transparent",
                        color:DisplayContext==0?"white":"black"
                    }} onClick={()=>ChangeDisplay(0)}>Parraphrased</h1>
                </div>
                <div className="summary_2-1">
                    <textarea placeholder="Type or paste your text here."
                    disabled={Disable}
                    onChange={HandleChange}></textarea>
                    <div>
                        <p style={{
                            visibility:loading?"hidden":"visible",
                            opacity:result.status?1:0.4
                        }}>{
                            DisplayContext==1?result.text.summary:
                            result.text.paraphrase
                           }</p>
                    </div>
                    <img src={setting} alt=""
                    className="settings"
                    onClick={()=>{
                        if(loading){
                            return;
                        }
                        ToggleSettings();
                    }}/>
                    <img src={CopyIcon} alt="" className="Copy"/>
                </div>
                <button onClick={HandleSubmit}>Process</button>
            </div>
            <div className="setting-box" ref={ref4}>
                <div>
                    <input type="checkbox" defaultChecked={Settings.summarize}
                    onChange={()=>UpdateSettings({...Settings,summarize:!Settings.summarize})}/>
                    <h2>Summarize[300 Chars]</h2>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={Settings.paraphrase}
                    onChange={()=>UpdateSettings({...Settings,paraphrase:!Settings.paraphrase})}/>
                    <h2>Paraphrase[50 Chars]</h2>
                </div>
            </div>
            <div className="loaderbars" style={{visibility:loading?"visible":"hidden"}}>
                    <img src={bar} alt=""
                    ref={ref1} className="bar1"/>
                    <img src={bar} alt=""
                    ref={ref2} className="bar2"/>
                    <img src={bar} alt=""
                    ref={ref3} className="bar3"/>
            </div>
            <div className="infoprov" style={{
                visibility:InfoDisplay.status?"visible":"hidden"
            }}>
                <img src={Sushi1} alt=""/>
                { InfoDisplay.info }
                <img src={Sushi2} alt=""/>
            </div>
        </div>
    )
}

export default Summary;