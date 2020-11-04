document.querySelector('#user-form').addEventListener('submit', function (e) {

 e.preventDefault();

 let fulName = document.querySelector('[name="full_name"]');
 let email = document.querySelector('[name="email"]');
 let password = document.querySelector('[name="password"]');
 let description = document.querySelector('[name="description"]');

 let validFulName = /^[а-щьюяїієґ]+\s+[а-щьюяїієґ]+\s+[а-щьюяїієґ]+$/i;
 let validEmail = /^(\w\.?)+[^.\s]@\w+\.\w+\s*$/;
 let validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/;


     if(validFulName.test(fulName.value)){
     fulName.style.backgroundColor = '#C2E0C6';
     } else{
     fulName.style.backgroundColor = '#F9D0C4';
     }
		 if(validEmail.test(email.value)){
			 email.style.backgroundColor = '#C2E0C6';
		 } else{
			 email.style.backgroundColor = '#F9D0C4';
		 }
		 if(validPassword.test(password.value)){
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
