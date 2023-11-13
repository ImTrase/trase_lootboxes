import React from 'react';


import {MdKeyboardDoubleArrowRight} from 'react-icons/md';

interface cardProps {
    tier: string;
    image: string;
    item: string;
    amount: string;
}

const BOX_CONTAINER = {
    minWidth: '203px', // Adjusted width
    width: 'auto', // Dynamic width based on content   width: '185px',
    height: '31px',
    minHeight: '31px', // Adjusted width
    height: 'auto',
    borderRadius: '2px',
    border: '0.4px solid rgba(152, 152, 152, 0.45)',
    background: 'rgba(0, 0, 0, 0.25)',
    position: 'relative',
}

const ICON_STYLES = {
    color: '#b8b8b8',
    fontSize: '22px',
    marginLeft: '45px',
    marginTop: '5px',
}

const ColoredSVG = ({ color }) => (
    <svg
        width="203"
        height="31"
        viewBox="0 0 203 31"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
        }}
    >
    <mask id="mask0_11_172" maskType="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="203" height="31">
        <rect width="203" height="31" rx="2" fill="black" fillOpacity="0.25" />
        <rect x="0.2" y="0.2" width="202.6" height="30.6" rx="1.8" stroke="#989898" strokeOpacity="0.45" strokeWidth="0.4" />
    </mask>

    <g mask="url(#mask0_11_172)">
        <path d="M124 -30L155.5 66L191 43.5L124 -30Z" fill={color} />
        <path d="M149 -6.33392L216.106 69.198L239.718 34.4278L149 -6.33392Z" fill={color} />
    </g>

    </svg>
);

const colors = {
    'legendary': '#fc6b03',
    'epic': '#a200ff',
    'rare': '#006aff',
    'common': '#15b300',
    'uncommon': '#757575',
    'requirement': '#990000',
}

const RewardCard: React.FC<cardProps> = ({ tier, image, item, amount }) => {
    return (
        <div style={BOX_CONTAINER}>
          <div style={{ display: 'flex' }}>
            <img src={image} style={{ position: 'absolute', top: 0, left: 0, width: 'auto', height: '100%' }} />
            <MdKeyboardDoubleArrowRight style={ICON_STYLES} />
            <p style={{
                position: 'absolute',
                right: 35,
                textAlign: 'center',
                marginLeft: '25px',
                marginTop: '5px',
                color: '#fff',  // Set the text color
                fontSize: '14px',  // Set the font size
                fontFamily: 'Skate Sans',  // Set the font family
                zIndex: 2,
            }}>x{amount} {item}</p>
          </div>
    
          {ColoredSVG({ color: colors[tier] })}
        </div>
      );
};

export default RewardCard;