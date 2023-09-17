//import React from 'react';  
import "./about.css";
import neo from "../../images/neo.jpg"

//components
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";

function About () {  
    return (
    <>
        <Header />
        <main className="main">            
            <div className="aboutsection">
                <h2>About</h2>
                <section className="about">
                    <header className="aboutHeader">
                        <img className = "aboutImg" src={neo} alt="" />
                        <div className="aboutInfo">
                            <h3>Peter Perez</h3>
                            <p>Technical Project Manager</p>
                        </div>
                    </header>
                    <p className="aboutDesc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Modi laudantium atque quisquam, perferendis id maxime 
                        aliquam praesentium numquam ipsum debitis, eligendi 
                        aspernatur hic tempora ab. Quidem non exercitationem sit porro!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Nesciunt ab suscipit ducimus! Quod libero eligendi esse 
                        similique praesentium neque rem, assumenda rerum nesciunt 
                        alias voluptatem cum quo reprehenderit, voluptas sed.
                    </p>
                </section>
                
                <section className="MERN">
                    <h3>MERN</h3>
                    <p>MongoDB</p>
                    <p>ExpressJS</p>
                    <p>ReactJS</p>
                    <p>NodeJS</p>
                </section>
            </div>
            <Sidebar className="sidesection"/>
        </main>
    </>
    )
}  
export default About;  