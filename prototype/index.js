function Csv() {
};
  Csv.prototype.parse = function parse(string, separator = "") {
    if (separator === "") {
      const rows = string.split("\n");
      const seps = [',', ';', '\t'];

      let sepIdx = 0;
      let row = rows[0];
      let position;
	  let count1 = 0;
	  let count2 = 0;
      let found = false;

      for (; !found; sepIdx+=1) {
		separator = seps[sepIdx];
		position = row.search(separator);

		if (position >= 0) {
		  count1 = 0;
		  count2 = 0;
		  row = rows[0];

		  while (position >= 0) {
		    row = row.slice(position + 1);
			position = row.search(separator);
			count1 += 1;
		  }
		  row = rows[1];
		  position = row.search(separator);

		  while (position >= 0) {
		    row = row.slice(position + 1);
			position = row.search(separator);
			count2 += 1;
		  }
		  found = count1 == count2;
		}
	  }
	}
		return string.split('\n').map(x => x.split(separator));
  };
  Csv.prototype.generate = function generate(array, separator = ",") {
	const rows = array.length;

	let lastCol = array[0].length - 1;
	let string = "";

	for (let i = 0; i < rows; i+=1) {
	  for (let j = 0; j < lastCol; j+=1) {
		string += array[i][j] + separator;
	  }
	  string += array[i][lastCol] + "\n";
	}
	return string.trim();
  };

  let arr = [
	[
	  "Lorem Ipsum ",
	  "- це текст-\"р",
	  "иба\" що використо",
	  "вується в друкарств"
	],
	[
	  "і та диза",
	  "йні. Lorem",
	  " Ipsum є фактично ",
	  "стандартно"
	],
	[
	  "ю \"рибою\" а",
	  "ж з XVI",
	  " сторіччя к",
	  "оли невідомий "
	]
  ];
  console.log(Csv.prototype.generate(arr))