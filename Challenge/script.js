/**
 * Definition of the variables 
 */
let photos = document.querySelector('#photos')
let browser = document.querySelector('#users')
// let imagen = document.createElement('img')
// const offset = 10000;
const API = 'https://randomuser.me/api/?results=100';
let lengthUsers;

/**
 * Query
 */
function queryAPI () {
    fetch(API).then((value) =>{
        return value.json();
    }).then((value) => {         
        lengthUsers = value.results.length;
        createPhoto(value);
        return value.results;
    })
}

/**
 * @param {Input with the users array with all data} user
 */

function createPhoto(user) {   

    for (let index = 0; index < lengthUsers; index++) {

        localStorage.setItem('datos', JSON.stringify(user.results[index]));
        
        // new DOM elements 
        let saved = localStorage.getItem('datos');
        let article = document.createElement('article')
        let nameImg = document.createElement('div')
        let imagen = document.createElement('img')
        let clickImage = document.createElement('a')

        // Data extraction
        let location = user.results[index].location.street
        let city = user.results[index].location.city
        let phone = user.results[index].phone

        // Image properties 
        nameImg.innerHTML = user.results[index].name.first       
        imagen.src = user.results[index].picture.large
        imagen.alt = user.results[index].name.first
        imagen.className = user.results[index].name.first
        clickImage.href = user.results[index].picture.large
        clickImage.id = user.results[index].name.first

        // DOM structure
        imagen.id = index;
        article.appendChild(imagen)
        article.appendChild(nameImg)        
        photos.appendChild(article)
        browser.appendChild(clickImage)
    }

}

// addEventListener
photos.addEventListener('click', selectImage, false);

async function selectImage(event) {
    //Certified that the click was performed on the image
    if (event.target !== event.currentTarget) { 
        console.log(event.target)
        // window.location.href= "./character.html"
        //Get the data of the target photo
        let index = event.target.getAttribute('id');
        history.pushState(results[index],'detail','character.html');
    } event.stopPropagation();
}

/**
 * Initialize the view 
 */
let results =queryAPI()


/**
 * Infinitive scroll
 */
// $(window).scroll(function (user) {
//     if ($(window).scrollTop() + $(window).height() == $(document).height()) { }
//     queryAPI()
// });     