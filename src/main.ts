import { clearUserProfilePicChoice } from "./modules/utilities.ts";
import { getUsers, loginChecker, register, registerChecker } from "./modules/fetch.ts";
import { applyProfilePic, displayProfilePages } from "./modules/display.ts";

const logInRegisterPage = document.getElementById("log-in-register-page") as HTMLDivElement;
const logInDiv = document.getElementById("log-in-div") as HTMLDivElement;
const logInForm = document.getElementById("log-in-form") as HTMLFormElement;
const logInUserInputElement = document.getElementById("log-in-username") as HTMLInputElement;
const logInPasswordInputElement = document.getElementById("log-in-password") as HTMLInputElement;
const registerDiv = document.getElementById("register-div") as HTMLDivElement;
const registerForm = document.getElementById("register-form") as HTMLFormElement;
const registerUsernameInputElement = document.getElementById("register-username") as HTMLInputElement;
const registerPasswordInputElement = document.getElementById("register-password") as HTMLInputElement;
const confirmPasswordInputElement = document.getElementById("confirm-password") as HTMLInputElement;
const profileImageDiv = document.getElementById("profile-images-div") as HTMLDivElement;
const profileImgElementOne = document.getElementById("profile-images-one") as HTMLImageElement;
const profileImgElementTwo = document.getElementById("profile-images-two") as HTMLImageElement;
const profileImgElementThree = document.getElementById("profile-images-three") as HTMLImageElement;
const navBar = document.getElementById("nav-bar") as HTMLDivElement;
const homePageDiv = document.getElementById("home-page") as HTMLDivElement;
const headerNavbar = document.getElementById("header-bar") as HTMLDivElement;
const mobileGamesDiv = document.getElementById("mobile-games-forum") as HTMLDivElement;
const moviesTVShowsDiv = document.getElementById("movies-tv-shows-forum") as HTMLDivElement;
const eSportsDiv = document.getElementById("e-sport-forum") as HTMLDivElement;
const profileDiv = document.getElementById("profile-page") as HTMLDivElement;
const deleteAccountButton = document.getElementById("delete-button") as HTMLButtonElement;
const logOutButton = document.getElementById("log-out-button")as HTMLButtonElement;

let chosenImage: string;
let loggedInUser: string;
let selectedUser: string;

logInRegisterPage.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.classList.contains("toggle-pages")) {
    logInForm.reset();
    registerForm.reset();

    logInDiv.classList.toggle("hidden");
    registerDiv.classList.toggle("hidden");

    clearUserProfilePicChoice();
  };
});

profileImageDiv.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.id !== "profile-images-div") {
    profileImgElementOne.classList.toggle("user-choice", target.id === "profile-images-one");
    profileImgElementTwo.classList.toggle("user-choice", target.id === "profile-images-two");
    profileImgElementThree.classList.toggle("user-choice", target.id === "profile-images-three");

    if (target.id === "profile-images-one") chosenImage = profileImgElementOne.src;
    if (target.id === "profile-images-two") chosenImage = profileImgElementTwo.src;
    if (target.id === "profile-images-three") chosenImage = profileImgElementThree.src;
  };
});

logInForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let loginCheck = await loginChecker(logInUserInputElement.value, logInPasswordInputElement.value);

  if (loginCheck) {
    loggedInUser = logInUserInputElement.value;

    logInDiv.classList.add("hidden");
    navBar.classList.remove("hidden");
    homePageDiv.classList.remove("hidden");
    
    const userObj = await getUsers();
    
    applyProfilePic(userObj, logInUserInputElement, logInPasswordInputElement)

    clearUserProfilePicChoice();
    logInForm.reset();
  };
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let registerCheck = await registerChecker(registerUsernameInputElement.value, registerPasswordInputElement.value, confirmPasswordInputElement.value);

  if (registerCheck) {
    await register(registerUsernameInputElement.value,registerPasswordInputElement.value, chosenImage);

    loggedInUser = registerUsernameInputElement.value;

    registerDiv.classList.add("hidden");
    navBar.classList.remove("hidden");
    homePageDiv.classList.remove("hidden");

    const userObj = await getUsers();

    applyProfilePic(userObj, registerUsernameInputElement, registerPasswordInputElement);

    clearUserProfilePicChoice(); 
    registerForm.reset();
  };
});

headerNavbar.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  if (target.innerText == "Mobile Games") {
    mobileGamesDiv.classList.remove("hidden");
    moviesTVShowsDiv.classList.add("hidden");
    eSportsDiv.classList.add("hidden");
    homePageDiv.classList.add("hidden");
    profileDiv.classList.add("hidden");
  } else if (target.innerText == "Movies/TV-Shows") {
    moviesTVShowsDiv.classList.remove("hidden");
    mobileGamesDiv.classList.add("hidden");
    eSportsDiv.classList.add("hidden");
    homePageDiv.classList.add("hidden");
    profileDiv.classList.add("hidden");
  } else if (target.innerText == "E-Sports") {
    eSportsDiv.classList.remove("hidden");
    mobileGamesDiv.classList.add("hidden");
    moviesTVShowsDiv.classList.add("hidden");
    homePageDiv.classList.add("hidden");
    profileDiv.classList.add("hidden");
  } else if (target.id == "logo" && !navBar.classList.contains("hidden")) {
    homePageDiv.classList.remove("hidden");
    eSportsDiv.classList.add("hidden");
    mobileGamesDiv.classList.add("hidden");
    moviesTVShowsDiv.classList.add("hidden");
    profileDiv.classList.add("hidden");
  } else if (target.id == "logged-in-profile-pic") {
    profileDiv.classList.remove("hidden");
    homePageDiv.classList.add("hidden");
    eSportsDiv.classList.add("hidden");
    mobileGamesDiv.classList.add("hidden");
    moviesTVShowsDiv.classList.add("hidden");

    await displayProfilePages(loggedInUser, loggedInUser);
  };
});

logOutButton.addEventListener("click", (event) => {
  logInDiv.classList.remove("hidden");
  deleteAccountButton.classList.add("hidden");
  navBar.classList.add("hidden");
  homePageDiv.classList.add("hidden");
  eSportsDiv.classList.add("hidden");
  mobileGamesDiv.classList.add("hidden");
  moviesTVShowsDiv.classList.add("hidden");
  profileDiv.classList.add("hidden")
})