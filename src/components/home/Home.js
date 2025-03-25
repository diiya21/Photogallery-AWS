import React, { useState, useEffect } from 'react';
import { s3 } from '../../services/aws/awsConfig'; 
// import 'photo-gallery-blog/src/components/home/HomeStyle.css'

const Home = () => {
  const [images, setImages] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const fetchImages = async () => {
    try {
      const result = await s3.listObjectsV2({ Bucket: 'photogalleryappbucket' }).promise();
      setImages(result.Contents);
    } catch (error) {
      setError(error.message);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const params = {
      Bucket: 'photogalleryappbucket',
      Key: image.name,
      Body: image,
      ContentType: image.type,
      ACL: 'public-read',
    };

    try {
      await s3.upload(params).promise();
      alert('Image uploaded successfully!');
      setIsAdding(false);
      fetchImages();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <nav className="nav">
        <ul>
          <li onClick={() => setIsAdding(false)}>Home</li>
          <li onClick={() => setIsAdding(true)}>Add</li>
        </ul>
      </nav>
      {isAdding ? (
        <div>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={uploadImage}>Upload</button>
        </div>
      ) : (
        <div>
          <h2>Home</h2>
          <div className="gallery">
            {images.map((image) => (
              <img
                key={image.Key}
                src={`https://photogalleryappbucket.s3.amazonaws.com/${image.Key}`}
                alt={image.Key}
              />
            ))}
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Home;
