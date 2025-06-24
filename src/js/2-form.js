import { save, load } from "./localStorage";
import iziToast from "izitoast";

document.body.style.fontFamily = "'Montserrat', sans-serif";


const form = document.querySelector("form");
const labels = document.querySelectorAll("label");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const submitButton = document.querySelector("button");


const formData = {
  email: '',
  message: '',
};


const initializeForm = () => {
  const savedData = load('feedback-form-state');
  if (!savedData) return;

  Object.keys(savedData).forEach(key => {
    if (form.elements[key]) {
      form.elements[key].value = savedData[key];
      formData[key] = savedData[key];
    }
  });
  console.log('Form initialized with:', formData);
};

const handleInput = (event) => {
  const { name, value } = event.target;
  formData[name] = value;
  save('feedback-form-state', formData);
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    iziToast.error({
      message: 'Please fill all fields',
      position: 'topRight',
    });
    return;
  }

iziToast.success({
  title: 'Form submitted!',
  message: `
    Email: ${formData.email}<br><br>
    Message: ${formData.message}
  `,
  position: 'topRight',
  timeout: 5000,
  closeOnClick : true,
  displayMode: 1,
  backgroundColor: '#4E75FF',
  titleColor: '#FFFFFF',
  messageColor: '#FFFFFF',
  messageSize: '14px',
  layout: 2,
  close: false,
  progressBar: false,
  animateInside: false,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut'
});

  console.log('Submitted data:', formData);
  event.target.reset();
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
};


const setupStyles = () => {
  Object.assign(form.style, {
    display: "inline-flex",
    padding: "24px",
    flexDirection: "column",
    gap: "8px",
    borderRadius: "8px",
    background: "#fff"
  });


  labels.forEach(label => {
    Object.assign(label.style, {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      color: "#2e2f42",
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px",
      letterSpacing: "0.64px"
    });
  });

  
  const inputBaseStyles = {
    outline: "none",
    width: "360px",
    borderRadius: "4px",
    border: "1px solid #808080",
    padding: "8px 16px",
    fontFamily: "'Montserrat', sans-serif"
  };

 
  Object.assign(input.style, {
    ...inputBaseStyles,
    height: "40px"
  });

 
  Object.assign(textarea.style, {
    ...inputBaseStyles,
    height: "80px"
  });

  
  Object.assign(submitButton.style, {
    outline: "none",
    marginTop: "8px",
    width: "86px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#4E75FF",
    color: "#FFF",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0.64px"
  });
};


const setupEventListeners = () => {
 
  const setupHover = (element, hoverStyle, normalStyle) => {
    element.addEventListener("mouseenter", () => Object.assign(element.style, hoverStyle));
    element.addEventListener("mouseleave", () => Object.assign(element.style, normalStyle));
  };

  setupHover(input, { border: "1px solid #000" }, { border: "1px solid #808080" });
  setupHover(textarea, { border: "1px solid #000" }, { border: "1px solid #808080" });
  setupHover(submitButton, { background: "#6C8CFF" }, { background: "#4E75FF" });

  
  form.addEventListener('input', handleInput);
  form.addEventListener('submit', handleSubmit);
};


const init = () => {
  initializeForm();
  setupStyles();
  setupEventListeners();
};

init();