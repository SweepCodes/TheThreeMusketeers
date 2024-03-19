const logInRegisterPage = document.getElementById("log-in-register-page") as HTMLDivElement;
const logInDiv = document.getElementById("log-in-div") as HTMLDivElement;
const logInForm = document.getElementById("log-in-form") as HTMLFormElement;
const registerDiv = document.getElementById("register-div") as HTMLDivElement;
const registerForm = document.getElementById("register-form") as HTMLFormElement;

logInRegisterPage.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.classList.contains("toggle-pages")) {
    logInForm.reset();
    registerForm.reset();

    logInDiv.classList.toggle("hidden");
    registerDiv.classList.toggle("hidden");
  }
});

///// Temporary /////
logInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const navBar = document.getElementById("nav-bar") as HTMLDivElement;
  const homePageDiv = document.getElementById("home-page") as HTMLDivElement;

  logInDiv.classList.add("hidden");
  navBar.classList.remove("hidden");
  homePageDiv.classList.remove("hidden");
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const navBar = document.getElementById("nav-bar") as HTMLDivElement;
  const homePageDiv = document.getElementById("home-page") as HTMLDivElement;
  
  registerDiv.classList.add("hidden");
  navBar.classList.remove("hidden");
  homePageDiv.classList.remove("hidden");
});
/////////////////////
