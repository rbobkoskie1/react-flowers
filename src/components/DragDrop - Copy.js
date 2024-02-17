import ReactDOM from 'react-dom';
import React, { useState } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fireworks from "./Fireworks";

const PictureList = [
  {
    id: 1,
    url: "https://rbobkoskie1.github.io/images/ROB-BADGE-PIC.jpg",
  },
  {
    id: 2,
    url: "https://rbobkoskie1.github.io/images/Family-1.jpg",
  },
  {
    id: 3,
    url: "https://rbobkoskie1.github.io/images/Family-2.jpg",
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    // console.log('ID', id);
    if (id !== 1) { return; };
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
    Redirect();
  };

  function Redirect() {
    const root = ReactDOM.createRoot(document.getElementById('fireworks')); 
    root.render(<Greeting/>);
    // console.log('here');
    // return <div className="Hooray">ERROR! PAGE NOT FOUND</div>;
  }

  function Greeting() {
    console.log('here');
    return  <div>
              <div>HOORAY! So Happy to Join Ram's Team!</div>
                <img 
                  src="https://rbobkoskie1.github.io/images/fireworks.gif?h=15%&w=15%"
                  alt="new"
                />
            </div>;
  };

  const myOffice={
    backgroundImage: "url('https://rbobkoskie1.github.io/images/att-office.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  
  return (
    <div id="container">
      <div style={{textAlign: "justify"}}><h3>Drag and drop an image on the office &rarr;</h3></div>

      <div id='fireworks' className="Hooray"></div>

      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
      
      <div style={myOffice} className="Board" ref={drop}>
        {board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
    </div>
  );
}

export default DragDrop;
