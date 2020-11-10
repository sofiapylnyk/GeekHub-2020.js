jQuery('input').on('paste', function (e) {
		e.preventDefault();

		let text = e.originalEvent.clipboardData.getData('text/plain');
		let input = e.currentTarget;
		input.value = text;
	});

let currentColumn;

jQuery('thead th').on('contextmenu', function (e) {
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
