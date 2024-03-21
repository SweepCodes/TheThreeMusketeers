const baseUrl = `https://musketeerium-default-rtdb.europe-west1.firebasedatabase.app/`;

export type Users = {
  username: string;
  password: string;
  profilepic: string;
};

export async function getUsers(): Promise<Users> {
  let response = await fetch(baseUrl + "/.json");
  let data = await response.json();
  return data.users as Users;
}

// export async function getComments() {
//   let response = await fetch(baseUrl + "/.json");
//   let data = await response.json();
//   for (const key in data.comments) {
//     console.log(data.comments[key].category);
//     console.log(data.comments[key].username);
//     console.log(data.comments[key].image);
//     console.log(data.comments[key].context);
//   }
//   return data;
// }

export async function register(username: string, password: string, profilepic: string): Promise<Users> {
  const url = baseUrl + "/users/.json";
  let userInfo = { username, password, profilepic };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  };

  let response = await fetch(url, requestOptions);
  let data = await response.json();

  return data as Users
}

export async function loginChecker(user: string, pass: string): Promise<boolean> {
  const users = await getUsers();
  for (const key in users) {
    const currentUser = users[key];
    if (currentUser.username === user && currentUser.password === pass) return true;
  };
  alert("Wrong username or password!");
  return false;
}

export async function registerChecker(user: string, password: string, confirmPassword: string): Promise<boolean>{
  const profileImgElementOne = document.getElementById("profile-images-one") as HTMLImageElement;
  const profileImgElementTwo = document.getElementById("profile-images-two") as HTMLImageElement;
  const profileImgElementThree = document.getElementById("profile-images-three") as HTMLImageElement;

  const users = await getUsers();
  
  if (profileImgElementOne.classList.contains("user-choice") || profileImgElementTwo.classList.contains("user-choice") || profileImgElementThree.classList.contains("user-choice")) {
    for (const key in users) {
      const currentUser = users[key];
      if (currentUser.username === user) {
        alert("Username already exists!");
        return false;
      };
    };
    if (password === confirmPassword) {
      return true;
    } else {
      alert("Passwords needs to be the same!");
      return false;
    };
  } else {
    alert("Chose profile picture!");
    return false;
  };
};

//   export async function postComment() {
//     const commentsUrl = ``
//     let comment = //comment text input queryselect
//     let commentObject = { comment };

//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(commentObject),
//     };

//     let response = await fetch(commentUrl, requestOptions);
//     let data = await response.json();
//     console.log(data);
//   }
