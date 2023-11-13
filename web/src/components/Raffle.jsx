import React, { useState, useEffect } from 'react';

const Raffle = ({ ticketOutcomes }) => {
  const [winningCard, setWinningCard] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [raffleCards, setRaffleCards] = useState([]);

  useEffect(() => {
    const raffleContainer = document.querySelector('.raffle__container-container');

    const fadeIn = () => {
      // Implement your fadeIn logic here
    };

    const animateRaffle = () => {
      fadeIn();

      setTimeout(() => {
        for (let i = 1; i < 50; i++) {
          const rand = Math.floor(Math.random() * ticketOutcomes.length);
          const card = ticketOutcomes[rand];

          if (i !== 47) {
            // Normal card handling logic
          } else {
            setWinningCard(card);
          }

          // Construct JSX elements for the card
          const cardElement = (
            <div key={i} className={`case_item ${i === 46 ? 'winning-item' : ''}`}>
              <div className={`card__item font-sans font-bold font-xl tier__${card.tier}`}>
                <b>{card.label} (x{card.amount})</b>
              </div>
              <img src={`./images/rewards/${card.item}.png`} alt={card.item} className="case__icon" />
            </div>
          );

          // Render the card element
          setRaffleCards(prevCards => [...prevCards, cardElement]);

          // Shift the container to the left
          raffleContainer.style.marginLeft = `-${i * 100}px`;
        }

        // Final cleanup and callback
        setTimeout(() => {
            setWinningCard(null);
            setRaffleCards([]); // Clear the cards array
            raffleContainer.style.marginLeft = '0px';
        }, 5000);
      }, 250);
    };

    // Trigger the animation
    animateRaffle();
  }, [ticketOutcomes]);

  return (
    <div className="raffle">
      <div className="raffle__container">
        {/* Add any additional HTML structure for the raffle container */}
        <div className="raffle__container-container">
          {/* The raffle container where cards will be dynamically added */}
        </div>
      </div>
      {/* Render additional React components or elements here */}
    </div>
  );
};

export default Raffle;