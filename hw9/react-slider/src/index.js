import React from 'react';
import ReactDom from 'react-dom';
import Slider from './Slider';

ReactDom.render(
	<Slider
		min={100}
		max={2000}
		value={1500}
		onChange={(value) => console.log(value)}
	/>,
	document.querySelector('#slider')
);