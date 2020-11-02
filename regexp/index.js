document.querySelector('#user-form').addEventListener('submit', function (e) {
	      e.preventDefault();
				var fulName = document.querySelector('[name="full_name"]');
				var email = document.querySelector('[name="email"]');
				var password = document.querySelector('[name="password"]');
				var description = document.querySelector('[name="description"]');

				var validFulName = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s*/;
				var validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
				var validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/;
		/*	var validDescription = ;*/

			if(validFulName.test(fulName.value)){
				fulName.style.backgroundColor = '#C2E0C6'
			} else{
				fulName.style.backgroundColor = '#F9D0C4'
		};
			if(validEmail.test(email.value)){
				email.style.backgroundColor = '#C2E0C6'
			} else{
				email.style.backgroundColor = '#F9D0C4'
			};
			if(validPassword.test(password.value)){
				password.style.backgroundColor = '#C2E0C6'
			} else{
				password.style.backgroundColor = '#F9D0C4'
			};
	/*	if(validDescription.test(description.value)){
				description.style.backgroundColor = '#C2E0C6'
			} else{
				description.style.backgroundColor = '#F9D0C4'
			}; */
});
		document.querySelectorAll('[data-show]').forEach(function (button){
						button.addEventListener('click', function (e) {
										document.querySelector('#description').classList.add('d-none');
										document.querySelector('#preview').classList.add('d-none');

										document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
	});
});
