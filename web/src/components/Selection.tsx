import React, { useState } from 'react';
import { LinearGradient } from 'react-text-gradients';
import Card from './tools/Card';
import RewardCard from './tools/rewardCard';
import legendary from '../assets/images/legendary.png';
import sourpatch from '../assets/images/sour_patch_kids.png';
import { selectedData } from './Store';
import {MdKeyboardDoubleArrowRight} from 'react-icons/md';

const BOX_STYLES = {
    position: 'relative',
    padding: '1rem',
    margin: '1rem',
    background: 'linear-gradient(130deg, #0038FF -3.19%, rgba(0, 0, 0, 0.50) 62.7%)',
    height: '65%',
    width: '64%',
    overflow: 'hidden', // Ensure the inner border does not affect dimensions
    textAlign: 'left',
};

const INNER_BORDER_STYLES = {
    content: '""',
    position: 'absolute',
    top: '3%', // Adjust as needed
    left: '1.2%', // Adjust as needed
    right: '1.2%', // Adjust as needed
    bottom: '3%', // Adjust as needed
    border: '1px solid white',
};

const TITLE_STYLES = {
    fontSize: '35px',
    fontFamily: 'Skate Sans',
    // Add the stroke styles here
    WebkitTextStroke: '0.4px white', // Webkit prefix for better browser compatibility
    textStroke: '1px white', // Standard property
    position: 'relative', // Adjusted position to be relative
    textAlign: 'left',
};

const BOX_ELEMENTS = {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: 25,
    paddingTop: 15,
    paddingLeft: 45,
    width: '89%', // Adjusted width
}

const DESCRIPTION_STYLES = {
    fontSize: '16px',
    fontFamily: 'Skate Sans',
    textAlign: 'left',
    margin: '-10px 0 10px 0',
};

const CARDS_CONTAINER = {
    display: 'flex',
    gap: '33px',
    overflowX: 'auto',
    paddingBottom: '10px',
}


const cardData = [
    { 
        text: 'Legendary', 
        image: legendary, 
        color: 'linear-gradient(158deg, #D24C00 8.96%, #6A2600 85.48%)', 
        border: '0.7px solid #FFBD80', 
        hoverColor: '#804719',
        requirements: [
            { tier: 'requirement', image: sourpatch, item: 'Sourpatch', amount: '1' },
        ],
        rewards: [
            { tier: 'legendary', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'epic', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'rare', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'common', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'uncommon', image: sourpatch, item: 'Sourpatch', amount: '5' },
        ],
    },
    { 
        text: 'Epic', 
        image: legendary, 
        color: 'linear-gradient(158deg, #A803FD 8.96%, #4101FF 85.48%)',
        border: '0.7px solid #ED80FF', 
        hoverColor: '#67009c',
        requirements: [
            { tier: 'requirement', image: sourpatch, item: 'Sourpatch', amount: '1' },
        ],
        rewards: [
            { tier: 'legendary', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'epic', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'rare', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'common', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'uncommon', image: sourpatch, item: 'Sourpatch', amount: '5' },
        ],
    },
    { 
        text: 'Rare', 
        image: legendary, 
        color: 'linear-gradient(158deg, #005CEA 8.96%, #002F8B 85.48%)', 
        border: '0.7px solid #80C2FF', 
        hoverColor: '#003d9c',
        requirements: [
            { tier: 'requirement', image: sourpatch, item: 'Sourpatch', amount: '1' },
        ],
        rewards: [
            { tier: 'legendary', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'epic', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'rare', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'common', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'uncommon', image: sourpatch, item: 'Sourpatch', amount: '5' },
        ],
    },
    { 
        text: 'Common', 
        image: legendary, 
        color: 'linear-gradient(158deg, #11D900 8.96%, #008B16 85.48%)', 
        border: '0.7px solid #91FF80', 
        hoverColor: '#004f0d',
        requirements: [
            { tier: 'requirement', image: sourpatch, item: 'Sourpatch', amount: '1' },
        ],
        rewards: [
            { tier: 'legendary', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'epic', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'rare', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'common', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'uncommon', image: sourpatch, item: 'Sourpatch', amount: '5' },
        ],
    },
    { 
        text: 'Uncommon', 
        image: legendary, 
        color: 'linear-gradient(158deg, #A1A1A1 8.96%, #474747 85.48%)', 
        border: '0.7px solid #fff', 
        hoverColor: '#4f4f4f',
        requirements: [
            { tier: 'requirement', image: sourpatch, item: 'Sourpatch', amount: '1' },
        ],
        rewards: [
            { tier: 'legendary', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'epic', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'rare', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'common', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'uncommon', image: sourpatch, item: 'Sourpatch', amount: '5' },
        ],
    },
    { 
        text: 'Legendary', 
        image: legendary, 
        color: 'linear-gradient(158deg, #A1A1A1 8.96%, #474747 85.48%)', 
        border: '0.7px solid #fff', 
        hoverColor: '#4f4f4f',
        requirements: [
            { tier: 'requirement', image: sourpatch, item: 'Sourpatch', amount: '1' },
        ],
        rewards: [
            { tier: 'legendary', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'epic', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'rare', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'common', image: sourpatch, item: 'Sourpatch', amount: '5' },
            { tier: 'uncommon', image: sourpatch, item: 'Sourpatch', amount: '5' },
        ],
    },
    // Add more card data as needed
];

const BUTTON_STYLES = {
    position: 'absolute',
    right: 35,
    bottom: 100,
    width: 'auto',
    padding: '14px 18px',
    borderRadius: '8px',
    border: '0.4px solid rgba(152, 152, 152, 0.45)',
    background: 'rgba(0, 0, 0, 0.25)',
    color: 'white',
    fontFamily: 'Skate Sans',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'background 0.2s ease-in-out',
};
  
const BUTTON_HOVER_STYLES = {
    background: '#0047FF',
};

export default function Sidebar() {
    const [isHovered, setHovered] = useState(false);
    const { selectedBox, setSelectedBox } = selectedData();

    const handleHover = () => {
        setHovered(true);
    };

    const handleLeave = () => {
        setHovered(false);
    };

    return (
        <div style={BOX_STYLES}>
            <div style={BOX_ELEMENTS}>
                <LinearGradient style={TITLE_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                    Lootboxes
                </LinearGradient>
            
                <LinearGradient style={DESCRIPTION_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                    Select the lootbox!
                </LinearGradient>
            
                <div style={CARDS_CONTAINER}>
                    {cardData.map((card, index) => (
                        <Card key={index} index={index} {...card} />
                    ))}
                </div>

                {selectedBox !== null && cardData[selectedBox] !== null && (
                    <div style={{display: 'flex', flexDirection: 'column' }}>
                        <LinearGradient style={TITLE_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                            Selected Crate
                        </LinearGradient>

                        <LinearGradient style={DESCRIPTION_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                            Viewing {cardData[selectedBox].text} Lootbox
                        </LinearGradient>

            
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative'}}>
                                <LinearGradient style={{ fontFamily: 'Skate Sans', }} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                                    Rewards
                                </LinearGradient>

                                <hr
                                    style={{
                                        width: '20%',
                                        left: 0,
                                        position: 'absolute',
                                        top: 15,
                                        border: 'none',
                                        background: 'linear-gradient(to right, blue, rgba(0, 0, 255, 0))',
                                        height: '1px'
                                    }}
                                ></hr>

                                <div style={{
                                    marginTop: '4px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                    overflowY: 'auto',
                                    height: '70%',
                                    paddingRight: '4px',
                                }}>
                                {cardData[selectedBox].rewards && cardData[selectedBox].rewards.map((reward, index) => (
                                    <RewardCard key={index} {...reward} />
                                ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '24px'}}>
                                <LinearGradient style={{ fontFamily: 'Skate Sans', }} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                                    Requirements
                                </LinearGradient>

                                <hr
                                    style={{
                                        width: '40%',
                                        left: 0,
                                        position: 'absolute',
                                        top: 15,
                                        border: 'none',
                                        background: 'linear-gradient(to right, blue, rgba(0, 0, 255, 0))',
                                        height: '1px'
                                    }}
                                ></hr>

                                <div style={{
                                    marginTop: '4px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                    overflowY: 'auto',
                                    height: '70%',
                                    paddingRight: '4px',
                                }}>
                                   {cardData[selectedBox].requirements && cardData[selectedBox].requirements.map((reward, index) => (
                                    <RewardCard key={index} {...reward} />
                                    ))}
                                </div>
                            </div>
                        
                            
                            <MdKeyboardDoubleArrowRight style={{ color: 'white', fontSize: '10rem', marginLeft: '7rem', marginTop: '5px', }} />

                            <button 
                            onClick={() => {
                                alert('open')
                            }}
                            onMouseEnter={handleHover}
                            onMouseLeave={handleLeave}
                            style={{ ...BUTTON_STYLES, ...(isHovered && BUTTON_HOVER_STYLES) }}
                            >
                                Open Crate
                            </button>
                        </div>
                    </div>
                )}
            </div>
      
     
      
          <div style={INNER_BORDER_STYLES}></div>
        </div>
    );
}