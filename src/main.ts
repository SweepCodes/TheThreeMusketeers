import {clearUserProfilePicChoice, loginChecker, registerChecker, modifyClassOnElements} from "./modules/utilities.ts";
import {getUsers, register, deleteUser, postComment, getComments, deleteComment} from "./modules/fetch.ts";
import {applyProfilePic, displayProfilePages, displayUsersInAside} from "./modules/display.ts";


//  import trashImage from "./images/trash.png";

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
const logOutButton = document.getElementById("log-out-button") as HTMLButtonElement;
const usernamePElement = document.getElementById("logged-in-username") as HTMLParagraphElement;
const asideDiv = document.querySelector("aside") as HTMLDivElement;
const esportsCommentForm = document.querySelector("#esports-form") as HTMLFormElement;
const categoryEsports = document.querySelector("#esports-title") as HTMLLIElement;
const esportCommentInput = document.querySelector("#e-sports-comment") as HTMLInputElement;
const moviesCommentForm = document.querySelector("#movies-tv-shows-form") as HTMLFormElement;
const categoryMovies = document.querySelector("#movies-title") as HTMLLIElement;
const moviesCommentInput = document.querySelector("#movies-tv-shows-comment") as HTMLInputElement;
const mobileGameCommentForm = document.querySelector("#mobile-games-form") as HTMLFormElement;
const categoryMobileGame = document.querySelector("#mobile-games-title") as HTMLLIElement;
const mobileGamesCommentInput = document.querySelector("#mobile-games-comment") as HTMLInputElement;
const esportsCommentDiv = document.querySelector("#e-sport-comments-posted") as HTMLDivElement;
const moviesCommentDiv = document.querySelector("#movies-comments-posted") as HTMLDivElement;
const mobileGameCommentDiv = document.querySelector("#mobile-games-comments-posted") as HTMLDivElement;
const userCommentsMainDiv = document.querySelector("#user-comments") as HTMLDivElement;


let chosenImage: string;
let loggedInUser: string;
let selectedUser: string;
let userId: string;

logInRegisterPage.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains("toggle-pages")) {
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
        profileImgElementOne.classList.toggle("user-choice", target.id === "profile-images-one");
        profileImgElementTwo.classList.toggle("user-choice", target.id === "profile-images-two");
        profileImgElementThree.classList.toggle("user-choice", target.id === "profile-images-three");

        if (target.id === "profile-images-one") chosenImage = profileImgElementOne.src;
        if (target.id === "profile-images-two") chosenImage = profileImgElementTwo.src;
        if (target.id === "profile-images-three") chosenImage = profileImgElementThree.src;
    }
});

logInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let loginCheck = await loginChecker(logInUserInputElement.value, logInPasswordInputElement.value);

    if (loginCheck) {
        loggedInUser = logInUserInputElement.value;
        usernamePElement.innerText = loggedInUser;
        modifyClassOnElements("add", "hidden", logInDiv);
        modifyClassOnElements("remove", "hidden", navBar, homePageDiv, asideDiv);
        const userObj = await getUsers();
        applyProfilePic(userObj, logInUserInputElement, logInPasswordInputElement);

        clearUserProfilePicChoice();
        displayUsersInAside();
        logInForm.reset();
    }
});

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let registerCheck = await registerChecker(registerUsernameInputElement.value, registerPasswordInputElement.value, confirmPasswordInputElement.value);

    if (registerCheck) {
        await register(registerUsernameInputElement.value, registerPasswordInputElement.value, chosenImage);

        loggedInUser = registerUsernameInputElement.value;
        usernamePElement.innerText = loggedInUser;
        modifyClassOnElements("remove", "hidden", navBar, homePageDiv, asideDiv);
        modifyClassOnElements("add", "hidden", registerDiv);
        const userObj = await getUsers();

        applyProfilePic(userObj, registerUsernameInputElement, registerPasswordInputElement);

        clearUserProfilePicChoice();
        displayUsersInAside();
        registerForm.reset();
    }
});

headerNavbar.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    switch (target.innerText) {
        case "Mobile Games":
            modifyClassOnElements("remove", "hidden", mobileGamesDiv);
            modifyClassOnElements("add", "hidden", moviesTVShowsDiv, eSportsDiv, homePageDiv, profileDiv);
            
            await displayAllComments();
            break;
        case "Movies/TV-Shows":
            modifyClassOnElements("remove", "hidden", moviesTVShowsDiv);
            modifyClassOnElements("add", "hidden", mobileGamesDiv, eSportsDiv, homePageDiv, profileDiv);
            
            await displayAllComments();
            break;
        case "E-Sports":
            modifyClassOnElements("remove", "hidden", eSportsDiv);
            modifyClassOnElements("add", "hidden", mobileGamesDiv, moviesTVShowsDiv, homePageDiv, profileDiv);
            
            await displayAllComments();
            break;
        default:
            if (target.id == "logo" && !navBar.classList.contains("hidden")) {
                modifyClassOnElements("remove", "hidden", homePageDiv);
                modifyClassOnElements("add", "hidden", mobileGamesDiv, moviesTVShowsDiv, eSportsDiv, profileDiv);
            } else if (target.id == "logged-in-profile-pic") {
                displayUserComments(loggedInUser)
                modifyClassOnElements("remove", "hidden", profileDiv);
                modifyClassOnElements("add", "hidden", homePageDiv, eSportsDiv, mobileGamesDiv, moviesTVShowsDiv);
                await displayProfilePages(loggedInUser, loggedInUser);
            }
            break;
    }
});

//////funktionen gör så att kommentarerna hamnar hos rätt user///////////////////////

async function displayUserComments(chosenUser: string) {
    const userCommets = await getComments();
    userCommentsMainDiv.innerHTML = " ";
    const userCommentH1 = document.createElement("h1") as HTMLHeadingElement;
    userCommentH1.innerText = "Profile comments";
    userCommentsMainDiv.append(userCommentH1);
    let commentsCount:number = 0;
    for(const key in userCommets){
        if(chosenUser == userCommets[key].username){
            const userCommentDiv = document.createElement("div") as HTMLDivElement;
            const userCommentP = document.createElement("p") as HTMLParagraphElement;
            userCommentDiv.classList.add("forum-container")
            userCommentP.innerText = userCommets[key].context;
            userCommentDiv.append(userCommentP);
            userCommentsMainDiv.append(userCommentDiv);
            
            if (chosenUser === loggedInUser) {
                const trashImagUrl = new URL('./images/trash.png', import.meta.url);
                const deleteTrashCan = document.createElement("img") as HTMLImageElement;
                deleteTrashCan.src = trashImagUrl.toString();
                deleteTrashCan.classList.add("deleteTrashCanButtonForComments");
                userCommentDiv.append(deleteTrashCan);
                deleteTrashCan.addEventListener("click", ()=>{
                    deleteComment(key)
                    userCommentDiv.classList.add("hidden")
                    
                })
            }
            commentsCount++;
            if(commentsCount>=3 && chosenUser !==loggedInUser){
                break;
            }
        }
       
    }
    
}

 




logOutButton.addEventListener("click", () => {
    modifyClassOnElements("remove", "hidden", logInDiv);
    modifyClassOnElements("add", "hidden", deleteAccountButton, navBar, homePageDiv, eSportsDiv, mobileGamesDiv, moviesTVShowsDiv, profileDiv, asideDiv);
    asideDiv.innerHTML = "";
});

asideDiv.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    if(target.classList.contains("users")){
        selectedUser = target.innerText;
        displayUserComments(selectedUser)
        modifyClassOnElements("remove", "hidden", profileDiv);
        modifyClassOnElements("add", "hidden", homePageDiv, eSportsDiv, mobileGamesDiv, moviesTVShowsDiv);
        await displayProfilePages(selectedUser, loggedInUser);
    }
});

////// Delete user////////////

deleteAccountButton.addEventListener("click", async () => {
    const userObj = await getUsers();

    for (const key in userObj) {
        if (userObj[key].username === loggedInUser) {
            await deleteUser(key);
        }
    }
    modifyClassOnElements("remove", "hidden", logInDiv);
    modifyClassOnElements("add", "hidden", deleteAccountButton, navBar, homePageDiv, eSportsDiv, mobileGamesDiv, moviesTVShowsDiv, profileDiv, asideDiv);
    asideDiv.innerHTML = "";
});

///////////comments /////
esportsCommentForm.addEventListener("submit", async (event) => await commentHandler(event, categoryEsports, esportCommentInput));
moviesCommentForm.addEventListener("submit", async (event) => await commentHandler(event, categoryMovies, moviesCommentInput));
mobileGameCommentForm.addEventListener("submit", async (event) => await commentHandler(event, categoryMobileGame, mobileGamesCommentInput));

async function commentHandler(event: SubmitEvent, categoryText: HTMLElement, commentInput: HTMLInputElement): Promise<void> {
    event.preventDefault();
    const category = categoryText.innerText;
    const context = commentInput.value;
    const username = loggedInUser;

    const users = await getUsers();
    for (const key in users) {
        if (users[key].username === loggedInUser) {
            // userId = key;
            await postComment(userId, category, context, username);
        }
    }
    displayAllComments();
    
    commentInput.value = "";
}

async function displayAllComments() {
    const comments = await getComments();
    moviesCommentDiv.innerHTML = "";
    esportsCommentDiv.innerHTML = "";
    mobileGameCommentDiv.innerHTML = "";
    
    for(const key in comments){
        displayComments(comments[key].username, comments[key].context, comments[key].category, loggedInUser, key )
    }
}


function displayComments(username: string, context: string, category: string, user: string, key: string){
    const commentDiv = document.createElement("div") as HTMLDivElement;
    const commentP = document.createElement("p") as HTMLParagraphElement;
    const userH2 = document.createElement("h2") as HTMLHeadElement;
    userH2.innerText = username;
    commentP.innerText = context;

    commentDiv.classList.add("forum-container");
    commentDiv.append(userH2, commentP);

    
    if(!eSportsDiv.classList.contains("hidden") && category == categoryEsports.innerText){
        esportsCommentDiv.append(commentDiv)
    }
    else if(!moviesTVShowsDiv.classList.contains("hidden")&& category == categoryMovies.innerText){
        moviesCommentDiv.append(commentDiv)
    }
    else if(!mobileGamesDiv.classList.contains("hidden")&& category == categoryMobileGame.innerText){
        mobileGameCommentDiv.append(commentDiv)
    }

    if(username === loggedInUser){
        const trashImagUrl = new URL('./images/trash.png', import.meta.url);
        const deleteTrashCan = document.createElement("img") as HTMLImageElement;
        deleteTrashCan.src = trashImagUrl.toString();
        deleteTrashCan.classList.add("deleteTrashCanButtonForComments");
        commentDiv.append(deleteTrashCan);

        deleteTrashCan.addEventListener("click", async event=>{
            
            await deleteComment(key);
            commentDiv.classList.add("hidden")
            
        })
    }

};
