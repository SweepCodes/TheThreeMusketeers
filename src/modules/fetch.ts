const baseUrl = `https://musketeerium-default-rtdb.europe-west1.firebasedatabase.app/`;

export type Users = {
    username: string;
    password: string;
    profilepic: string;
};

export type Comments = {
    category: "E-Sports" | "Mobile Games" | "Movies/TV-Shows";
    context: string;
    userid: string;
    username: string;
};

export async function getUsers(): Promise<Users> {
    let response = await fetch(baseUrl + "/.json");
    let data = await response.json();
    return data.users as Users;
}

export async function getComments(): Promise<Comments> {
    let response = await fetch(baseUrl + "/.json");
    let data = await response.json();
    return data.comments as Comments;
}

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

export async function deleteUser(userId: string): Promise<void> {
    const url = baseUrl + "/users/" + userId + "/.json";

    const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userId),
    };

    let response = await fetch(url, requestOptions);
    let data = await response.json();

    return data as void;
}
export async function postComment(userId: string, category: string, context: string, username: string): Promise<Comments> {
    const url = baseUrl + "/comments/.json";
    let commentObject = {userId, category, context, username};

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(commentObject),
    };

    let response = await fetch(url, requestOptions);
    let data = await response.json();
    return data.comments as Comments;
}
