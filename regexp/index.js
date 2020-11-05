document.querySelector('#user-form').addEventListener('submit', function (e) {

 e.preventDefault();

 let fullName = document.querySelector('[name="full_name"]');
 let email = document.querySelector('[name="email"]');
 let password = document.querySelector('[name="password"]');
 let description = document.querySelector('[name="description"]');

 let validFullName = /^[а-щьюяїієґ]+\s+[а-щьюяїієґ]+\s+[а-щьюяїієґ]+$/i;
 let validEmail = /^[a-z0-9-]+[a-z0-9-\.]+[a-z0-9-]@[a-z0-9-][a-z0-9-.]+[a-z0-9-]+$/;
 let validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/;

     if (validFullName.test(fullName.value.trim())){
     	fullName.style.backgroundColor = '#C2E0C6';
     } else{
     	fullName.style.backgroundColor = '#F9D0C4';
     }

     if (validEmail.test(email.value.trim())){
   	email.style.backgroundColor = '#C2E0C6';
     } else{
	email.style.backgroundColor = '#F9D0C4';
     }

     if (validPassword.test(password.value)){
	password.style.backgroundColor = '#C2E0C6';
     } else{
	password.style.backgroundColor = '#F9D0C4';
     }
});

	 document.querySelectorAll('[data-show]').forEach(function (button){
		button.addEventListener('click', function (e) {
			document.querySelector('#description').classList.add('d-none');
			document.querySelector('#preview').classList.add('d-none');

			document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
 });
});
