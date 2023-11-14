import React, { useState } from 'react';
import { LinearGradient } from 'react-text-gradients';

import { fetchNui } from '../../utils/fetchNui';
import { setConfig } from '../Store';

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
    const { config } = setConfig();

    const handleHover = () => {
        setHovered(true);
    };

    const handleLeave = () => {
        setHovered(false);
    };

    const handleClaim = () => {
        fetchNui('collectItems', { data: JSON.stringify(item) });
    };

    const imagePath = './images/' + item.item + '.png';

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
            position: 'absolute', // Position the image
            top: '25%', // Center horizontally
        }}
        gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}
        >
            {config !== null ? config.Strings['winnings_title'] : 'YOUR WINNINGS'}
        </LinearGradient>

        <div
            style={{
                width: '250px', // Fixed width
                height: '250px', // Fixed height
                overflow: 'hidden', // Ensure the circular border is applied
                borderRadius: '50%', // Make it a circle
                border: '1px solid rgba(255, 255, 255, 0.40)', // Add a white border to the circle
                display: 'flex', // Use flex container
                alignItems: 'center', // Center vertically
                justifyContent: 'center', // Center horizontally
            }}
        >
            <img
                src={imagePath}
                alt={item.itemLabel}
                style={{
                    width: '80%',
                    height: 'auto',
                    objectFit: 'cover', // Ensure the image covers the container while maintaining aspect ratio
                    borderRadius: '50%', // Make it a circle
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
            x{item.amount} {item.itemLabel}
        </p>
        <button
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClaim}
            style={isHovered ? BUTTON_STYLES_HOVER : BUTTON_STYLES}
        >
            {config !== null ? config.Strings['winnings_button_claim'] : 'Claim'}
        </button>
        </div>
    </div>
    );
}