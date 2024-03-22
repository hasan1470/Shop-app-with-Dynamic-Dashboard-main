import { useState } from 'react';
import './App.css';

function App() {

const [bg, setBg] = useState("Green");


  return (

    <>
    
<div className="main-body" style={{backgroundColor: bg}}>

  <div className="buttons">
    <button style={{backgroundColor:"red"}} onClick={() => setBg("red")}>Red</button>
    <button style={{backgroundColor:"green"}} onClick={() => setBg("green")}>Green</button>
    <button style={{backgroundColor:"blue"}} onClick={() => setBg("blue")}>Blue</button>
    <button style={{backgroundColor:"orange"}} onClick={() => setBg("orange")}>orange</button>
    <button style={{backgroundColor:"black"}} onClick={() => setBg("black")}>Black</button>
  </div>

</div>

    </>

  );
}

export default App;
