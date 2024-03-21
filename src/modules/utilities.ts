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
