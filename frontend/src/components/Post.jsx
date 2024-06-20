import React from "react";

export default function Post() {
  return (
    // <!-- Blog post-->
    <div className="col-lg-6">
      <div className="card mb-4">
        <a href="#!">
          <img
            className="card-img-top"
            src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
            alt="..."
          />
        </a>
        <div className="card-body">
          <div className="small text-muted">January 1, 2023</div>
          <h2 className="card-title h4">Post Title</h2>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            aliquid atque, nulla.
          </p>
          <a className="btn btn-primary" href="#!">
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}
