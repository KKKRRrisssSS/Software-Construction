
import { ShowLogOutButton, ShowLogInButton } from './homepage.js';





//create a popup form for the login in
function log_in_form(){
    let div = document.getElementById("root");
    let div_1 = document.createElement("div");
    div_1.setAttribute("class", "popup");

    div_1.setAttribute("id", "popup");
    let div_2 = document.createElement("div");
    div_2.setAttribute("class","popup-content");
    let input_1 = document.createElement("input");
    input_1.setAttribute("id", "username_login")
    input_1.setAttribute("type","text");
    input_1.setAttribute("placeholder","Username");
    let input_2 = document.createElement("input");
    input_2.setAttribute("id", "password_login")
    input_2.setAttribute("type", "password");
    input_2.setAttribute("placeholder", "Password");
    let log_in = document.createElement("button");
    log_in.setAttribute("data-id-login", "");
    log_in.setAttribute("id", "log_in")
    log_in.setAttribute("class", "button button-secondary");
    log_in.innerText = "Login";
    let close = document.createElement("button");
    close.setAttribute("class", "close");
    close.setAttribute("id","close")
    close.innerText = "close";
    
    
    
    div_2.appendChild(input_1);
    div_2.appendChild(input_2);
    div_2.appendChild(log_in);
    div_2.appendChild(close);
    div_1.append(div_2);
    div.appendChild(div_1);

    let login_button = document.getElementById("log_in");
    
    login_button.onclick = function(){
        let username = document.getElementById("username_login").value;
        let password = document.getElementById("password_login").value;
        if (username == "" && password == ""){
            window.alert("Please fill in the username and password");
        }
        else if (username == "" && password !== ""){
            window.alert("Please fill in the username");
        }
        else if (username !== "" && password == ""){
            window.alert("Please fill in the password");
        }
        else {
            let user = {
                "username":username,
                "password":password
            }

        

            //let method_1 = 'POST';
            
            let path = 'http://localhost:5000/auth/login';


            fetch(path,{
                method: 'POST',
                body: JSON.stringify(user),
                headers: new Headers({
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                

            }).then(response => response.json()

            ).then(res => {
                if (res['message'] == "Invalid Username/Password"){
                //if (res.status == 403){
                    window.alert("Invalid Username/Password");
                }
                //else if (res.status == 400){
                else if (res['message'] == "Missing Username/Password"){
                    window.alert("Missing Username/Password");
                }
                    //let token = text;
                    //console.log(text, "im in");
                else{
                    let token = res.token;
                    window.alert("Login Successfully");
                    
                    window.localStorage.setItem('username', username);
                    window.localStorage.setItem('token', token);
                    //UserGetContent(token);
                    ShowLogOutButton();
                    location.reload();
                    
                
                }
                
            })
        }
    } 



    let close_1 = document.getElementById("close");
    if (close_1) {
        close_1.addEventListener("click", function(){
          
            
            if (div_1){
            div.removeChild(div_1);
            }
        })
    }
    

}





//if log out, clear the user token
function logout(){
    localStorage.clear();
    window.alert("Log Out Successfully");
    ShowLogInButton();
    location.reload();
}


//create the login and logout button
let log_in_button = document.getElementById("Log_In");
log_in_button.addEventListener("click", log_in_form);


let log_out_button = document.getElementById("Log_Out");
log_out_button.addEventListener("click", logout);
