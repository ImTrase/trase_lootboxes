import React, { useState, useRef, useEffect } from 'react';

import {debugData} from "../utils/debugData";
import PossibleReward from './tools/PossibleReward'

import selector from '../assets/images/selector.svg'

debugData([
    {
      action: 'openCrate',
      data: true,
    }
])

const Options = [
    {
        item: 'Mas 1k',
        image: 'https://i.imgur.com/M7bABmb.png',
        tier: 'common',
        amount: '1',
    },
    {
        item: 'Mask 2',
        image: 'https://i.imgur.com/M7bABmb.png',
        tier: 'legendary',
        amount: '1',
    },
    {
        item: 'Mask 3',
        image: 'https://i.imgur.com/M7bABmb.png',
        tier: 'rare',
        amount: '1',
    },
    {
        item: 'Mask 4',
        image: 'https://i.imgur.com/M7bABmb.png',
        tier: 'uncommon',
        amount: '1',
    },
    {
        item: 'Mask 5',
        image: 'https://i.imgur.com/M7bABmb.png',
        tier: 'epic',
        amount: '1',
    },
]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}  

export default function OpenCrate() {
    // function to make 1000 PossibleRewards from the options
    const itemRewards = Array.from({ length: 100 }, () => Options).flat();
    const randomizedItemRewards = shuffleArray(itemRewards);

    const [spin, setSpin] = useState(false);
    const [translationValue, setTranslation] = useState(0);

    const handleSpinClick = () => {
        setSpin(true);

        const middleCard = Math.floor(randomizedItemRewards.length / 2);
        const cardWidth = 182;
        const cardGap = 13;
        const translationValue = -middleCard + (cardWidth + cardGap) + window.length / 2;
        setTranslation(translationValue)

        setTimeout(() => {
            setSpin(false);
            const winningCard = Math.floor(randomizedItemRewards.length / 2);
            console.log(randomizedItemRewards[winningCard])
        }, 14000);
    };

    useEffect(() => {
        const cardElement = document.getElementById('card-3');
        if (cardElement) {
          // Access the element and do something with it
          console.log(cardElement);
        }
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

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
            }}
        >
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

            <div
                className="rewards-container"
                style={{
                    display: 'flex',
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
                    transform: spin ? `translateX(${translationValue}px)` : '', // Added the translation value
                    transition: 'transform 10s ease-in-out',
                }}
            >
                {
                    randomizedItemRewards.map((option, index) => (
                        <PossibleReward
                            key={index}
                            item={option.item}
                            // item={option.item}
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
            
            <button style={{ position: 'absolute', bottom: 100 }} onClick={handleSpinClick}>Spin</button>
        </div>
    );
}