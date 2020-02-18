let scroll_index_post = 0;
let scroll_index_feed = 0;


//help user see their own feed
function see_feed(){
    let div_feed = document.getElementById("div_feed");
    div_feed.style.display = "";
    //create infinite scroll here
    const path_feed = 'http://localhost:5000/user/feed?p=' + scroll_index_feed + '&n=5';

    let feed = document.getElementById("feed");
    let token = localStorage.getItem('token');
    fetch(path_feed, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
    .then((res) => res.json())
    .then((json) => {
        scroll_index_feed += 5;

        for (let text of json["posts"]){

            let li = document.createElement("li");
            li.setAttribute("class", "post");
            li.setAttribute("data-id-post", "");


            let div_2 = document.createElement("div");
            div_2.setAttribute("class", "vote");
            div_2.setAttribute("data-id-upvotes","");
            div_2.innerText = text["meta"]["upvotes"].length;

            let div_3 = document.createElement("div");
            div_3.setAttribute("class", "content");

            let h3 = document.createElement("h4");
            h3.setAttribute("data-id-title","");
            h3.setAttribute("class", "post-title alt-text");
            h3.innerText = text["title"];

            let h4 = document.createElement("h4");
            h4.setAttribute("data-id-post","");
            h4.setAttribute("class", "post-title alt-text");
            h4.innerText = text["text"];

            let p = document.createElement("p");
            p.setAttribute("class", "post-author");
            p.setAttribute("data-id-author", "");
            p.innerText = "Posted by "+ text["meta"]["author"];

            let p_1 = document.createElement("p");
            p_1.setAttribute("class", "post-author");
            p_1.innerText = "Posted at "+ timeConvert(text["meta"]["published"]);

            let p_2 = document.createElement("p");
            p_2.setAttribute("class", "post-author");
            p_2.setAttribute("id", "comment"+text["id"]);
            p_2.innerText = text["comments"].length+" Comments";

            let p_3 = document.createElement("p");
            p_3.setAttribute("class", "post-author");
            p_3.innerText = "Posted to "+text["meta"]["subseddit"];

            
            
            //////////////////////
            

            let p_4 = document.createElement("button");
            p_4.setAttribute("class", "button button-secondary");
            p_4.setAttribute("id", "upvote"+text["id"]);
            p_4.innerText = "show upvotes";

            let p_5 = document.createElement("button");
            p_5.setAttribute("class", "button button-secondary");
            p_5.setAttribute("id", "comment"+text["id"]);
            p_5.innerText = "show comments";

            let p_6 = document.createElement("button");
            p_6.setAttribute("class", "button button-secondary");
            p_6.setAttribute("id", "upvotethis"+text["id"]);
            p_6.innerText = "upvote";


            let p_7 = document.createElement("button");
            p_7.setAttribute("class", "button button-secondary");
            p_7.setAttribute("id", "cancelupvote"+text["id"]);
            p_7.innerText = "cancel upvote";

            let p_8 = document.createElement("button");
            p_8.setAttribute("class", "button button-secondary");
            p_8.setAttribute("id", "addcomment"+text["id"]);
            p_8.innerText = "add comment";

            let p_9 = document.createElement("button");
            p_9.setAttribute("class", "button button-secondary");
            p_9.setAttribute("id", "userpage"+text["meta"]["author"]);
            p_9.innerText = "user page";

            let image = document.createElement("img");
            if (text["image"]){
                image.setAttribute("src",'data:image/png;base64,' + text["image"])
            }
            
            
            
            div_3.appendChild(h3);
            div_3.appendChild(h4);
            div_3.appendChild(p);
            div_3.appendChild(p_1);
            div_3.appendChild(p_2);
            div_3.appendChild(p_3);
            div_3.appendChild(p_4);
            div_3.appendChild(p_5);
            div_3.appendChild(p_6);
            div_3.appendChild(p_7);
            div_3.appendChild(p_8);
            div_3.appendChild(p_9);
            div_3.appendChild(image);

            

            li.appendChild(div_2);
            li.appendChild(div_3);
            div_feed.appendChild(li);
            feed.appendChild(div_feed);
        }
    })
}


//help user see the public post
function see_posts(){
    
    
    //also implement the infitnite scroll here
    let path_public = 'http://localhost:5000/post/public?p=' + scroll_index_post +"&n=5";
    let div_profile = document.getElementById("div_profile");
    div_profile.style.display = "none";    
    let div_post = document.getElementById("div_post");
    div_post.style.display = "";
    let div_feed = document.getElementById("div_feed");
    div_feed.style.display = "none";
    let feed = document.getElementById("feed");

    fetch(path_public)
        .then(response => response.json())
        .then(texts => {
            scroll_index_post += 5;
            
            for (let text of texts["posts"]){
                let li = document.createElement("li");
                li.setAttribute("class", "post");
                li.setAttribute("data-id-post", "");


                let div_2 = document.createElement("div");
                div_2.setAttribute("id", "number_of_upvotes" + text["id"])
                div_2.setAttribute("class", "vote");
                div_2.setAttribute("data-id-upvotes","");
                div_2.innerText = text["meta"]["upvotes"].length;

                let div_3 = document.createElement("div");
                div_3.setAttribute("class", "content");

                let h3 = document.createElement("h4");
                h3.setAttribute("data-id-title","");
                h3.setAttribute("class", "post-title alt-text");
                h3.innerText = text["title"];

                let h4 = document.createElement("h4");
                h4.setAttribute("data-id-post","");
                h4.setAttribute("class", "post-title alt-text");
                h4.innerText = text["text"];

                let p = document.createElement("p");
                p.setAttribute("class", "post-author");
                p.setAttribute("data-id-author", "");
                p.innerText = "Posted by "+ text["meta"]["author"];

                let p_1 = document.createElement("p");
                p_1.setAttribute("class", "post-author");
                p_1.innerText = "Posted at "+ timeConvert(text["meta"]["published"]);

                let p_2 = document.createElement("p");
                p_2.setAttribute("class", "post-author");
                p_2.innerText = text["comments"].length+" Comments";

                let p_3 = document.createElement("p");
                p_3.setAttribute("class", "post-author");
                p_3.innerText = "Posted to "+text["meta"]["subseddit"];

                let p_4 = document.createElement("button");
                p_4.setAttribute("class", "button button-secondary");
                p_4.setAttribute("id", "upvote"+text["id"]);
                p_4.innerText = "show upvotes";

                let p_5 = document.createElement("button");
                p_5.setAttribute("class", "button button-secondary");
                p_5.setAttribute("id", "comment"+text["id"]);
                p_5.innerText = "show comments";

                let p_6 = document.createElement("button");
                p_6.setAttribute("class", "button button-secondary");
                p_6.setAttribute("id", "upvotethis"+text["id"]);
                p_6.innerText = "upvote";


                let p_7 = document.createElement("button");
                p_7.setAttribute("class", "button button-secondary");
                p_7.setAttribute("id", "cancelupvote"+text["id"]);
                p_7.innerText = "cancel upvote";

                let p_8 = document.createElement("button");
                p_8.setAttribute("class", "button button-secondary");
                p_8.setAttribute("id", "addcomment"+text["id"]);
                p_8.innerText = "add comment";

                let p_9 = document.createElement("button");
                p_9.setAttribute("class", "button button-secondary");
                p_9.setAttribute("id", "userpage"+text["meta"]["author"]);
                p_9.innerText = "user page";

                let li_2 = document.createElement("li_2");
                li_2.setAttribute("class", "showupvotes1");


                li_2.appendChild(p_4);
            

                let image = document.createElement("img");
                if (text["image"]){
                    image.setAttribute("src",'data:image/png;base64,' + text["image"])
                }
                
                
                
                div_3.appendChild(h3);
                div_3.appendChild(h4);
                div_3.appendChild(p);
                div_3.appendChild(p_1);
                div_3.appendChild(p_2);
                div_3.appendChild(p_3);
                div_3.appendChild(li_2);
                div_3.appendChild(p_5);
                div_3.appendChild(p_6);
                div_3.appendChild(p_7);
                div_3.appendChild(p_8);
                div_3.appendChild(p_9);
                div_3.appendChild(image);

                li.appendChild(div_2);
                li.appendChild(div_3);
                div_post.appendChild(li);
                feed.appendChild(div_post);
                
            }
        })

}



//create the homepage when the user log in
export function homepage(){
    if (localStorage.getItem('token')) {

        let div_feed = document.getElementById("div_feed");
        div_feed.style.display = "";
        let div_post = document.getElementById("div_post");
        div_post.style.display = "none";

        let header = document.getElementById("feed-header");
        let title = document.getElementById("title1");
        title.style.display = "none";
        let button_profile = document.createElement("button");
        button_profile.setAttribute("class", "button button-secondary");
        button_profile.setAttribute("id", "profile");
        button_profile.innerText = "Profile";
        let update_profile = document.createElement("button");
        update_profile.setAttribute("class", "button button-secondary");
        update_profile.setAttribute("id", "update_profile");
        update_profile.innerText = "Update Profile";
        let follow = document.createElement("button");
        follow.setAttribute("class", "button button-secondary");
        follow.setAttribute("id", "follow");
        follow.innerText = "Follow";
        let unfollow = document.createElement("button");
        unfollow.setAttribute("class", "button button-secondary");
        unfollow.setAttribute("id", "unfollow");
        unfollow.innerText = "Unfollow";
        let seeposts = document.createElement("button");
        seeposts.setAttribute("class", "button button-secondary");
        seeposts.setAttribute("id", "seeposts");
        seeposts.innerText = "Public Post";
        header.appendChild(seeposts);
        header.appendChild(follow);
        header.appendChild(unfollow);
        header.appendChild(update_profile);
        header.appendChild(button_profile);
        let user_id = localStorage.getItem('username');
        
        //when user log in, he could see his feed
        see_feed();


    }
    else {
        //if no user log in, see the public
        let path_public = 'http://localhost:5000/post/public';
        let feed = document.getElementById("feed");
        let div_feed = document.getElementById("div_feed");
        div_feed.style.display = "";
        let div_post = document.getElementById("div_post");
        div_post.style.display = "none";
        fetch(path_public)
            .then(response => response.json())
            .then(texts => {
                for (let text of texts["posts"]){
                    let li = document.createElement("li");
                    li.setAttribute("class", "post");
                    li.setAttribute("data-id-post", "");


                    let div_2 = document.createElement("div");
                    div_2.setAttribute("class", "vote");
                    div_2.setAttribute("data-id-upvotes","");
                    div_2.innerText = text["meta"]["upvotes"].length;

                    let div_3 = document.createElement("div");
                    div_3.setAttribute("class", "content");

                    let h3 = document.createElement("h4");
                    h3.setAttribute("data-id-title","");
                    h3.setAttribute("class", "post-title alt-text");
                    h3.innerText = text["title"];

                    let h4 = document.createElement("h4");
                    h4.setAttribute("data-id-post","");
                    h4.setAttribute("class", "post-title alt-text");
                    h4.innerText = text["text"];

                    let p = document.createElement("p");
                    p.setAttribute("class", "post-author");
                    p.setAttribute("data-id-author", "");
                    p.innerText = "Posted by "+ text["meta"]["author"];

                    let p_1 = document.createElement("p");
                    p_1.setAttribute("class", "post-author");
                    p_1.innerText = "Posted at "+ timeConvert(text["meta"]["published"]);

                    let p_2 = document.createElement("p");
                    p_2.setAttribute("class", "post-author");
                    p_2.setAttribute("id", "comment"+text["id"]);
                    p_2.innerText = text["comments"].length+" Comments";

                    let p_3 = document.createElement("p");
                    p_3.setAttribute("class", "post-author");
                    p_3.innerText = "Posted to "+text["meta"]["subseddit"];

                    let image = document.createElement("img");
                    if (text["image"]){
                        image.setAttribute("src",'data:image/png;base64,' + text["image"])
                    }
                    
                    
                    
                    div_3.appendChild(h3);
                    div_3.appendChild(h4);
                    div_3.appendChild(p);
                    div_3.appendChild(p_1);
                    div_3.appendChild(p_2);
                    div_3.appendChild(p_3);
                    div_3.appendChild(image);

                    li.appendChild(div_2);
                    li.appendChild(div_3);
                    div_feed.appendChild(li);
                    feed.appendChild(div_feed);
                    
                }
            } )

    }
}


//convert unix time to AU time
function timeConvert(rawTime){
    const unixTime = new Date(rawTime * 1000);
    return unixTime.toLocaleString('en-AU');
}


//run the homepage


homepage();






//create the profile interface for user
function profile(){
    let path_user = 'http://localhost:5000/user';

    let feed = document.getElementById("feed");
    let token = localStorage.getItem('token');
    let div = document.getElementById("div_profile");
    div.style.display = "";
    let div_post = document.getElementById("div_post")
    div_post.style.display = "none";
    let div_feed = document.getElementById("div_feed");
    div_feed.style.display = "none";
    if (div.firstChild){
        let item = div.firstChild;
        div.removeChild(item);
    }
    fetch(path_user, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
    .then((res) => res.json())
    .then((json) => {
        let username = json["username"];
        let name = json["name"];
        let email = json["email"];
        let num_of_post = json["posts"].length;
        let num_of_following = json["following"].length;
        let num_of_followed = json["followed_num"];
        let div1 = document.createElement("div");
        let h = document.createElement("h4");
        h.setAttribute("class", "post-title alt-text");
        h.innerText = "username: " +username;

        let h3 = document.createElement("h4");
        h3.setAttribute("class", "post-title alt-text");
        h3.setAttribute("id", "profile_name")
        h3.innerText = "name: " + name;


        let h4 = document.createElement("h4");
        h4.setAttribute("class", "post-title alt-text");
        h4.innerText = "email: " + email;

        let h1 = document.createElement("h4");
        h1.setAttribute("class", "post-title alt-text");
        h1.innerText = "number of posts: " +num_of_post;
        let h2 = document.createElement("h4");
        h2.setAttribute("class", "post-title alt-text");
        h2.innerText = "number of following: " +num_of_following;

        let h5 = document.createElement("h4");
        h5.setAttribute("class", "post-title alt-text");
        h5.innerText = "number of followed: " +num_of_followed;

        div1.appendChild(h);
        div1.appendChild(h3);
        div1.appendChild(h4);
        div1.appendChild(h1);
        div1.appendChild(h2);
        div1.appendChild(h5);
        div.appendChild(div1);
        feed.appendChild(div);

    })



}



//if user wnant to update their own profile

function update_profile(){
    let path_user = 'http://localhost:5000/user';

    let token = localStorage.getItem('token');
    

    let div = document.getElementById("root");
    let div_1 = document.createElement("div");
    div_1.setAttribute("class", "popup");

    div_1.setAttribute("id", "popup_submit");
    let div_2 = document.createElement("div");
    div_2.setAttribute("class","popup-content");

    let input_1 = document.createElement("input");
    input_1.setAttribute("id", "new_email")
    input_1.setAttribute("type", "text");
    input_1.setAttribute("placeholder", "New Email");
   
    let input_2 = document.createElement("input");
    input_2.setAttribute("id", "new_name")
    input_2.setAttribute("type", "text");
    input_2.setAttribute("placeholder", "New Name");

    let input_3 = document.createElement("input");
    input_3.setAttribute("id", "new_password")
    input_3.setAttribute("type", "password");
    input_3.setAttribute("placeholder", "New Password");
    

    
    
    let submit = document.createElement("button");
    submit.setAttribute("id", "submit")
    submit.setAttribute("class", "button button-secondary");
    submit.innerText = "Submit";
    let close = document.createElement("button");
    close.setAttribute("class", "close");
    close.setAttribute("id","close_submit")
    close.innerText = "close";
    
    
    
    div_2.appendChild(input_1);
    div_2.appendChild(input_2);
    div_2.appendChild(input_3);
    div_2.appendChild(submit);
    div_2.appendChild(close);
    div_1.append(div_2);
    div.appendChild(div_1);


    let submit_button_1 = document.getElementById("submit");
    
    submit_button_1.onclick = function(){
        event.preventDefault();

        fetch(path_user, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
        .then((res) => res.json())
        .then((json) => {


            let old_name = json["name"];
            let old_email = json["email"];
        
            
            let new_email = document.getElementById("new_email").value;
    
            let new_name = document.getElementById("new_name").value;
            let new_password = document.getElementById("new_password").value;
            let email;
            let name;
            let user;
            if (email == "" && name == "" && password == ""){
                window.alert("Please fill in at least one part");
            }
            
            else {
                if (new_email == ""){
                    email = old_email;
                } else {
                    email = new_email;
                }
                if (new_name == ""){
                    name = old_name;
                } else {
                    name = new_name;
                }
                if (new_password == ""){
                    user = {
                        "email" : email,
                        "name" : name
                        
                    }
                } else {
                    user = {
                        "email" : email,
                        "name" : name, 
                        "password" : new_password
                    }

                }
             


                fetch(path_user,{
                    method: 'PUT',
                    body: JSON.stringify(user),
                    headers: new Headers({
                        'Authorization': 'Token ' + token,
                        'Content-Type': 'application/json'
                    })
                    

                }).then(response => response.json()

                ).then(res => {
                    if (res["message"] == "Malformed user object"){

                        window.alert("Malformed user object");
                    }
                    else if (res["message"] == "Invalid Authorization Token"){
                        window.alert("Invalid Authorization Token");
                    }
                    else{
                        window.alert("Reset successfully");
                        
                        location.reload();
                        
                    }
                    
                    
                    
                    
                })
            }
        })
    }
    
   
    let close_1 = document.getElementById("close_submit");
    if (close_1) {
        close_1.addEventListener("click", function(){
        
            
            if (div_1){
            div.removeChild(div_1);
            }
        })
    }



}


/////////////////
//Infinite Scroll
/////////////////



//infinite scroll for public post
function infinite_scroll_post() {
    window.onscroll = function () {
        let scrolled_down_height, document_height;
        scrolled_down_height = document.body.scrollHeight;
        document_height = window.scrollY + window.innerHeight;
        if (document_height >= scrolled_down_height - 3) {
            see_posts();
        }
    }
};


//infinite scroll for user feed
function infinite_scroll_feed() {
    window.onscroll = function () {
        let scrolled_down_height, document_height;
        scrolled_down_height = document.body.scrollHeight;
        document_height = window.scrollY + window.innerHeight;
        if (document_height >= scrolled_down_height - 3) {
            see_feed();
        }
    }
};


if (document.getElementById("div_feed").style.display == "none"){
    infinite_scroll_post();
}
if (document.getElementById("div_post").style.display == "none"){
    infinite_scroll_feed();
}





//////////////////////
//CLICK BUTTON FUNCTION
///////////////////////

//the button for see profile
let profile_button = document.getElementById("profile");
profile_button.addEventListener("click", profile);


//the button for update profile
let submit_button = document.getElementById("update_profile");
submit_button.addEventListener("click", update_profile);


//the button for see the public post
let seeposts = document.getElementById("seeposts");
seeposts.addEventListener("click", see_posts);


//get the button for the show user page
document.addEventListener('click', function(event){
    if (event.target.matches('[id^=userpage]')){
        show_userpage(event.target.id.replace('userpage', ''));
    }
})

//the button for add comment
document.addEventListener('click', function(event){
    if (event.target.matches('[id^=addcomment]')){
        add_comment(event.target.id.replace('addcomment', ''));
    }
})


//the button for cancel upvote
document.addEventListener('click', function(event){
    if (event.target.matches('[id^=cancelupvote]')){
        cancel_upvote(event.target.id.replace('cancelupvote', ''));
    }
})



// the button for see upvote
document.addEventListener('click', function(event){

    if (event.target.matches('[id^=upvote]')){
        show_upvotes(event.target.id.replace('upvote', ''));
    }
})


//the button for see the comment
document.addEventListener('click', function(event){
    if (event.target.matches('[id^=comment]')){
        show_comments(event.target.id.replace('comment', ''));
    }
})


//the button for upvote the post
document.addEventListener('click', function(event){
    if (event.target.matches('[id^=upvotethis]')){
        upvote_this(event.target.id.replace('upvotethis', ''));
    }
})

//the button for follow the user
document.addEventListener('click', function(event){
    if (event.target.matches('[id^=followuser]')){
        follow_user(event.target.id.replace('followuser', ''));
    }
})

//the button for unfollow the user
document.addEventListener('click', function(event){
    if (event.target.matches('[id^=unfollowuser]')){
        unfollow_user(event.target.id.replace('unfollowuser', ''));
    }
})




////////////////////////////////////

//UPVOTE PART
//////////////////////////


//if the user want to cancel his upvote
function cancel_upvote(id){
    let token = localStorage.getItem('token');
    let path_post_vote = 'http://localhost:5000/post/vote?id=' + id;
    let user = fetch(path_post_vote,{
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: new Headers({
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        })
    }).then(response => response.json()
    ).then(res => {
    })

    let path_post = 'http://localhost:5000/post/?id=' + id;
    let update_upvote = fetch(path_post,{
        method: 'GET',
        body: JSON.stringify(undefined),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        })
    }).then(update_upvote => {
        document.getElementById("number_of_upvotes" + id).innerText = update_upvote.meta.upvotes.length;

    })
}



//if the user want to upvote this post
function upvote_this(id){
    let token = localStorage.getItem('token');
    let path_post_vote = 'http://localhost:5000/post/vote?id=' + id;
    let user = fetch(path_post_vote,{
        method: 'PUT',
        body: JSON.stringify(id),
        headers: new Headers({
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        })
    }).then(response => response.json()
    ).then(res => {
    })

    let path_post = 'http://localhost:5000/post/?id=' + id;
    let update_upvote = fetch(path_post,{
        method: 'GET',
        body: JSON.stringify(undefined),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        })
    }).then(update_upvote => {
        document.getElementById("number_of_upvotes" + id).innerText = update_upvote.meta.upvotes.length;

    })
}



//the user want to see the id of user who upvote this post
function show_upvotes(id){
    let token = localStorage.getItem('token');
    let div = document.getElementById("root");
    let path_feed = 'http://localhost:5000/user/feed';
    fetch(path_feed, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
        .then(response => response.json())
        .then(texts => {
            
            for (let text of texts["posts"]){
                if (text["id"] == id){
                    let div_1 = document.createElement("div");
                    div_1.setAttribute("class", "popup");
                    div_1.setAttribute("id", "popup_upvotes");
                    let div_2 = document.createElement("div");
                    div_2.setAttribute("class","popup-content");
                    let upvote_text = document.createElement("p");
     
                    upvote_text.setAttribute("class","post-title-1 alt-text");
                    upvote_text.innerText = text["meta"]["upvotes"];

                    let close = document.createElement("button");
                  
                    close.setAttribute("class", "close");
                    close.setAttribute("id","close_upvote")
               
                    close.innerText = "close";
                    div_2.appendChild(upvote_text);
                    div_2.appendChild(close);
                    div_1.appendChild(div_2);
                    div.appendChild(div_1);

                    let close_upvote_1 = document.getElementById("close_upvote");

                    if (close_upvote_1){
                        close_upvote_1.onclick = function(){
                         
                            let div_0 = document.getElementById("popup_upvotes");
                            if (div_0){
                                div.removeChild(div_0);
                            }
                        }  
                    }
                }
            }
        })

            

    
}


//the user want to see the comment for this post
function show_comments(id){
    let div = document.getElementById("root");
    let token = localStorage.getItem('token');
    let path_feed = 'http://localhost:5000/user/feed';
    fetch(path_feed, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
        .then(response => response.json())
        .then(texts => {
            
            for (let text of texts["posts"]){
                if (text["id"] == id){
                    let comments = text["comments"];
                    let div_1 = document.createElement("div");
                    div_1.setAttribute("class", "popup");
                    div_1.setAttribute("id", "popup_comments");
                    let div_2 = document.createElement("div");
                    div_2.setAttribute("class","popup-comment");
                    if (comments){
                        for (let comment of comments) {
                            let div_3 = document.createElement("div");

                            let comment_comment = document.createElement("p");
                            comment_comment.setAttribute("class","post-title-1 alt-text");
                            comment_comment.innerText = comment["comment"];
                            let comment_author = document.createElement("p");
                            comment_author.setAttribute("class","post-author");
                            comment_author.innerText = "Posted by "+comment["author"];
                            let comment_time = document.createElement("p");
                            comment_time.setAttribute("class","post-author");
                            comment_time.innerText = "Posted at "+ timeConvert(comment["published"]);
                            div_3.appendChild(comment_comment);
                            div_3.appendChild(comment_author);
                            div_3.appendChild(comment_time);
                            div_2.appendChild(div_3)
                        }
                    }

                    let close = document.createElement("button");
                  
                    close.setAttribute("class", "close");
                    close.setAttribute("id","close_comment")
               
                    close.innerText = "close";

                    div_2.appendChild(close);
                    div_1.appendChild(div_2);
                    div.appendChild(div_1);

                    let close_comment_1 = document.getElementById("close_comment");

                    if (close_comment_1){
                        close_comment_1.onclick = function(){
                         
                            let div_0 = document.getElementById("popup_comments");
                            if (div_0){
                                div.removeChild(div_0);
                            }
                        }  
                    }
                }


            }

    })
}


//the user want to see the user page for another user 
function show_userpage(author){
    let token = localStorage.getItem('token');
    let path_user = 'http://localhost:5000/user?username=' + author;
    
    fetch(path_user, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
    .then((res) => res.json())
    .then((json) => {
        if (json["username"] == author){
            let div = document.getElementById("root");

            let div_2 = document.createElement("div");
            div_2.setAttribute("class", "popup");
            div_2.setAttribute("id", "popup_userpage");

            let div_3 = document.createElement("div");
            div_3.setAttribute("class","popup-content");

            let follow_button = document.createElement("button");
            follow_button.setAttribute("class", "button button-secondary");
            follow_button.setAttribute("id", "followuser"+ author);
            follow_button.innerText = "Follow";

            let unfollow_button = document.createElement("button");
            unfollow_button.setAttribute("class", "button button-secondary");
            unfollow_button.setAttribute("id", "unfollowuser"+author);
            unfollow_button.innerText = "Unfollow";
            let username = json["username"];
            let name = json["name"];
            let email = json["email"];
            let num_of_post = json["posts"].length;
            let num_of_following = json["following"].length;
            let num_of_followed = json["followed_num"];
            let div1 = document.createElement("div");
            let h = document.createElement("h4");
            h.setAttribute("class", "post-title alt-text");
            h.innerText = "username: " +username;
            let h3 = document.createElement("h4");
            h3.setAttribute("class", "post-title alt-text");
            h3.setAttribute("id", "profile_name")
            h3.innerText = "name: " + name;
    
    
            let h4 = document.createElement("h4");
            h4.setAttribute("class", "post-title alt-text");
            h4.innerText = "email: " + email;
    
            let h1 = document.createElement("h4");
            h1.setAttribute("class", "post-title alt-text");
            h1.innerText = "number of posts: " +num_of_post;
            let h2 = document.createElement("h4");
            h2.setAttribute("class", "post-title alt-text");
            h2.innerText = "number of follwing: " +num_of_following;

            let h5 = document.createElement("h4");
            h5.setAttribute("class", "post-title alt-text");
            h5.innerText = "number of follwed: " +num_of_followed;

            let close = document.createElement("button");
            close.setAttribute("class", "close");
            close.setAttribute("id","close_userpage");
            close.innerText = "close";

            div1.appendChild(h);
            div1.appendChild(h3);
            div1.appendChild(h4);
            div1.appendChild(h1);
            div1.appendChild(h2);
            div1.appendChild(h5);



            div_3.appendChild(div1);
            div_3.appendChild(close);
            div_3.appendChild(follow_button);
            div_3.appendChild(unfollow_button);
            div_2.appendChild(div_3);
            div.appendChild(div_2);


            let close_1 = document.getElementById("close_userpage");
            if (close_1) {
                close_1.addEventListener("click", function(){
            
                    if (div_2){
                        div.removeChild(div_2);
                    }
                })
            }
        }
         
    })
    
}
        

    
    

    
    

//the user want to add comment for the post
function add_comment(id){
    let token = localStorage.getItem('token');
    let div = document.getElementById("root");
    let path_comment = 'http://localhost:5000/post/comment?id=' + id;
    let div_1 = document.createElement("div");
    div_1.setAttribute("class", "popup");

    div_1.setAttribute("id", "popup_addcomment");
    let div_2 = document.createElement("div");
    div_2.setAttribute("class","popup-content");

    let input_1 = document.createElement("input");
    input_1.setAttribute("id", "input_comment")
    input_1.setAttribute("type", "text");
    input_1.setAttribute("placeholder", "Please input comment");
    
    let submit = document.createElement("button");

    submit.setAttribute("id", "submit_comment")
    submit.setAttribute("class", "button button-secondary");
    submit.innerText = "Submit";
    let close = document.createElement("button");

    close.setAttribute("class", "close");
    close.setAttribute("id","close_addcomment")

    close.innerText = "close";
    
    
    
    div_2.appendChild(input_1);
    div_2.appendChild(submit);
    div_2.appendChild(close);
    div_1.append(div_2);
    div.appendChild(div_1);
    let submit_button_1 = document.getElementById("submit_comment");
    submit_button_1.onclick = function(){
        var d = new Date();
        let comment = document.getElementById("input_comment").value;
        if (comment == ""){
            window.alert("Please input Comment");

        }
        let author = localStorage.getItem("username")

    
        let payload = {
            "comment" : comment,
            "author": author,
            "published" : d.getTime()
            
        }
        console.log(payload);

        fetch(path_comment,{
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json'
            })
            

        }).then(response => response.json()

        ).then(res => {

            if (res["message"] == "Malformed Request"){

            

                window.alert("Malformed Request");
            }
            else if (res["message"] == "Invalid Auth Token"){
                window.alert("Invalid Auth Token");
            }
            else{
                window.alert("Comment successfully");

                location.reload();
                
            }
                
                    
                    
                   
                
            
        })
    }
    
    let close_1 = document.getElementById("close_addcomment");
    if (close_1) {

        close_1.addEventListener("click", function(){
            
            if (div_1){
            div.removeChild(div_1);
            }
        })
    }
}


//the user want tp follow another user
function follow_user(author){
    let token = localStorage.getItem('token');
    let path_unfollow = 'http://localhost:5000/user/follow?username=' + author;
    
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Token ' + token
        }
    }


    fetch(path_unfollow, options)
        .then(response => response.json())
        .then(res => {
            if (res['message'] == "Malformed Request"){
                window.alert("Malformed Request")
            }
            if (res['message'] == "Invalid Auth Token"){
                window.alert("Invalid Auth Token")
            }else{
                window.alert("Follow Successfully")
            }
        })
}



//the user want to unfollow another user
function unfollow_user(author){
    let token = localStorage.getItem('token');
    let path_unfollow = 'http://localhost:5000/user/unfollow?username=' + author;
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Token ' + token
        }
    }


    fetch(path_unfollow, options)
        .then(response => response.json())
        .then(res => {
            if (res['message'] == "Malformed Request"){
                window.alert("Malformed Request")
            }
            if (res['message'] == "Invalid Auth Token"){
                window.alert("Invalid Auth Token")
            }
            else{
                window.alert("Unfollow Successfully")
            }
        })
}