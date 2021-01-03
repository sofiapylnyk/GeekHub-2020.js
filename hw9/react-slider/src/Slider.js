import React from 'react';
import styled from 'styled-components';

export default class Slider extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: props.value, min: props.min, max: props.max, onChange: props.onChange};
    }
	state = {
		x:0,
		y:0,
	};

	rootRef = React.createRef();

	startX = 0;
	startY = 0;

	firstX = 0;
	firstY = 0;

	onDragStart = (e) => {
		this.firstX = e.clientX;
		this.firstY = e.clientY;

		this.rootRect = this.rootRef.current.getBoundingClientRect();

		this.onDrag(e);

		document.body.addEventListener('mousemove', this.onDrag);
		document.body.addEventListener('mouseup', this.onDragEnd);
	};

	onDrag = (e) => {
		let x = this.startX + e.clientX - this.firstX;
		let y = this.startY + e.clientY - this.firstY;

		if (x < 0) {
			x = 0;
		}
		
		if (x > 1900) {
			x = 1900;
		}

		this.setState({
			x,
		});
	};

	onDragEnd = (e) => {
		this.startX = this.state.x
		this.startY = this.state.y

		document.body.removeEventListener('mousemove', this.onDrag);
		document.body.removeEventListener('mouseup', this.onDragEnd);
	};

	render() {
		const {x, y} = this.state;
		let val = x + 100

		return (
			<Root ref={this.rootRef}>
				<div>
					<input value={val}/>
				</div>
			    <Bar>
					<Handler	
						x={x}
						y={y}
						onMouseDown={this.onDragStart}
					/>
				</Bar>
			</Root>
		);
	}
}


//region ====================== Styles ========================================

const Root = styled.div`
	padding: 10px 0;
	width: 1920px;
	height: 600px;
	position: relative;
	margin: -5px;
`;
const Bar = styled.div`
    position: relative;
	height: 2px;
	background-color: black;
	margin-top: 10px;
`;

const Handler = styled.div.attrs(props => ({
	style: {
		left: props.x + 'px',
	},
}))`
	position: absolute;
	height: 10px;
	width: 10px;
	border-radius: 5px;
	background-color: red;
	top: -4px;
`;
//endregion