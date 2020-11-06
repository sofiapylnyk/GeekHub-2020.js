document.querySelector('#user-form').addEventListener('submit', function(e) {
  e.preventDefault();

  let fullName = document.querySelector('[name="full_name"]');
  let email = document.querySelector('[name="email"]');
  let password = document.querySelector('[name="password"]');

  let validFullName = /^[а-щьюяїієґ]+\s+[а-щьюяїієґ]+\s+[а-щьюяїієґ]+$/i;
  let validEmail = /^[a-z0-9-]+[a-z0-9-\.]+[a-z0-9-]@[a-z0-9-][a-z0-9-.]+\.[a-z0-9-]+$/i;
  let validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/;

  if (validFullName.test(fullName.value.trim())) {
      fullName.style.backgroundColor = '#C2E0C6';
  } else {
      fullName.style.backgroundColor = '#F9D0C4';
  }

  if (validEmail.test(email.value.trim())) {
 	    email.style.backgroundColor = '#C2E0C6';
  } else {
      email.style.backgroundColor = '#F9D0C4';
  }

  if (validPassword.test(password.value)) {
      password.style.backgroundColor = '#C2E0C6';
  } else {
	    password.style.backgroundColor = '#F9D0C4';
  }
});

document.querySelectorAll('[data-show]').forEach(function(button) {
    button.addEventListener('click', function(e) {
        let descrArea = document.querySelector('#description');
        let previewArea = document.querySelector('#preview');
        let descrButton = document.querySelector('[data-show="description"]');
        let previewButton = document.querySelector('[data-show="preview"]');
        let plusRegex = /\+\+(.*?)\+\+/g;
        let minusRegex = /\-\-(.*?)\-\-/g;
        let imgRegex = /https:\/\/[\w.\/%:-]+?(\.jpg)|https:\/\/[\w.\/%:-]+?(\.png)/gi;
        let linkRegex = /https:\/\/[\w.\/%:-]+[\w]/gi;
        let str = "";

        descrArea.classList.add('d-none');
        previewArea.classList.add('d-none');
        document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');

        descrButton.classList.remove('active');
        previewButton.classList.remove('active');
        document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.add('active');

        if (e.currentTarget == descrButton) {
          return;
        }
        str = descrArea.value;

        while (plusRegex.test(str)) {
          str = str.replace("++", "<strong>");
          str = str.replace("++", "</strong>");
        }
        while (minusRegex.test(str)) {
          str = str.replace("--", "<i>");
          str = str.replace("--", "</i>");
        }
        previewArea.innerHTML = str;
    });
});
