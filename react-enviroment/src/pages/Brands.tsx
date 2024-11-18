// src/pages/About.tsx

import React, { useEffect } from 'react';
import './About.css';

// About Component
// This component renders information about Scentopedia, including its origins and purpose.
const About: React.FC = () => {
    useEffect(() => {
        document.title = "About Scentopedia";
    }, []);

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

/*
Documentation Summary:
- `About` is a React functional component that renders the "About Scentopedia" section.
- It includes a heading and a paragraph of text that introduces users to the Scentopedia platform.
- The component uses styles defined in the `About.css` file to style its content.
- The `useEffect` hook is used to set the document title to "About Scentopedia" when the component is mounted.
*/