
// data = {
//     id:5,
//     name:"yeny"
// }

// fetch("https://randomuser.me/api/",{
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//         "Content-Type": "application/json",
//         // "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
// }).then((value) =>{
//     return value.json();
// }).then((value) => {
//     return value.results[0]
// }).then((value) => {
//     let nombre = document.getElementById("nombre");
//     nombre.innerHTML = value.name.title + " " + value.name.first + " " + value.name.last;
// })


let firebaseConfig = {
    apiKey: "AIzaSyAqU6EaHpwApqcHlkMBoZEPcesJwp4B-Sg",
    authDomain: "frontend-bootstrapping.firebaseapp.com",
    databaseURL: "https://frontend-bootstrapping.firebaseio.com",
    projectId: "frontend-bootstrapping",
    storageBucket: "frontend-bootstrapping.appspot.com",
};

firebase.initializeApp(firebaseConfig);

//Reference messages collections 
let messagesRef = firebase.database().ref("contact");


let about = document.getElementById("about");
let getAbout = document.getElementById("getAbout");
let resume = document.getElementById("resume");
let getResume = document.getElementById("getResume");
let blog = document.getElementById("interest")
let getInterest = document.getElementById("getInterest");
let contact = document.getElementById("contact");
let getContact = document.getElementById("getContact");

function remove() {
    about.classList.remove('view');
    getAbout.classList.remove('selected');
    resume.classList.remove('view');
    getResume.classList.remove('selected');
    blog.classList.remove('view');
    getInterest.classList.remove('selected');
    contact.classList.remove('view');
    getContact.classList.remove('selected');
}

getAbout.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove('about');
        about.classList.add('view');
        getAbout.classList.add('selected');
    }

});
getResume.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        resume.classList.add('view');
        getResume.classList.add('selected');
    }
})
getInterest.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        blog.classList.add('view');
        getInterest.classList.add('selected');
    }
})
getContact.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        contact.classList.add('view');
        getContact.classList.add('selected');
    }

})

var email = document.getElementById("email");
var form = document.getElementById("contactForm");
let contactButton = document.getElementById("contactButton")

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("An e-mail was expect");
  } else {
    email.setCustomValidity("");
  }
});


form.addEventListener("submit", formFunction);


function formFunction(event) {
    event.preventDefault();    
    let name = getInputValue("name");    
    let email = getInputValue("email");
    let message = getInputValue("message");    
    
    //save data in the db
    saveMessage(name, email, message);
    // display a message for three seconds 
    document.querySelector("#alert").style.display = "block";
    setTimeout(function(){
        document.querySelector("#alert").style.display = "none";
    },3000)

    //Detects when the DB has been updated 
    // firebase.firestore().collection("contact").add({name, email})
    // .then(r => {
    //     console.log(r);
    // });
}

function getInputValue(id){
    return document.getElementById(id).value;
}

//save the messages in firesabe 
function saveMessage(name, email, message){
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
        name:name,
        email:email,
        message,message
    })
};

let imagesContent = document.querySelector("#interest-content")
let imageModal = document.querySelector("#imageModal")
let modalClose = document.querySelector("#modalClose")

modalClose.addEventListener('click',closeImage)
imagesContent.addEventListener('click',selectImage )

function selectImage(event){
    if (event.target.localName === "img") {
        let imagePath = event.target.currentSrc
        imagePath = `.${imagePath.substring(imagePath.indexOf("/img/"))}`
        imageModal.src = imagePath
        modal.classList.add("modalOn")              
    }     
}

function closeImage(){
    modal.classList.remove("modalOn")
}