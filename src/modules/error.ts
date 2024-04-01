const loginRegisterPage = document.getElementById("log-in-register-page") as HTMLDivElement;

export function errorMessageLoginRegisterPage(errorMessage: string){
  const errorMessagePEl = document.getElementById("error-message") as HTMLParagraphElement;
  if(errorMessagePEl) errorMessagePEl.remove();
  const createErrorPEl = document.createElement("p") as HTMLParagraphElement;
  createErrorPEl.innerText = errorMessage;
  createErrorPEl.id = "error-message";
  createErrorPEl.classList.add("centerText");
  createErrorPEl.style.color = "red";
  loginRegisterPage.append(createErrorPEl);
}