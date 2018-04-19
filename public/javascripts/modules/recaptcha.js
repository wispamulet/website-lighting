// enable submit button only when user pass recaptcha on client side

function recaptchaCallback() {
  const submit = document.querySelector('.query-btn');
  submit.removeAttribute('disabled');
}
