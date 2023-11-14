import React, { useState } from 'react';
import { LinearGradient } from 'react-text-gradients';

import { fetchNui } from '../../utils/fetchNui';

const BUTTON_STYLES = {
    borderRadius: '10px',
    background: '#326AD7',
    padding: '13px 64px',
    border: 'none',
    color: '#EAEAEA',
    fontFamily: 'Fira Sans',
    fontWeight: 400,
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer', // Add pointer cursor on hover
    transition: 'all 0.2s ease',
}

const BUTTON_STYLES_HOVER = {
    ...BUTTON_STYLES,
    background: '#18356e',
}

export default function WinningCard({ item }) {
    const [isHovered, setHovered] = useState(false);

    const handleHover = () => {
        setHovered(true);
    };

    const handleLeave = () => {
        setHovered(false);
    };

    const handleClaim = () => {
        console.log('sent')
        fetchNui('collectItems', { data: JSON.stringify(item) });
    };

    return (
    <div
        style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
        top: '45%', // Center horizontally
        left: '50%', // Center vertically
        transform: 'translate(-50%, -50%)', // Center horizontally and vertically
        padding: '10px',
        }}
    >
        <LinearGradient
        style={{
            textAlign: 'left',
            fontSize: '64px',
            fontWeight: 700,
            fontFamily: 'Skate Sans',
            position: 'relative', // Position the image
            top: '10%', // Center horizontally
        }}
        gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}
        >
            YOUR WINNINGS
        </LinearGradient>

        <div
        style={{
            width: '15%',
            height: 'auto',
            overflow: 'hidden', // Ensure the circular border is applied
            borderRadius: '50%', // Make it a circle
            border: '1px solid rgba(255, 255, 255, 0.40)', // Add a white border to the circle
            margin: '10% 0', // Adjust margin as needed
        }}
        >
        <img
            src={item.image}
            alt={item.item}
            style={{
            width: '100%',
            height: 'auto',
            position: 'relative',
            top: '0px',
            padding: '0px',
            margin: '4px 0px 0px 4px',
            }}
        />
        </div>

        <div
        style={{
            position: 'absolute',
            bottom: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <p
            style={{
            color: '#EAEAEA',
            fontFamily: 'Fira Sans',
            fontWeight: 400,
            fontSize: '16px',
            }}
        >
            {item.item}
        </p>
        <button
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClaim}
            style={isHovered ? BUTTON_STYLES_HOVER : BUTTON_STYLES}
        >
            Claim
        </button>
        </div>
    </div>
    );
}