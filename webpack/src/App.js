import React, {PureComponent} from 'react';

export default class App extends PureComponent {
	render() {
		const data = [
			['asd', 'qwe'],
			['yui', 'dfg'],
			['yui', 'dfg'],
		];

        const table = data.map(x => x.split(','));
        console.log(table);

		return (
			<table>
				<tbody>
				{table}
				</tbody>
			</table>
		);
	}
}