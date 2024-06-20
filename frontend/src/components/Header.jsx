import React from 'react'

export default function Header() {
  return (
        // Page header with logo and tagline
        <header className="py-3 bg-light border-bottom ">  
            <div className="container">
                <div className="text-center my-3">
                    <h1 className="fw-bolder">Welcome to Blog RNEM!</h1>
                    <p className="lead mb-0">FrontEnd: HTML5, CSS3, Bootstrap 5, React 18.2 </p>
                    <p className="lead mb-0">BackEnd: NodeJs + Express, TypeScript,  MySQL</p>
                </div>
            </div>
        </header>
  )
}