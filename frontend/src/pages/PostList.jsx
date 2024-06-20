import React, { useState, useEffect } from "react";
import axios from "axios";
import configData from "../config.json";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funcția de încărcare a articolelor de la API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(configData.SERVER_POST_URL);
      setPosts(response.data["data"]);
      setLoading(false);
    } catch (error) {
      setError("Nu am putut încărca articolele.");
      setLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Funcția de ștergere a unui articol
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      setError("Eroare la ștergerea articolului.");
    }
  };

  // Funcția de editare a unui articol
  // Redirecționarea către pagina de editare
  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  if (loading) {
    return <p className="alert alert-info">Se încarcă...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de articole</h1>
      <ul className="list-group">
        {posts.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{post.titlu}</span>
            <div>
              <button
                onClick={() => handleEdit(post.id)}
                className="btn btn-primary btn-sm me-2"
              >
                Editează
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="btn btn-danger btn-sm"
              >
                Șterge
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
