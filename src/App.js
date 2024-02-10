import './App.css';
import React, { useState } from "react";
import NavBar from './/components/NavBar.js';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Alert, Card, CardBody, CardText, Container } from 'react-bootstrap';

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8000/uploadfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      const textResponse = response.data.text;
      setUploadStatus(textResponse);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed');
    }
  };

  const displayData = (data) => {
    // Example with simple text data
    if (typeof data === 'string') {
      return <Alert variant="success">{data}</Alert>;
    }

    // Adapt this logic to handle your specific data structure
    // You can use Bootstrap components like Table, ListGroup, etc.

    return (
      <p>Please implement data display logic based on your API response structure.</p>
    );
  };


  return (
    <div className="App">
      <NavBar />
      <br />
      <Container>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <Button variant="primary" type="submit">Upload</Button>
        </form>
        <br />
        {uploadStatus && (
          <Card>
            <CardBody>
              <CardText className="mb-2">Image Text</CardText>
              {/* Display data using appropriate Bootstrap components */}
              {displayData(uploadStatus)}
            </CardBody>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default App;
