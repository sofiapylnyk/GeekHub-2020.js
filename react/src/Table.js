import React from 'react';

function Cell(props) {
	return (
		<td>
			<input type="text" 
				name={props.name} 
				value={props.value}>
			</input>
		</td>);
}

function Header(props) {
	return (<th>{props.name}</th>);
}

function Row(props) {
	return (<tr>{props.cells}</tr>);
}

export default function Table(props) {
	let {columns, rows, cell, data} = props;
	const colDiff = 'a'.charCodeAt(0);
	let headers = [<Header name="" />];
	let body = [];

	if (data == null) {
		for (let i = 0; i < columns; i++) {
			headers.push(<Header name={String.fromCharCode(i+colDiff).toUpperCase()} />);
		}
		for (let i = 0; i < rows; i++) {
			let row = parseInt(i) + 1;
			let cells = [<Header name={row} />];
	
			for (let j = 0; j < columns; j++) {
				cells.push(<Cell name={String.fromCharCode(j+colDiff)+row} value=""/>)
			}
			body.push(<Row cells={cells}/>)
		}
	} else {

		for (let i = 0; i < columns; i++) {
			headers.push(<Header name={String.fromCharCode(i+colDiff).toUpperCase()} />);
		}
		for (let i = 0; i < rows; i++) {
			let row = parseInt(i) + 1;
			let cells = [<Header name={row} />];
	
			for (let j = 0; j < columns; j++) {
				cells.push(<Cell name={String.fromCharCode(j+colDiff)+row} value={data}/>)
			}
			body.push(<Row cells={cells}/>)
		}
		console.log(data)
	}

	

	return (
		<table>
			<thead>
			<tr>
				{headers}
			</tr>
			</thead>

			<tbody>
				{body}
			</tbody>
		</table>
	);
};