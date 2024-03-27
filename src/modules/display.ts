import { Users, getUsers } from "./fetch.ts";
import { modifyClassOnElements } from "./utilities.ts";

export function applyProfilePic(userObj: Users, usernameInput: HTMLInputElement, passwordInput: HTMLInputElement): void{
  const loggedInProfilePicImgElement = document.getElementById("logged-in-profile-pic") as HTMLImageElement;

  for (const key in userObj) {
    const currentUser: Users = userObj[key];
    if (usernameInput.value === currentUser.username && passwordInput.value === currentUser.password){
      loggedInProfilePicImgElement.src = currentUser.profilepic;
      modifyClassOnElements("add", "circle", loggedInProfilePicImgElement);
    };
  };
};

export async function displayProfilePages(user: string, loggedInUser: string): Promise<void> {
  const profilePageImgElement = document.getElementById("profile-page-profile-picture") as HTMLImageElement;
  const profilePageH2Element = document.getElementById("profile-page-username") as HTMLHeadingElement;
  const deleteAccountButton = document.getElementById("delete-button") as HTMLButtonElement;

  const users = await getUsers();

  for (const key in users) {
    const currentUser: Users = users[key];
    if (currentUser.username === user) {
      profilePageImgElement.src = currentUser.profilepic;
      profilePageH2Element.innerText = currentUser.username;

      modifyClassOnElements("add", "hidden", deleteAccountButton);
      modifyClassOnElements("add", "circle", profilePageImgElement);
      if (user === loggedInUser) {
        modifyClassOnElements("remove", "hidden", deleteAccountButton);
      };
    };
  };
};

export async function displayUsersInAside(): Promise<void>{
  const asideDiv = document.querySelector("aside") as HTMLDivElement;
  const users = await getUsers()
  for(const key in users){
      const userElP = document.createElement("p");
      userElP.innerText = users[key].username;
      userElP.classList.add("users")
      
      asideDiv.append(userElP);
    };
};

