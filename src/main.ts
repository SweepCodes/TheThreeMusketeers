const logInRegisterPage = document.getElementById(
  "log-in-register-page"
) as HTMLDivElement;

logInRegisterPage.addEventListener("click", (event) => {
  if (
    event.target instanceof HTMLElement &&
    event.target.classList.contains("toggle-pages")
  ) {
    const logInDiv = document.getElementById("log-in-div") as HTMLDivElement;
    const registerDiv = document.getElementById(
      "register-div"
    ) as HTMLDivElement;
    const logInForm = document.getElementById("log-in-form") as HTMLFormElement;
    const registerForm = document.getElementById(
      "register-form"
    ) as HTMLFormElement;

    logInForm.reset();
    registerForm.reset();

    logInDiv.classList.toggle("hidden");
    registerDiv.classList.toggle("hidden");
  }
});

///// Temporary /////
const logInForm = document.getElementById("log-in-form") as HTMLFormElement;
const registerForm = document.getElementById(
  "register-form"
) as HTMLFormElement;

logInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const logInDiv = document.getElementById("log-in-div") as HTMLDivElement;
  const navBar = document.getElementById("nav-bar") as HTMLDivElement;
  const homePageDiv = document.getElementById("home-page") as HTMLDivElement;

  logInDiv.classList.toggle("hidden");
  navBar.classList.remove("hidden");
  homePageDiv.classList.remove("hidden");
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const registerDiv = document.getElementById("register-div") as HTMLDivElement;
  const navBar = document.getElementById("nav-bar") as HTMLDivElement;
  const homePageDiv = document.getElementById("home-page") as HTMLDivElement;

  registerDiv.classList.toggle("hidden");
  navBar.classList.remove("hidden");
  homePageDiv.classList.remove("hidden");
});
/////////////////////
