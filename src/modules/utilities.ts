import {Users, getUsers} from "./fetch.js";

export function clearUserProfilePicChoice(): void {
    const profileImgElementOne = document.getElementById("profile-images-one") as HTMLImageElement;
    const profileImgElementTwo = document.getElementById("profile-images-two") as HTMLImageElement;
    const profileImgElementThree = document.getElementById("profile-images-three") as HTMLImageElement;

    profileImgElementOne.classList.remove("user-choice");
    profileImgElementTwo.classList.remove("user-choice");
    profileImgElementThree.classList.remove("user-choice");
}

export function modifyClassOnElements(action: "add" | "remove", className: string, ...elements: HTMLElement[]) {
    elements.forEach((element) => {
        if (action === "add") {
            element.classList.add(className);
        } else if (action === "remove") {
            element.classList.remove(className);
        }
    });
}

export async function loginChecker(user: string, pass: string): Promise<boolean> {
    const users = await getUsers();
    for (const key in users) {
        const currentUser: Users = users[key];
        if (currentUser.username === user && currentUser.password === pass) return true;
    }
    alert("Wrong username or password!");
    return false;
}

export async function registerChecker(user: string, password: string, confirmPassword: string): Promise<boolean> {
    const profileImgElementOne = document.getElementById("profile-images-one") as HTMLImageElement;
    const profileImgElementTwo = document.getElementById("profile-images-two") as HTMLImageElement;
    const profileImgElementThree = document.getElementById("profile-images-three") as HTMLImageElement;

    const users = await getUsers();

    if (profileImgElementOne.classList.contains("user-choice") || profileImgElementTwo.classList.contains("user-choice") || profileImgElementThree.classList.contains("user-choice")) {
        for (const key in users) {
            const currentUser: Users = users[key];
            if (currentUser.username === user) {
                alert("Username already exists!");
                return false;
            }
        }
        if (password === confirmPassword) {
            return true;
        } else {
            alert("Passwords needs to be the same!");
            return false;
        }
    } else {
        alert("Chose profile picture!");
        return false;
    }
}
