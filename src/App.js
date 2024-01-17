import './App.css';
import React, { useState } from "react";

import NavBar from './/components/NavBar.js';

function App() {

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App">
      <NavBar />
      <br />
      <input type="file" onChange={handleChange} />
      <img src={file} />

    </div>
  );
}

export default App;
