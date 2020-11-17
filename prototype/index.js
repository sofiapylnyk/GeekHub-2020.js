jQuery('input').on('paste', function(e) {
		e.preventDefault();

		let text = e.originalEvent.clipboardData.getData('text/plain');
		let input = e.currentTarget;

		const colDiff = 'a'.charCodeAt(0);

		let arr = text.split('\n').map(x => x.split(';'));
		let inRows = arr.length;
		let inCols = arr[0].length;

		let cellName = input.getAttribute('name');
		let pasteColIdx = cellName.charCodeAt(0) - colDiff;
		let pasteRowIdx = cellName.slice(1) - 1;

		let header = document.querySelector("thead").childNodes[1];
		let headerCols = header.children;
		let colSize = headerCols[headerCols.length-1].innerHTML.toLowerCase().charCodeAt(0) - colDiff + 1;

		let body = document.querySelector("tbody");
		let bodyRows = body.children;
		let lastRow = bodyRows[bodyRows.length-1];
		let rowSize = lastRow.children[0].innerHTML;

		let estRows = pasteRowIdx + inRows;
		let estCols = pasteColIdx + inCols;

			for (let i = colSize; i < estCols; i++) {
				let col = document.createElement("th");
				col.innerHTML = String.fromCharCode(i+colDiff).toUpperCase();
				header.appendChild(col);
			}

			for (let i = rowSize; i < estRows; i++) {
				let row = document.createElement("tr");
				let hdr = document.createElement("th");
				let num = parseInt(i) + 1;
				hdr.innerHTML = num;
				row.appendChild(hdr);
				body.appendChild(row);
			}

		bodyRows = body.children;

		for (let i = 0; i < estRows; i++) {
			let row = bodyRows[i];

			for (let j = 0; j < estCols; j++) {
				if (i >= rowSize | j >= colSize) {
					let cell = row.insertCell(-1);
					let inp = document.createElement("input");
					let num = parseInt(i) + 1;
					let name = String.fromCharCode(j+colDiff) + num.toString();
					inp.setAttribute("type", "text");
					inp.setAttribute("name", name);
					inp.setAttribute("value", "");
					cell.appendChild(inp);
				}
			}
		}

		for (let i = 0, row = pasteRowIdx; i < inRows; i++, row++) {
			for (let j = 0, col = pasteColIdx; j < inCols; j++, col++) {
				let num = parseInt(row) + 1;
				let name = String.fromCharCode(col+colDiff) + num.toString();
				let cell = document.getElementsByName(name)[0];
				cell.setAttribute("value", arr[i][j]);
			}
		}
});
let currentColumn;

jQuery('thead th').on('contextmenu', function(e) {
	  e.preventDefault();

		currentColumn = e.currentTarget;

		let menu = jQuery('#column-menu');

		menu.addClass('d-block');

		menu.css({
			left: e.clientX,
			top: e.clientY
		});
});

jQuery('#column-menu [data-action]').on('click', function (e) {
		e.preventDefault();

		let action = e.currentTarget.getAttribute('data-action');

		switch (action) {
			case 'add-left':

				break;

			case 'add-right':

			break;

			case 'remove':

			break;
	}
	jQuery('#column-menu').removeClass('d-block');
});
