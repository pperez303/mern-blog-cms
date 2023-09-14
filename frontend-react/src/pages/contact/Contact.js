//import React from 'react';  
import "./contact.css";
import neo from "../../images/neo.jpg"


function Contact () {  
    return (
    <main className="main">
        <h2>Get in touch</h2>
        <section className="contact">
            <header className="contact_Header">
                <img className = "contact_Img" src={neo} alt="" />
                <div className="contact_Name">
                    <h3>Peter Perez</h3>
                    <p>Technical Project Manager</p>
                </div>
            </header>
            <p className="contact_Email">
               neodog@gmail.com
            </p>
            <p className="contact_Phone">
                1-725-111-1111
            </p>
        </section>
    </main>
    )
}  
export default Contact;  