import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5001/api/posts', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    .then(res => {
      const found = res.data.find(p => p._id === id);
      setPost(found);
    })
    .catch(console.error);
  }, [id, token]);

  if (!post) return <p>Loading…</p>;

  return (
    <div className="card mb-4 shadow-sm">
      {post.imagePath && (
        <img className="card-img-top"
        src={`http://localhost:5001/uploads/${post.imagePath}`}
          alt={post.title}
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="text-muted mb-2">Category: {post.category}</p>
        <p className="card-text">{post.content}</p>
        <Link to="/" className="btn btn-secondary">Back to Posts</Link>
      </div>
    </div>
  );
}
