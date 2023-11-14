import React, {useState} from 'react';
import './App.css'
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";

import Sidebar from './Sidebar'
import Selection from './Selection'
import OpenCrate from './Open'

import { selectedData, setConfig } from './Store';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  }
])


const App: React.FC = () => {
	const { openingBox } = selectedData();
	const { setConfigData } = setConfig();

	fetchNui<object>('getConfigFile').then(retData => {
		setConfigData(retData)
	})

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
};

export default App;
