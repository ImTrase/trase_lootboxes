import React from 'react';

interface cardProps {
    tier: string;
    image: string;
    item: string;
    amount: string;
}

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
    width: '100%', // Ensure the image takes up 100% width
    position: 'relative', // Position the image
    top: '0px',
    padding: '0px',
    margin: '0px',
    height: 'auto', // Maintain aspect ratio
}

const LABEL_STYLES = {
    marginTop: '8px',
    textAlign: 'center',
    color: 'rgba(234, 234, 234, 0.80)',
    fontFamily: 'Fira Sans', // Specify fallback font
    fontWeight: 400,
    fontSize: '16px',

    position: 'relative', // Position the image
    bottom: '10px',
}


const PossibleReward: React.FC<cardProps> = ({ tier, image, item, amount }) => {
    return (
        <div style={{ ...BOX_CONTAINER, ...CARD_STYLES[tier] }}>
            <img src={image} alt={item} style={IMG_STYLES} />
            <div style={LABEL_STYLES}>{item}</div>
        </div>
    );
};

export default PossibleReward;
