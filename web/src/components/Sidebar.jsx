import React from 'react';
import allCrates from '../assets/images/allcrates.svg';
import { LinearGradient } from 'react-text-gradients';

import { setConfig } from './Store';

const BOX_STYLES = {
  position: 'relative',
  padding: '1rem',
  margin: '1rem',
  background: 'linear-gradient(150deg, #0038FF -3.19%, rgba(0, 0, 0, 0.50) 62.7%)',
  height: '65%',
  width: '14%',
  overflow: 'hidden', // Ensure the inner border does not affect dimensions
};

const INNER_BORDER_STYLES = {
  content: '""',
  position: 'absolute',
  top: '3%', // Adjust as needed
  left: '5%', // Adjust as needed
  right: '5%', // Adjust as needed
  bottom: '3%', // Adjust as needed
  border: '1px solid white',
};

const CRATE_IMAGE_STYLES = {
  width: '100%',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
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

const DESCRIPTION_STYLES = {
  fontSize: '13px',
  fontFamily: 'Skate Sans',
  textAlign: 'left',
  width: '71%',
};

const TITLE_DIV = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  left: 25,
  paddingTop: 25,
  paddingLeft: 15,
};

export default function Sidebar() {
  const { config } = setConfig();
  return (
    <div style={BOX_STYLES}>
      <div style={TITLE_DIV}>
        <LinearGradient style={TITLE_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
          {config !== null ? config.Strings['sidebar_title'] : 'Lootboxes'}
        </LinearGradient>
        <LinearGradient style={DESCRIPTION_STYLES} gradient={['to top right', '#C1C1C1 , rgba(255, 255, 255, 0.2)']}>
        {config !== null ? config.Strings['sidebar_description'] : 'Open lootboxes and get a chance to win rewards!'}
        </LinearGradient>
      </div>

      <div style={INNER_BORDER_STYLES}></div>
      <img style={CRATE_IMAGE_STYLES} src={allCrates} alt="Lootboxes"></img>
    </div>
  );
}
