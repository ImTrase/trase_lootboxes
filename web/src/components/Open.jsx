import React, { useState, useRef, useEffect } from 'react';

import PossibleReward from './tools/PossibleReward'
import WinningCard from './tools/YourWinnings'
import selector from '../assets/images/selector.svg'

import opening from '../assets/opening.mp3'

import { selectedData, setConfig } from './Store';

import { LinearGradient } from 'react-text-gradients';


function shuffleArray(odds, totalBoxes, options) {
    const boxes = [];

    for (let i = 0; i < totalBoxes; i++) {
        const randomValue = Math.random();
        let cumulativeProbability = 0;
        let selectedTier = 'common';

        for (const tier in odds) {
            cumulativeProbability += odds[tier];
            if (randomValue <= cumulativeProbability) {
                selectedTier = tier;
                break;
            }
        }

        const matchingOptions = options.filter(option => option.tier === selectedTier);
        const randomIndex = Math.floor(Math.random() * matchingOptions.length);
        boxes.push(matchingOptions[randomIndex]);
    }

    return boxes;
}

export default function OpenCrate() {
    const [spin, setSpin] = useState(false);
    const [translationValue, setTranslation] = useState(0);
    const [winningItem, setWinningItem] = useState(null);
    const [randomizedItemRewards, setRandomizedItemRewards] = useState([]);
    const winningNumber = 705;

    const { config } = setConfig();
    const { selectedBox, openingBox } = selectedData();

    const audioRef = useRef(null);

    useEffect(() => {
        // Play the audio when the spin starts
        if (spin && config.EnableSpinningSound) {
            audioRef.current.play();
        }
    }, [spin]);

    useEffect(() => {
        const itemRewards = Array.from({ length: 1000 }, () => config.Crates[selectedBox].rewards).flat();
        const odds = config.RarityOdds
        const shuffledRewards = shuffleArray(odds, 1000, itemRewards);
        setRandomizedItemRewards(shuffledRewards);
     
        // Set a small delay before starting the spin animation
        const spinTimeout = setTimeout(() => {
            setSpin(true);
        }, 50);
    
        // Calculate the transition value
        const transition = -40090;
        setTranslation(transition)
    
        // Set another timeout for stopping the spin and showing the winning item
        const stopSpinTimeout = setTimeout(() => {
            setSpin(false);
            setWinningItem(shuffledRewards[winningNumber]);
        }, 12000);
    
        // Cleanup timeouts on component unmount or when openingBox changes
        return () => {
            clearTimeout(spinTimeout);
            clearTimeout(stopSpinTimeout);
        };
    }, [openingBox]);

    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                position: 'relative', // Added position relative to the container
                overflow: 'hidden',

                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)', // Dark overlay so its easy to see
            }}
        >
           <LinearGradient style={{
                fontSize: '64px',
                fontFamily: 'Skate Sans',
                // Add the stroke styles here
                WebkitTextStroke: '0.4px white', // Webkit prefix for better browser compatibility
                textStroke: '1px white', // Standard property
                textAlign: 'left',

                position: 'absolute',
                top: '10%',
           }} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
                {config !== null ? config.Strings['selector_title'] : 'Opening'}
            </LinearGradient>
           <p style={{
                position: 'absolute',
                top: '18%',
                fontSize: '20px',
                color: 'rgba(234, 234, 234, 0.80)',
                textAlign: 'center',
                fontFamily: 'Fira Sans',
           }}>
                {config !== null ? config.Strings['selector_description'] : 'Wait for the wheel to stop scrolling!'}
           </p>

            <hr
                style={{
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.40) 50.07%, rgba(255, 255, 255, 0.00) 100%)',
                    border: 'none',
                    height: '1px',
                    position: 'absolute',
                    left: 0,
                    top: '34%',
                    right: 0,
                }}
            />
            

            {/* Audio */}
            <audio ref={audioRef} src={opening} />

            {/* Arrow Section */}
            <img src={selector} style={{
                position: 'absolute',
                top: '33.5%',
                left: '50%',
                transform: 'translateX(-50%)', // Center the arrow horizontally
            }}></img>

            <img src={selector} style={{
                position: 'absolute',
                bottom: '33.5%',
                left: '50%',
                transform: 'translateX(-50%) rotate(180deg)', // Center and rotate the arrow
            }}></img>

            {winningItem !== null && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 50, 0.7)', // Dark blue overlay with transparency
                    zIndex: 999, // Ensure the overlay is above other elements
                    backdropFilter: 'blur(5px)', // Adjust the blur amount as needed
                }}> 
                    <WinningCard item={winningItem}></WinningCard>
                </div>
            )}

            <div
                className="rewards-container"
                style={{
                    display: winningItem !== null ? 'none' : 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100000%',
                    height: '100%',
                    padding: '10px',
                    boxSizing: 'border-box',
                    gap: '13px',
                    overflow: 'hidden',
                    transform: spin ? `translateX(${translationValue}px)` : 'translateX(0px)', // Added the translation value
                    transition: spin ? 'transform 10s ease-in-out' : 'none',
                }}
            >
                {
                    randomizedItemRewards.map((option, index) => (
                        <PossibleReward
                            key={index}
                            item={option.itemLabel}
                            actualItem={option.item}
                            image={option.image}
                            tier={option.tier}
                            amount={option.amount}
                            id={`card-${index}`}
                        />
                    ))
                }
            </div>

            <hr
                style={{
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.40) 50.07%, rgba(255, 255, 255, 0.00) 100%)',
                    border: 'none',
                    height: '1px',
                    position: 'absolute',
                    left: 0,
                    bottom: '34%',
                    right: 0,
                }}
            />
            
            {/* <button style={{ position: 'absolute', bottom: 100 }} onClick={handleSpinClick}>Spin</button> */} {/* Spin button (USE THIS FOR DEVELOLPING) */}
        </div>
    );
}