const baseUrl = `https://musketeerium-default-rtdb.europe-west1.firebasedatabase.app/.json`;

export async function get() {
  let response = await fetch(baseUrl);
  let data = await response.json();
  console.log(data);
  return data;
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
//     } else {
//       alert("Wrong username or password");
//     }
//   }

// export async function register(username, password) {
//     let loginInfo = { username, password };

//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(loginInfo),
//     };

//     let response = await fetch(baseUrl, requestOptions);
//     let data = await response.json();
//     console.log(data);
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
