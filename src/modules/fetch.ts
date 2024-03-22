const baseUrl = `https://musketeerium-default-rtdb.europe-west1.firebasedatabase.app/`;

export type Users = {
    username: string;
    password: string;
    profilepic: string;
};

export type Comments = {
    category: "esport" | "mobilegames" | "movies/tvshows";
    context: string;
    userid: string;
};

export async function getUsers(): Promise<Users> {
    let response = await fetch(baseUrl + "/.json");
    let data = await response.json();
    return data.users as Users;
};

export async function getComments(): Promise<Comments> {
    let response = await fetch(baseUrl + "/.json");
    let data = await response.json();
    return data.comments as Comments;
};

export async function register(username: string, password: string, profilepic: string): Promise<Users> {
    const url = baseUrl + "/users/.json";
    let userInfo = {username, password, profilepic};

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userInfo),
    };

    let response = await fetch(url, requestOptions);
    let data = await response.json();

    return data as Users;
}
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
