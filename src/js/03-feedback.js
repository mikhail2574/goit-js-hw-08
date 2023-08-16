import _ from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector("[name='email']");
const message = document.querySelector("[name='message']");

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState == null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Set state error: ', error);
  }
};

form.addEventListener(
  'input',
  _.throttle(event => {
    let formData = {
      email: email.value,
      message: message.value,
    };
    save('feedback-form-state', formData);
  }, 500)
);

window.onload = event => {
  if (load('feedback-form-state') && load('feedback-form-state').email) {
    email.value = load('feedback-form-state').email;
  }
  if (load('feedback-form-state') && load('feedback-form-state').message) {
    message.value = load('feedback-form-state').message;
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!email.value || !message.value) {
    return;
  }
  console.log(load('feedback-form-state'));
  form.reset();
  save('feedback-form-state', { email: '', message: '' });
});
