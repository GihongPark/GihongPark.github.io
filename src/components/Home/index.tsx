import React from 'react';
import './home.scss';

function Home () {

    return (
        <section className='home'>
            <div id="bg">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </div>
            <div className="text">
                <span className="desc">Front End Developer / React</span>
                <h2 className="glitch">BEYOND <span className="style1">MYSELF</span></h2>
                {/* <a href="#section2" className="skew"><span>I NEED YOU TO HIRE ME</span></a> */}
            </div>
        </section>
    )
}

export default Home;