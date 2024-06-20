import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import configData from "../config.json";

const replaceHtmlTagsRecursive = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => replaceHtmlTagsRecursive(item));
  }

  if (typeof data === "object") {
    const newData = {};

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        newData[key] = replaceHtmlTagsRecursive(data[key]);
      }
    }

    return newData;
  }

  if (typeof data === "string") {
    // Replace HTML tags using regex
    return data.replace(/(<([^>]+)>)/gi, "");
  }

  // Return other data types unchanged
  return data;
};

export default function Home() {
  const [posts, setPosts] = useState([{}]);
  useEffect(() => {
    console.log("primesc datele");
    axios
      .get(configData.SERVER_POST_URL + "last3")
      .then(({ data }) => {
        console.log(data["data"]);
        const updatedData = replaceHtmlTagsRecursive(data["data"]);
        setPosts(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
    <>
      <Header />
      <section className="bg-light py-3 shadow-sm">
        <div className="container">
          <div className="row">
            <h1>The last posts</h1>

            {posts.map((data, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-4 col-lg-4  d-flex align-items-stretch"
              >
                <div className="card mb-4">
                  <a href="#!">
                    <img
                      className="card-img-top"
                      src={`http://localhost:3002/uploads/${data.poza}`}
                      alt="..."
                    />
                  </a>
                  <div className="card-body d-flex flex-column">
                    <div className="small text-muted">
                      Category: {data.categorie_nume}
                    </div>
                    <h2 className="card-title h4">{data.titlu} </h2>
                    {/* <p className="card-text" dangerouslySetInnerHTML={{ __html: data.continut.substring(0, 250)}} /> */}
                    <p className="card-text">
                      {data.continut ? data.continut.substring(0, 100) : ""}
                    </p>
                    <Link
                      to={"/post/" + data.id}
                      className="btn btn-primary mt-auto align-self-start"
                    >
                      Read more
                    </Link>
                    {/* <a className="btn btn-primary" href="#!">Read more →</a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
