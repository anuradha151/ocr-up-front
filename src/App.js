import './App.css';
import React, { useState } from "react";
import Stack from 'react-bootstrap/Stack';
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
      <Stack gap={2} className="col-md-5 mx-auto align-items-center">
        <input type="file" onChange={handleChange} />
        <img src={file} />
      </Stack>
    </div>
  );
}

export default App;
