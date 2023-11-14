import React, {useEffect, useState} from 'react';
import './App.css'
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";
import { isEnvBrowser } from '../utils/misc';


import Sidebar from './Sidebar'
import Selection from './Selection'
import OpenCrate from './Open'

import { selectedData, setConfig } from './Store';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  { action: 'setVisible', data: true }
])

export default function App() {
	const { openingBox } = selectedData();
	const { setConfigData } = setConfig();

	fetchNui('getConfigFile').then(retData => {
		setConfigData(retData)
	})

	// Only use this if yk what you are doing.
	// useEffect(() => {
	// 	let config = {};
	// 	config.Strings = {
	// 		"sidebar_title": "Lootboxes",
	// 		"sidebar_description": "Open lootboxes and get a chance to win rewards!",
	// 		"selection_title": "Lootboxes",
	// 		"selection_description": "Select the lootbox!",
	// 		"crate_description": "Lootbox",
	// 		"crate_button_select": "SELECT CRATE",
	// 		"selectedCrate_title": "Selected Crate",
	// 		"selectedCrate_description": "Viewing {LOOTBOX_NAME} lootbox.",
	// 		"selectedCrate_rewards": "Rewards",
	// 		"selectedCrate_requirements": "Requirements",
	// 		"selectedCrate_button_open": "Open Crate",
	// 		"selector_title": "Opening",
	// 		"selector_description": "Wait for the wheel to stop scrolling!",
	// 		"winnings_title": "YOUR WINNINGS",
	// 		"winnings_button_claim": "Claim",
	// 		"winnings_notification_title": "You Won!",
	// 		"winnings_notification_description": "You have won {AMOUNT}x {ITEM}!",
	// 	};
	
	// 	config.Crates = [
	// 	  {
	// 		text: 'Legendary',
	// 		image: 'https://imgur.com/siLz0Wa.png',
	// 		color: 'linear-gradient(158deg, #D24C00 8.96%, #6A2600 85.48%)',
	// 		border: '0.7px solid #FFBD80',
	// 		hoverColor: '#804719',
	// 		requirements: [
	// 		  { tier: 'requirement', image: 'https://imgur.com/siLz0Wa.png', item: 'water', itemLabel: 'Water', amount: '1' },
	// 		],
	// 		rewards: [
	// 		  { tier: 'legendary', image: 'https://imgur.com/siLz0Wa.png', item: 'water', itemLabel: 'Water', amount: '5' },
	// 		  { tier: 'epic', image: 'https://imgur.com/siLz0Wa.png', item: 'water', itemLabel: 'Water', amount: '5' },
	// 		  { tier: 'rare', image: 'https://imgur.com/siLz0Wa.png', item: 'water', itemLabel: 'Water', amount: '5' },
	// 		  { tier: 'common', image: 'https://imgur.com/siLz0Wa.png', item: 'water', itemLabel: 'Water', amount: '5' },
	// 		  { tier: 'uncommon', image: 'https://imgur.com/siLz0Wa.png', item: 'water', itemLabel: 'Water', amount: '5' },
	// 		],
	// 	  }
	// 	];

	// 	setConfigData(config)
	//   }, []); // Empty dependency array means this effect will run once on mount

	return (
		<div className="nui-wrapper">
			{openingBox === false ? (
				<>
					<Sidebar />
					<Selection />
				</>
			) : (
				<OpenCrate />
			)}
		</div>
	);
}