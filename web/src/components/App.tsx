import React, {useState} from 'react';
import './App.css'
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";

import Sidebar from './Sidebar'
import Selection from './Selection'

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'openCrate',
    data: true,
  }
])

const App: React.FC = () => {
	return (
		<div className="nui-wrapper">
			<Sidebar />
			<Selection />
		</div>
	);
}

export default App;
