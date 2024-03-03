import '../App.css';
import React, { useState } from "react";
import axios from 'axios';
import { Alert, Button, Card, CardBody, CardText, Container, Image, Row, Spinner } from 'react-bootstrap';

function Home() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageText, setImageText] = useState('');
  
    const [loading, setLoading] = useState(false);
  
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
        <p>Oops!!! Cannot read image</p>
      }
    };

  return (
    <div className="App">
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
              <Spinner animation="grow" variant='war' role="status" />}
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
  )
}

export default Home