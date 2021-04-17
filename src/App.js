import React,{ useState } from 'react';
import { Switch,Route } from 'react-router-dom';
import up_arrow from '../src/assets/arrow1.svg';
import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';
import Summary from './Components/Summary/Summary';

const App = () => {
  const [flag,toggle]=useState(false);
  const [scroll,toggleScroll]=useState(false);
  const [moveup,updateMove]=useState(false);

  return (
    <div>
    <Menu flag={flag} toggle={toggle} toggleScroll={toggleScroll}/>
    <Switch>
      <Route path="/" exact render={()=><Home moveup={moveup}/>}/>
      <Route path="/summary" render={()=><Summary moveup={moveup}/>}/>
    </Switch>
    <img src={up_arrow} alt="up" className="up-arrow"
    onClick={()=>updateMove(!moveup)}
    style={{
      position:"fixed",
      top:"80%",
      transition:"0.5s",
      width:"7%",
      height:"7%",
      transform:"rotate(90deg)",
      right:"5%",
      cursor:"pointer",
      visibility:scroll?"visible":"hidden",
      pointerEvents: scroll?"all":"none"
    }}/>
    </div>
  )
}

export default App;