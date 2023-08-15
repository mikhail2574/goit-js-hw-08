import _ from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector("[name='email']");
const message = document.querySelector("[name='message']");

form.addEventListener(
  'input',
  _.throttle(event => {
    let formData = {
      email: email.value,
      message: message.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)
);

window.onload = event => {
  if (
    localStorage.getItem('feedback-form-state') &&
    JSON.parse(localStorage.getItem('feedback-form-state')).email
  ) {
    email.value = JSON.parse(localStorage.getItem('feedback-form-state')).email;
  }
  if (
    localStorage.getItem('feedback-form-state') &&
    JSON.parse(localStorage.getItem('feedback-form-state')).message
  ) {
    message.value = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).message;
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!email.value || !message.value) {
    return;
  }
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  email.value = '';
  message.value = '';
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email: '', message: '' })
  );
});
