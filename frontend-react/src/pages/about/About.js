//import React from 'react';  
import "./about.css";
import aboutImage from "../../images/aboutImage.png"

function About () {  
    return (
    <div className="aboutDiv">  
        <section className="aboutSection">
            <h1>About</h1>
            <div>
                <img className = "sidebarImg"
                src={aboutImage}
                alt=""
                 />
            </div>
            <p>
                <strong>
                    Learning React is really fun, 
                    but it takes patience and practice.
                </strong>
            </p>
            <p>
                Learning React is really fun, 
                but it takes patience and practice.
            </p>
            <section>
                <h2>MongoDB</h2>
                <h2>Express JS</h2>
            </section>
        </section>
    </div>
    )
}  
export default About;  