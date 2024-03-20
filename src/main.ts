import { clearUserProfilePicChoice } from "./modules/utilities.ts";
import { getUsers, register, loginChecker } from "./modules/fetch.ts";
const logInRegisterPage = document.getElementById(
  "log-in-register-page"
) as HTMLDivElement;
const logInDiv = document.getElementById("log-in-div") as HTMLDivElement;
const logInForm = document.getElementById("log-in-form") as HTMLFormElement;
const logInUserInput = document.getElementById(
  "log-in-username"
) as HTMLInputElement;
const logInPasswordInput = document.getElementById(
  "log-in-password"
) as HTMLInputElement;
const registerDiv = document.getElementById("register-div") as HTMLDivElement;
const registerForm = document.getElementById(
  "register-form"
) as HTMLFormElement;
const registerUsernameInputElement = document.getElementById(
  "register-username"
) as HTMLInputElement;
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
const headerNavbar = document.getElementById("header-bar") as HTMLElement;
const mobileGamesDiv = document.getElementById(
  "mobile-games-forum"
) as HTMLElement;
const moviesTVShowsDiv = document.getElementById(
  "movies-tv-shows-forum"
) as HTMLElement;
const eSportsDiv = document.getElementById("e-sport-forum") as HTMLElement;

let chosenImage: string;

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
    if (target.id === "profile-images-one")
      chosenImage = profileImgElementOne.src;
    if (target.id === "profile-images-two")
      chosenImage = profileImgElementTwo.src;
    if (target.id === "profile-images-three")
      chosenImage = profileImgElementThree.src;
  }
});

logInForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let loginCheck = await loginChecker(
    logInUserInput.value,
    logInPasswordInput.value
  );

  if (loginCheck) {
    logInDiv.classList.add("hidden");
    navBar.classList.remove("hidden");
    homePageDiv.classList.remove("hidden");

    clearUserProfilePicChoice();
  }
  logInForm.reset();
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
      register(
        registerUsernameInputElement.value,registerPasswordInputElement.value, chosenImage);
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

// Logik för header/navbar
headerNavbar.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.innerText == "Mobile Games") {
    mobileGamesDiv.classList.remove("hidden");
    moviesTVShowsDiv.classList.add("hidden");
    eSportsDiv.classList.add("hidden");
    homePageDiv.classList.add("hidden");
  } else if (target.innerText == "Movies/TV-Shows") {
    moviesTVShowsDiv.classList.remove("hidden");
    mobileGamesDiv.classList.add("hidden");
    eSportsDiv.classList.add("hidden");
    homePageDiv.classList.add("hidden");
  } else if (target.innerText == "E-Sports") {
    eSportsDiv.classList.remove("hidden");
    mobileGamesDiv.classList.add("hidden");
    moviesTVShowsDiv.classList.add("hidden");
    homePageDiv.classList.add("hidden");
  } else if (target.id == "logo") {
    homePageDiv.classList.remove("hidden");
    eSportsDiv.classList.add("hidden");
    mobileGamesDiv.classList.add("hidden");
    moviesTVShowsDiv.classList.add("hidden");
  }
});
