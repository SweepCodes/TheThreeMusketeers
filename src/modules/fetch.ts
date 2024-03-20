const baseUrl = `https://musketeerium-default-rtdb.europe-west1.firebasedatabase.app/.json`;

export async function get() {
  let response = await fetch(baseUrl);
  let data = await response.json();
  for (const key in data) {
  }
  return data;
}
export async function register(
  username: string,
  password: string,
  profilepic: string
) {
  const url = baseUrl + "/users/.json";
  let userInfo = { username, password, profilepic };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  };

  let response = await fetch(url, requestOptions);
  let data = await response.json();
  console.log(data);
}

// export async function loginChecker() {
//     const username = // queryselect
//     const password = // queryselect
//     let response = await fetch(baseUrl);
//     let data = await response.json();
//     let isLoggedIn = false;

//     for (userId in data) {
//       let userName = data[userId].username;
//       let userPass = data[userId].password;
//       console.log("LOGIN; ", userId, userName, userPass);

//       if (username === userName && password === userPass) {
//         isLoggedIn = true;
//       }
//     }

//     if (isLoggedIn) {
//     här ska sidan ändras till home page och tillåta användaren att skriva kommentarer.
//     } else {
//       alert("Wrong username or password");
//     }
//   }
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
