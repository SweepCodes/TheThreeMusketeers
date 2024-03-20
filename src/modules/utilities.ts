export function clearUserProfilePicChoice(){
  const profileImgElementOne = document.getElementById("profile-images-one") as HTMLImageElement;
  const profileImgElementTwo = document.getElementById("profile-images-two") as HTMLImageElement;
  const profileImgElementThree = document.getElementById("profile-images-three") as HTMLImageElement;

  profileImgElementOne.classList.remove("user-choice");
  profileImgElementTwo.classList.remove("user-choice");
  profileImgElementThree.classList.remove("user-choice");
};