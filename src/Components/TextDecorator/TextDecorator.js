import React from 'react';
import './TextDecorator.css';

const TextDecorator = ({text,styles}) => {
    return (
        <div>
            <div className="text" style={{
                ...styles
            }}>
                {text}
            </div>
        </div>
    )
}

export default TextDecorator;