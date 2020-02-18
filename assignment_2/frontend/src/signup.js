
import { ShowLogOutButton, ShowLogInButton } from './homepage.js';





//create a pop up form for sign up
function sign_up(){

    let div = document.getElementById("root");
    let div_1 = document.createElement("div");
    div_1.setAttribute("class", "popup");

    div_1.setAttribute("id", "popup");
    let div_2 = document.createElement("div");
    div_2.setAttribute("class","popup-content");
    let input_1 = document.createElement("input");
    input_1.setAttribute("id", "username_signup")
    input_1.setAttribute("type","text");
    input_1.setAttribute("placeholder","Username");
    let input_2 = document.createElement("input");
    input_2.setAttribute("id", "password_signup")
    input_2.setAttribute("type", "password");
    input_2.setAttribute("placeholder", "Password");
    let input_3 = document.createElement("input");
    input_3.setAttribute("id", "email")
    input_3.setAttribute("type", "text");
    input_3.setAttribute("placeholder", "Email");

    let input_4 = document.createElement("input");
    input_4.setAttribute("id", "name")
    input_4.setAttribute("type", "text");
    input_4.setAttribute("placeholder", "Name");
    
    let sign_up = document.createElement("button");
    sign_up.setAttribute("data-id-signup", "");
    sign_up.setAttribute("id", "sign_up")
    sign_up.setAttribute("class", "button button-secondary");
    sign_up.innerText = "Sign Up";
    let close = document.createElement("button");
    close.setAttribute("class", "close");
    close.setAttribute("id","close")
    close.innerText = "close";
    
    
    
    div_2.appendChild(input_1);
    div_2.appendChild(input_2);
    div_2.appendChild(input_3);
    div_2.appendChild(input_4);
    div_2.appendChild(sign_up);
    div_2.appendChild(close);
    div_1.append(div_2);
    div.appendChild(div_1);




    let signup_button = document.getElementById("sign_up");
    
    signup_button.onclick = function(){
        //console.log("-----------------------------")
        let username = document.getElementById("username_signup").value;
        //console.log(username)
        let password = document.getElementById("password_signup").value;
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        if (username == ""){
            window.alert("Please fill in the username");
        }
        else if (password == ""){
            window.alert("Please fill in the password");
        }
        else if (email == ""){
            window.alert("Please fill in the email");
        }
        else if (name== ""){
            window.alert("Please fill in the name");
        }
        
        else {

            let user = {
                "username":username,
                "password":password,
                "email": email,
                "name": name

            }
            console.log(user);
        

            
            let path = 'http://localhost:5000/auth/signup';


            fetch(path,{
                method: 'POST',
                body: JSON.stringify(user),
                headers: new Headers({
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                

            }).then(response => response.json()

            ).then(res => {
                if (res["message"] == "Username Taken"){

                
                //if (res.status === 409){
                    window.alert("Username Taken");
                }
                else if (res["message"] == "Malformed Request"){
                //else if (res.status === 400){
                    window.alert("Malformed Request");
                }
                else{
                    window.alert("Sign up successfully");
                    //if (typeof(Storage) != "undefined") {
                        //console.log("22")
                    window.localStorage.setItem('username', username);
                    window.localStorage.setItem('token', res['token']);
                    location.reload();
                    
                } 
            })
        }
    }
    
    ShowLogInButton();
    let close_1 = document.getElementById("close");
    if (close_1) {
        close_1.addEventListener("click", function(){
            if (div_1){
            div.removeChild(div_1);
            }
        })
    }
}


//create the button for sign up
let sign_up_button = document.getElementById("Sign_Up");
sign_up_button.addEventListener("click", sign_up);

