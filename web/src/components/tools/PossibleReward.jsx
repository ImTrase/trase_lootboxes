import React from 'react';

const CARD_STYLES = {
    'legendary': { border: '1.5px solid #FFD900', background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 0%, rgba(255, 217, 0, 0.16) 100%), #262626' },
    'epic': { border: '1.5px solid #6301FF', background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 0%, rgba(99, 1, 255, 0.16) 100%), #262626' },
    'rare': { border: '1.5px solid #023AFF', background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 0%, rgba(2, 134, 255, 0.16) 100%), #262626' },
    'common': { border: '1.5px solid #65FF0F', background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 0%, rgba(101, 255, 15, 0.16) 100%), #262626' },
    'uncommon': { border: '1.5px solid #b3b3b3', background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.20) 0%, rgba(82, 82, 82, 0.16) 100%), #262626' },
};

const BOX_CONTAINER = {
    width: '182px',
    height: '208.5px',
    flexShrink: 0,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    boxSizing: 'border-box',
}

const IMG_STYLES = {
    width: '100px', // Set a specific width for the image
    height: 'auto', // Let the height adjust automatically to maintain the aspect ratio
    objectFit: 'cover', // Make the image cover the container while maintaining aspect ratio
    borderRadius: '15px', // Optionally, add border-radius to match the container
};

const LABEL_STYLES = {
    marginTop: '8px',
    textAlign: 'center',
    color: 'rgba(234, 234, 234, 0.80)',
    fontFamily: 'Fira Sans', // Specify fallback font
    fontWeight: 400,
    fontSize: '16px',
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
};


export default function PossibleReward({ tier, item, actualItem, amount, itemLabel }) {
    const imagePath = './images/' + actualItem + '.png';

    return (
        <div style={{ ...BOX_CONTAINER, ...CARD_STYLES[tier], position: 'relative' }}>
            <p style={{
                color: 'rgba(234, 234, 234, 0.80)',
                fontFamily: 'Fira Sans',
                fontWeight: 400,
                fontSize: '16px',
                position: 'absolute',
                top: '-10px',
                right: '10px',
            }}>x {amount}</p>
            
            <img src={imagePath} alt={itemLabel} style={IMG_STYLES} />
            <div style={LABEL_STYLES}>{item}</div>
        </div>
    );
}