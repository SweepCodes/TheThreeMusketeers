const logInRegisterPage = document.getElementById("log-in-register-page") as HTMLDivElement

logInRegisterPage.addEventListener("click", (event) => {
  if(event.target instanceof HTMLElement && event.target.classList.contains("toggle-pages")){
    const logInDiv = document.getElementById("log-in-div") as HTMLDivElement;
    const logInForm = document.getElementById("log-in-form") as HTMLFormElement;
    const registerDiv = document.getElementById("register-div") as HTMLDivElement;
    const registerForm = document.getElementById("register-form") as HTMLFormElement;

    logInForm.reset();
    registerForm.reset();

    logInDiv.classList.toggle("hidden");
    registerDiv.classList.toggle("hidden");
  };
});