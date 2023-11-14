import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'react-text-gradients';
import Card from './tools/Card';
import RewardCard from './tools/rewardCard';
import { selectedData, setConfig } from './Store';
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
    const { selectedBox, setOpeningBox } = selectedData();

    const { config } = setConfig();

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
                {
                    config && config.Crates
                    ? config.Crates.map((card, index) => <Card key={index} index={index} {...card} />)
                    : null
                }
                </div>

                {selectedBox !== null && config.Crates[selectedBox] !== null && (
                    <div style={{display: 'flex', flexDirection: 'column' }}>
                        <LinearGradient style={TITLE_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                            Selected Crate
                        </LinearGradient>

                        <LinearGradient style={DESCRIPTION_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                            Viewing {config.Crates[selectedBox].text} Lootbox
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
                                {config.Crates[selectedBox].rewards && config.Crates[selectedBox].rewards.map((reward, index) => (
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
                                   {config.Crates[selectedBox].requirements && config.Crates[selectedBox].requirements.map((reward, index) => (
                                    <RewardCard key={index} {...reward} />
                                    ))}
                                </div>
                            </div>
                        
                            
                            <MdKeyboardDoubleArrowRight style={{ color: 'white', fontSize: '10rem', marginLeft: '7rem', marginTop: '5px', }} />

                            <button 
                            onClick={() => {
                                setOpeningBox(true)
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