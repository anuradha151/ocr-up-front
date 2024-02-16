import './App.css';
import React, { useState, useEffect } from "react";
import NavBar from './/components/NavBar.js';
import axios from 'axios';
import { Alert, Button, Card, CardBody, CardText, Col, Container, Image, Row, Spinner } from 'react-bootstrap';

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageText, setImageText] = useState('');

  const [post, setPost] = useState(null);

  const [loading, setLoading] = useState(false);



  // create sample useEffect to test axios get request using this url https://jsonplaceholder.typicode.com/posts/1
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        setPost(response.data.body);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setImageText('');
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8000/uploadfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      const textResponse = response.data.text;
      setImageText(textResponse);
    } catch (error) {
      console.error('Error uploading file:', error);
      setImageText('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const displayData = (data) => {
    if (typeof data === 'string') {
      return <Alert variant="success">{data}</Alert>;
    } else {
      <p>Cannot read image</p>
    }
  };


  return (
    <div className="App">
      <NavBar />
      <br />
      <Container>
        <Row className="mb-3">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <Button variant="primary" type="submit">Upload</Button>
          </form>
        </Row>
        <Row className="mb-3">
          {selectedFile &&
            <div className="image-view">
              <Image thumbnail src={URL.createObjectURL(selectedFile)} />
            </div>
          }
        </Row>
        <Row className="justify-content-md-center">
          <div>
            {loading &&
              <Spinner animation="border" role="status" />}
          </div>
        </Row>
        <Row className="mb-3">
          {imageText && (
            <Card>
              <CardBody>
                <CardText className="mb-2">Image Text</CardText>
                {displayData(imageText)}
              </CardBody>
            </Card>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
