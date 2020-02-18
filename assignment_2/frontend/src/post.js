

//create a function to upload text and picture or only upload text
export function post() {

    let div = document.getElementById("root");
    let div_1 = document.createElement("div");
    div_1.setAttribute("class", "popup");

    div_1.setAttribute("id", "popup1");
    let div_2 = document.createElement("div");
    div_2.setAttribute("class","popup-content");
    let input_1 = document.createElement("input");
    input_1.setAttribute("id", "post-title")
    input_1.setAttribute("type","text");
    input_1.setAttribute("placeholder","Title");
    let input_2 = document.createElement("input");
    input_2.setAttribute("id", "post-text")
    input_2.setAttribute("type", "text");
    input_2.setAttribute("placeholder", "Text");
    let input_3 = document.createElement("input");
    input_3.setAttribute("id", "post-subseddit")
    input_3.setAttribute("type", "text");
    input_3.setAttribute("placeholder", "Subseddit");
    let input_4 = document.createElement("input");
    input_4.setAttribute("id", "post-image");
    input_4.setAttribute("type", "file");
    let log_in = document.createElement("button");
    log_in.setAttribute("data-id-post", "");
    log_in.setAttribute("id", "post1")
    log_in.setAttribute("class", "button button-secondary");
    log_in.innerText = "Post";
    let close = document.createElement("button");
    close.setAttribute("class", "close");
    close.setAttribute("id","close-post")
    close.innerText = "close";
    
    
    
    div_2.appendChild(input_1);
    div_2.appendChild(input_2);
    div_2.appendChild(input_3);
    div_2.appendChild(input_4);
    div_2.appendChild(log_in);
    div_2.appendChild(close);
    div_1.append(div_2);
    div.appendChild(div_1);


    let post_button = document.getElementById("post1");
    post_button.onclick = function(){
        
        let title = document.getElementById("post-title").value;
        let text = document.getElementById("post-text").value;
        let subseddit = document.getElementById("post-subseddit").value;
        if (title == ""){
            window.alert("Please fill in the title");
        }
        else if (text == ""){
            window.alert("Please fill in the text");
        }
        else {
            //transfer the photo to base 64
            var file    = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();
            let path = 'http://localhost:5000/post/';
            let token = localStorage.getItem("token");

         

            if (file) {
                reader.readAsDataURL(file);
            }


            reader.addEventListener("load", function (){
            
                let payload = {
                    "title":title,
                    "text":text,
                    "subseddit": subseddit,
                    "image" : reader.result.replace("data:image/png;base64,","")
                }
                
                fetch(path,{
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Authorization': 'Token ' + token,
                        'Content-Type': 'application/json'
                    })
                }).then(response => response.json()
        
                ).then(res => {
                    
                    if (res['message'] == "Invalid Auth Token"){
                        //if (res.status == 403){
                        window.alert("Invalid Auth Token");
                        }
                        //else if (res.status == 400){
                    else if (res['message'] == "Malformed Request / Image could not be processed"){
                        window.alert("Malformed Request / Image could not be processed");
                        }
                            
                    else{
                      
                        window.alert("Post Successfully");
                            
                        window.localStorage.setItem("title",title);
                        window.localStorage.setItem("text",text);
                        window.localStorage.setItem("subseddit", subseddit);
                        location.reload();
                        }
                })
            })       

            if (!file) {
                let payload = {
                    "title":title,
                    "text":text,
                    "subseddit": subseddit
                }
                fetch(path,{
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Authorization': 'Token ' + token,
                        'Content-Type': 'application/json'
                    })
                }).then(response => response.json()
        
                ).then(res => {
                    
                    if (res['message'] == "Invalid Auth Token"){
                        window.alert("Invalid Auth Token");
                    }

                    else if (res['message'] == "Malformed Request / Image could not be processed"){
                        window.alert("Malformed Request / Image could not be processed");
                    }
                    else{

                        window.alert("Post Successfully");
                            
                        window.localStorage.setItem("title",title);
                        window.localStorage.setItem("text",text);
                        window.localStorage.setItem("subseddit", subseddit);
                        location.reload();
                    }
                })
                
            }
            
        
            
            
        }
    }
            


    let close_post = document.getElementById("close-post");
    if (close_post) {
        close_post.addEventListener("click", function(){
            if (div_1){
            div.removeChild(div_1);
            }
        })
    }

}


//create the post button
let post_button = document.getElementById("Post");
post_button.addEventListener("click", post);

