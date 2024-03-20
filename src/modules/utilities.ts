import { Users } from "./fetch.ts";

export function clearUserProfilePicChoice(): void{
  const profileImgElementOne = document.getElementById("profile-images-one") as HTMLImageElement;
  const profileImgElementTwo = document.getElementById("profile-images-two") as HTMLImageElement;
  const profileImgElementThree = document.getElementById("profile-images-three") as HTMLImageElement;

  profileImgElementOne.classList.remove("user-choice");
  profileImgElementTwo.classList.remove("user-choice");
  profileImgElementThree.classList.remove("user-choice");
};

export function applyProfilePic(userObj: Users, usernameInput: HTMLInputElement, passwordInput: HTMLInputElement): void{
  const loggedInProfilePic = document.getElementById("logged-in-profile-pic") as HTMLImageElement;

  for (const key in userObj) {
    const currentUser: Users = userObj[key];
    if (usernameInput.value === currentUser.username && passwordInput.value === currentUser.password){
      loggedInProfilePic.src = currentUser.profilepic;
      loggedInProfilePic.classList.add("circle");
    };
  };
}