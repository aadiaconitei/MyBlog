import React, { useState,useEffect }  from "react";
import {useParams} from 'react-router-dom';
import configData from "../config.json";
import axios from "axios";
export default function SinglePost() {
  const params = useParams();
  const [post, setPost]  = useState([{}]);
  useEffect(() => {
    console.log("primesc datele");
    axios
      .get(configData.SERVER_POST_URL +params.id)
      .then(({ data }) => {
        console.log(data['data']);
        
        setPost(data['data']);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  return (
    // Page content
    <div className="container my-4">
      <div className="row">
        <div className="card mb-4">
          <a href="#!">
            <img
              className="card-img-top"
              src={`http://localhost:3002/uploads/${ post.poza }`}
              alt="..."
            />
          </a>
          <div className="card-body">
            <div className="small text-muted">Category: {post.categorie_nume} Date: { post.dataadaugare }</div>
            <h2 className="card-title">{post.titlu}</h2>
          <p className="card-text" dangerouslySetInnerHTML={{ __html: post.continut}} />
            
          </div>
        </div>
      </div>
    </div>
  );
}