import React, { useState } from 'react';
import { s3 } from '../../services/aws/awsConfig';

const Gallery = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;
    
    const params = {
      Bucket: 'your-bucket-name',
      Key: file.name,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read', 
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      console.log('File uploaded successfully:', uploadResult);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload Image</button>
    </div>
  );
};

export default Gallery;
