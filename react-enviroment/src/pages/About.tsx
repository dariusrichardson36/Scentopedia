import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <h2 className="about-heading">About Scentopedia</h2>
            <p className="about-text">
                Welcome to Scentopedia, a fragrance discovery platform created by five friends who are passionate about scents. We believe...
            </p>
        </div>
    );
};

export default About;
