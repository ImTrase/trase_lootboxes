import React, { useState } from 'react';
import stripe from '../../assets/images/stripes.svg';
import {MdKeyboardDoubleArrowRight} from 'react-icons/md';

import { selectedData } from '../Store';


interface cardProps {
    text: string;
    image: string;
    color: string;
    border: string;
    hoverColor: string;
    index: number;
}

const CARD_STYLES = {
    border: '1px solid rgba(255, 255, 255, 0.25)',
    background: 'rgba(194, 194, 194, 0.25)',
    position: 'relative',
    minWidth: '185px', // Adjusted width
    width: 'auto', // Dynamic width based on content   width: '185px',
    height: '223px'
};

const STRIPE_STYLES = {
    position: 'absolute',
    top: 21,
    left: 13,
    width: '7%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
}

const STRIPE_STYLES2 = {
    position: 'absolute',
    bottom:  50,
    right: 13,
    width: '7%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
}

const IMAGE_STYLES = {
    position: 'absolute',
    top: '-4%',
    margin: 0,
    padding: 0,
    left: 13,
    width: '172px',
    height: 'auto',
}

const LABEL_CONTAINER = {
    position: 'absolute',
    bottom:  42,
    left: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
}

const ICON_STYLES = {
    color: '#b8b8b8',
    fontSize: '32px',
    marginRight: '-2px',
    margin: 0,
    marginTop: '3px',
}

const TEXT_STYLES = {
    color: 'white',
    fontSize: '14px',
    fontFamily: 'Skate Sans',
    margin: 0,
    padding: 0
}

const BUTTON_STYLES = {
    width: '162px',
    height: '36px',
    position: 'absolute',
    bottom:  5,
    left: 13,
    outline: 'none',
    color: 'white',
    fontFamily: 'Hind Jalandhar Regular',
    letterSpacing: '1.2px',
    paddingTop: '5px',
    transition: 'all 0.3s ease-in-out',
}

const TEXT_CONTAINER = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',  // Align to the left
    justifyContent: 'center',
    // text align
    textAlign: 'left',
    left: 0,
}

const TEXT_DESCRIPTION = {
    color: '#b8b8b8',
    fontSize: '10px',
    fontFamily: 'Skate Sans',
    margin: '-5px 0 0 0',  // Adjust the margin values as needed
    padding: 0,
}

const Card: React.FC<cardProps> = ({ index, text, image, color, border, hoverColor }) => {
    const [isHovered, setHovered] = useState(false);
    const { selectedBox, setSelectedBox } = selectedData();

    const handleHover = () => {
        setHovered(true);
    };

    const handleLeave = () => {
        setHovered(false);
    };

    const buttonStyles = {
        ...BUTTON_STYLES,
        background: isHovered ? hoverColor : color,
        border: border,
    };

    return (
        <div style={CARD_STYLES}>
            <img src={stripe} style={STRIPE_STYLES}></img>
            <img src={image} style={IMAGE_STYLES}></img>
            <img src={stripe} style={STRIPE_STYLES2}></img>
           
            <div style={LABEL_CONTAINER}>
                <MdKeyboardDoubleArrowRight style={ICON_STYLES} />
                <div style={TEXT_CONTAINER}>
                    <p style={TEXT_STYLES}>{text}</p>
                    <p style={TEXT_DESCRIPTION}>Lootbox</p>
                </div>
            </div>
           
           <button 
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => setSelectedBox(index)}
            style={buttonStyles}>
                SELECT CRATE
           </button>
        </div>
    );
};

export default Card;