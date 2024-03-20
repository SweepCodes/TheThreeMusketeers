import { clearUserProfilePicChoice } from "./modules/utilities.ts";

const logInRegisterPage = document.getElementById(
  "log-in-register-page"
) as HTMLDivElement;
const logInDiv = document.getElementById("log-in-div") as HTMLDivElement;
const logInForm = document.getElementById("log-in-form") as HTMLFormElement;
const registerDiv = document.getElementById("register-div") as HTMLDivElement;
const registerForm = document.getElementById(
  "register-form"
) as HTMLFormElement;
const registerPasswordInputElement = document.getElementById(
  "register-password"
) as HTMLInputElement;
const confirmPasswordInputElement = document.getElementById(
  "confirm-password"
) as HTMLInputElement;
const profileImageDiv = document.getElementById(
  "profile-images-div"
) as HTMLDivElement;
const profileImgElementOne = document.getElementById(
  "profile-images-one"
) as HTMLImageElement;
const profileImgElementTwo = document.getElementById(
  "profile-images-two"
) as HTMLImageElement;
const profileImgElementThree = document.getElementById(
  "profile-images-three"
) as HTMLImageElement;
const navBar = document.getElementById("nav-bar") as HTMLDivElement;
const homePageDiv = document.getElementById("home-page") as HTMLDivElement;

logInRegisterPage.addEventListener("click", (event) => {
  if (
    event.target instanceof HTMLElement &&
    event.target.classList.contains("toggle-pages")
  ) {
    logInForm.reset();
    registerForm.reset();

    logInDiv.classList.toggle("hidden");
    registerDiv.classList.toggle("hidden");

    clearUserProfilePicChoice();
  }
});

profileImageDiv.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.id !== "profile-images-div") {
    profileImgElementOne.classList.toggle(
      "user-choice",
      target.id === "profile-images-one"
    );
    profileImgElementTwo.classList.toggle(
      "user-choice",
      target.id === "profile-images-two"
    );
    profileImgElementThree.classList.toggle(
      "user-choice",
      target.id === "profile-images-three"
    );
  }
});

logInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  logInForm.reset();

  logInDiv.classList.add("hidden");
  navBar.classList.remove("hidden");
  homePageDiv.classList.remove("hidden");

  clearUserProfilePicChoice();
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    profileImgElementOne.classList.contains("user-choice") ||
    profileImgElementTwo.classList.contains("user-choice") ||
    profileImgElementThree.classList.contains("user-choice")
  ) {
    if (
      registerPasswordInputElement.value === confirmPasswordInputElement.value
    ) {
      registerForm.reset();

      registerDiv.classList.add("hidden");
      navBar.classList.remove("hidden");
      homePageDiv.classList.remove("hidden");

      clearUserProfilePicChoice();
    } else {
      alert("Passwords needs to be the same!");
    }
  } else {
    alert("Chose profile picture!");
  }
});
