function CsvPrototype() {
	this.parse = function(string, separator="") {
		if (separator === "") {
			let rows = string.split("\n");
			let seps = [',', ';', '\t'];
			let sepIdx = 0;
			let row = rows[0];
			let position;
			let count1 = count2 = 0;
			let found = false;

			for (; !found; sepIdx++) {
				separator = seps[sepIdx];
				position = row.search(separator);

				if (position >= 0) {
					count1 = count2 = 0;
					row = rows[0];

					while (position >= 0) {
						row = row.slice(position+1);
						position = row.search(separator);
						count1 += 1;
					}
					row = rows[1];
					position = row.search(separator);

					while (position >= 0) {
						row = row.slice(position+1);
						position = row.search(separator);
						count2 += 1;
					}
					found = count1 == count2;
				}

			}

		}
		return string.split('\n').map(x => x.split(separator));
	}
	this.generate = function(array, separator=",") {
		let rows = array.length;
		let lastCol = array[0].length - 1;
		let string = "";

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < lastCol; j++) {
				string += array[i][j] + separator;
			}
			string += array[i][lastCol] + "\n";
		}
		return string;
	}
};
let Csv = new CsvPrototype();
