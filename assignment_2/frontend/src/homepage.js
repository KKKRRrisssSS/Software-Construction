
//create the header for the homepage
function create_header(){
    let div = document.getElementById("root");

    let header = document.createElement("header");
    header.setAttribute("class", "banner");
    header.setAttribute("id", "nav");
    
    let h1 = document.createElement("h1");
    h1.setAttribute("id", "logo");
    h1.setAttribute("class", "flex-center");
    h1.innerText = "Seddit";
    header.appendChild(h1);

    let ul = document.createElement("ul");
    ul.setAttribute("class", "nav");
    
    let li = document.createElement("li");
    li.setAttribute("class", "nav-item");

    let input = document.createElement("input");
    input.setAttribute("id", "search");
    input.setAttribute("data-id-search", "");
    input.setAttribute("placeholder", "Search Seddit");
    input.setAttribute("type" , "search");
    li.appendChild(input);
    ul.appendChild(li);

    let li_1 = document.createElement("li");
    li_1.setAttribute("class", "nav-item");
    let button = document.createElement("button");
    button.setAttribute("data-id-login", "");
    button.setAttribute("class", "button button-primary");
    button.setAttribute("id","Log_In")
    button.innerText = "Log In";
    li_1.append(button);
    ul.appendChild(li_1);

    
    let li_2 = document.createElement("li");
    li_2.setAttribute("class", "nav-item");
    let button_1 = document.createElement("button");
    button_1.setAttribute("data-id-signup", "");
    button_1.setAttribute("class", "button button-secondary");
    button_1.setAttribute("id", "Sign_Up")
    button_1.innerText = "Sign Up";
    li_2.append(button_1);
    ul.appendChild(li_2);


    let li_3 = document.createElement("li");
    li_3.setAttribute("class", "nav-item");
    let button_2 = document.createElement("button");
    button_2.setAttribute("data-id-logout", "");
    button_2.setAttribute("class", "button button-secondary");
    button_2.setAttribute("id", "Log_Out")
    button_2.innerText = "Log Out";
    li_3.append(button_2);
    ul.appendChild(li_3);

    let li_4 = document.createElement("li");
    li_4.setAttribute("class", "nav-item");
    let name = document.createElement("p");
    name.setAttribute("data-id-name", "");
    name.setAttribute("class", "alt-text");
    name.setAttribute("id", "username")
    //button_2.innerText = "Log Out";
    li_4.append(name);
    ul.appendChild(li_4);

    header.appendChild(ul);
    div.appendChild(header);
}




//create the body for the homepage
function create_main(){
    let div = document.getElementById("root");
    let main = document.createElement("main");
    main.setAttribute("role","main");
    main.setAttribute("id", "main");
    
    let ul = document.createElement("ul");
    ul.setAttribute("id", "feed");
    ul.setAttribute("data-id-feed","");

    let div_1 = document.createElement("div");
    div_1.setAttribute("class","feed-header");
    div_1.setAttribute("id","feed-header");

    let div_2 = document.createElement("div");
    div_2.setAttribute("class", "post-title alt-text");
    div_2.setAttribute("id", "div_profile")

    let div_3 = document.createElement("div");
    //div_3.setAttribute("class", "post-title alt-text");
    div_3.setAttribute("id", "div_post");

    let div_4 = document.createElement("div");
    div_4.setAttribute("id","div_feed");

    let h3 = document.createElement("h3");
    h3.setAttribute("class", "feed-title alt-text");
    h3.setAttribute("id", "title1");
    h3.innerText = "Popular posts";

    let button = document.createElement("button");
    button.setAttribute("class", "button button-secondary");
    button.setAttribute("id", "Post")
    button.innerText = "Post";

    div_1.appendChild(h3);
    div_1.appendChild(button);

    ul.appendChild(div_1);
    ul.appendChild(div_2);
    ul.appendChild(div_3);
    ul.appendChild(div_4);
    main.appendChild(ul);
    div.appendChild(main);
}



//create the footer for the homepage
function create_footer() {
	  let div = document.getElementById("root");
	  let footer = document.createElement("footer");
	  let p = document.createElement("p");
	  p.innerText = "Seddit example";
	  footer.appendChild(p);
	  div.appendChild(footer);
}


//rum this homepage
create_header();
create_main();
create_footer();

let login = document.getElementById("Log_In")
let signup = document.getElementById("Sign_Up")
let logout = document.getElementById("Log_Out")
let username = document.getElementById("username")


//check if there is token, the interface should hide the sign up and log in button
//if there is no token, the interface should hide the log out button
if (localStorage.getItem('token')) {
    ShowLogOutButton();
}
else {
    ShowLogInButton();
}



//to show log out button, hide login and logout button
export function ShowLogOutButton() {
    var token = localStorage.getItem('token');
    showUserName(token);
    login.style.display = "none";
    signup.style.display = "none";
    username.style.display = "";
    logout.style.display = "";
}


//to show log in and log out button, hide the logout button
export function ShowLogInButton(){
    login.style.display = "";
    signup.style.display = "";
    username.style.display = "none";
    logout.style.display = "none";
}


// to welcome the user who have login the website
export function showUserName(token){
    var url = 'http://localhost:5000/user/';
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
            //'Content-Type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((data) => {
        username.innerText = "welcome back,    " +"  " +data.username;
    });

}

