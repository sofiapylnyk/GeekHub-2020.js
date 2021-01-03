import React from 'react';
import styled from 'styled-components';

export default class Slider extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: props.value, min: props.min, max: props.max, onChange: props.onChange};
	}
	handleValueChange = (event) => {
		this.setState({value: event.target.value});
	}

	render() {
		return (	
			<Root>
				<div className="range-wrap">
					<input className="bubble" 
						   value={this.state.value} 
						   onChange={this.handleValueChange}/>
				</div>
				<div>
					<input type="range"
						   className="range"
						   min="100" max="2000" 
						   value={this.state.value} 
						   onChange={this.handleValueChange}
						   style={{width: "100%"}}
					></input>
				</div>
			</Root>
		);
	}
}


//region ====================== Styles ========================================

const Root = styled.div`
    padding: 10px 0;
`;

//endregion