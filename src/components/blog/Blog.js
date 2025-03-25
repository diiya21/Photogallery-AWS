import React, { useState } from 'react';
import { DynamoDB } from 'aws-sdk';
// import 'photo-gallery-blog/src/components/blog/BlogStyle.css';

const Blog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = async () => {
    const docClient = new DynamoDB.DocumentClient();
    const params = {
      TableName: 'Blogs', 
      Item: {
        blogId: `blog-${Date.now()}`,
        title: title,
        content: content,
        timestamp: new Date().toISOString(),
      },
    };

    try {
      await docClient.put(params).promise();
      console.log('Blog post saved successfully');
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Post Blog</button>
    </div>
  );
};

export default Blog;
