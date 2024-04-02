import {Users, getUsers, getComments, deleteComment} from "./fetch.ts";
import {modifyClassOnElements} from "./utilities.ts";

const eSportsDiv = document.getElementById("e-sport-forum") as HTMLDivElement;
const categoryEsports = document.querySelector("#esports-title") as HTMLLIElement;
const esportsCommentDiv = document.querySelector("#e-sport-comments-posted") as HTMLDivElement;
const moviesTVShowsDiv = document.getElementById("movies-tv-shows-forum") as HTMLDivElement;
const categoryMovies = document.querySelector("#movies-title") as HTMLLIElement;
const moviesCommentDiv = document.querySelector("#movies-comments-posted") as HTMLDivElement;
const mobileGamesDiv = document.getElementById("mobile-games-forum") as HTMLDivElement;
const categoryMobileGame = document.querySelector("#mobile-games-title") as HTMLLIElement;
const mobileGameCommentDiv = document.querySelector("#mobile-games-comments-posted") as HTMLDivElement;

const userCommentsMainDiv = document.querySelector("#user-comments") as HTMLDivElement;
let loggedInUser: string;

export function applyProfilePic(userObj: Users, usernameInput: HTMLInputElement, passwordInput: HTMLInputElement): void {
    const loggedInProfilePicImgElement = document.getElementById("logged-in-profile-pic") as HTMLImageElement;

    for (const key in userObj) {
        const currentUser: Users = userObj[key];
        if (usernameInput.value === currentUser.username && passwordInput.value === currentUser.password) {
            loggedInProfilePicImgElement.src = currentUser.profilepic;
            modifyClassOnElements("add", "circle", loggedInProfilePicImgElement);
        }
    }
}

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
            }
        }
    }
}

export async function displayUsersInAside(): Promise<void> {
    const asideDiv = document.querySelector("aside") as HTMLDivElement;
    const usersListH2 = document.createElement("h2") as HTMLHeadingElement;
    usersListH2.innerText = "Users:";
    asideDiv.append(usersListH2);
    const users = await getUsers();
    for (const key in users) {
        const userElP = document.createElement("p");
        userElP.innerText = users[key].username;
        userElP.classList.add("users");

        asideDiv.append(userElP);
    }
}

export async function displayUserComments(chosenUser: string) {
    const userComments = await getComments();
    userCommentsMainDiv.innerHTML = " ";
    const userCommentH1 = document.createElement("h1") as HTMLHeadingElement;
    userCommentH1.innerText = "Profile comments";
    userCommentsMainDiv.append(userCommentH1);
    let commentsCount: number = 0;
   
    for(const key in userComments){
      if(chosenUser == userComments[key].username && chosenUser !==loggedInUser){        
          commentsCount++
      }
  }
  let removenumber: number = commentsCount - 3;

  for(const key in userComments){
      if(chosenUser == userComments[key].username){
          const userCommentDiv = document.createElement("div") as HTMLDivElement;
          const userCommentP = document.createElement("p") as HTMLParagraphElement;
          userCommentDiv.classList.add("forum-container")
          userCommentP.innerText = userComments[key].context;
          userCommentDiv.append(userCommentP);
          userCommentsMainDiv.append(userCommentDiv);
          if(removenumber > 0){
              removenumber--;
              userCommentDiv.remove();
          }
          
          if (chosenUser === loggedInUser) {
              const trashImagUrl = new URL('./images/trash.png', import.meta.url);
              const deleteTrashCan = document.createElement("img") as HTMLImageElement;
              deleteTrashCan.src = trashImagUrl.toString();
              deleteTrashCan.classList.add("deleteTrashCanButtonForComments");
              userCommentDiv.append(deleteTrashCan);
              deleteTrashCan.addEventListener("click", ()=>{
                  deleteComment(key)
                  userCommentDiv.remove()
                  
              })
          }        
      }
     
  }
  
}


function displayComments(username: string, context: string, category: string, user: string, key: string) {
    const commentDiv = document.createElement("div") as HTMLDivElement;
    const commentP = document.createElement("p") as HTMLParagraphElement;
    const userH2 = document.createElement("h2") as HTMLHeadElement;
    userH2.innerText = username;
    commentP.innerText = context;

    commentDiv.classList.add("forum-container");
    commentDiv.append(userH2, commentP);

    if (!eSportsDiv.classList.contains("hidden") && category == categoryEsports.innerText) {
        esportsCommentDiv.append(commentDiv);
    } else if (!moviesTVShowsDiv.classList.contains("hidden") && category == categoryMovies.innerText) {
        moviesCommentDiv.append(commentDiv);
    } else if (!mobileGamesDiv.classList.contains("hidden") && category == categoryMobileGame.innerText) {
        mobileGameCommentDiv.append(commentDiv);
    }

    if (username === loggedInUser) {
        const trashImagUrl = new URL("../images/trash.png", import.meta.url);
        const deleteTrashCan = document.createElement("img") as HTMLImageElement;
        deleteTrashCan.src = trashImagUrl.toString();
        deleteTrashCan.classList.add("deleteTrashCanButtonForComments");
        commentDiv.append(deleteTrashCan);

        deleteTrashCan.addEventListener("click", async () => {
            await deleteComment(key);
            commentDiv.remove();
        });
    }
}

export async function displayAllComments() {
    const comments = await getComments();
    moviesCommentDiv.innerHTML = "";
    esportsCommentDiv.innerHTML = "";
    mobileGameCommentDiv.innerHTML = "";

    for (const key in comments) {
        displayComments(comments[key].username, comments[key].context, comments[key].category, loggedInUser, key);
    }
}
