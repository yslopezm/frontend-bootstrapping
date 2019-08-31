/**
 * Definition of the variables 
 */
let photos = document.querySelector('#photos')
let people = document.querySelector('#people')
let person = document.querySelector('#person')
let browser = document.querySelector('#users')
let returnButton = document.querySelector('#returnButton')

// let imagen = document.createElement('img')
// const offset = 10000;
const API = 'https://randomuser.me/api/?results=100';
let lengthUsers;
let results

/**
 * Query
 */
async function queryAPI () {
    await fetch(API).then((value) =>{
        return value.json();
    }).then((value) => {         
        lengthUsers = value.results.length;
        createPhoto(value.results);
        console.log(value)
        results = value.results;      
    }).catch(err => {
        console.log(err)
    })
    // .resolve('foo').then(() => {return Promise.resolve('bar')})
    
}

/**
 * Initialize the view 
 */
 
queryAPI()


/**
 * @param {Input with the users array with all data} user
 */
function createPhoto(data) {   

    for (let index = 0; index < lengthUsers; index++) {

        localStorage.setItem('datos', JSON.stringify(data[index]));
        
        // new DOM elements 
        let saved = localStorage.getItem('datos');
        let article = document.createElement('article')
        let nameImg = document.createElement('div')
        let imagen = document.createElement('img')
        let clickImage = document.createElement('a')

        // Data extraction
        let location = data[index].location.street
        let city = data[index].location.city
        let phone = data[index].phone

        // Image properties 
        nameImg.innerHTML = data[index].name.first       
        imagen.src = data[index].picture.large
        imagen.alt = data[index].name.first
        imagen.className = data[index].name.first
        clickImage.href = data[index].picture.large
        clickImage.id = data[index].name.first

        // DOM structure
        imagen.id = index;
        article.appendChild(imagen)
        article.appendChild(nameImg)        
        photos.appendChild(article)
        browser.appendChild(clickImage)
    }

}



/**
 * EventListener
 */
photos.addEventListener('click', selectImage, false);
returnButton.addEventListener('click',redirectHome, false )


function selectImage(event) {   
    //Certified that the click was performed on the image
    if (event.target !== event.currentTarget) { 
        console.log(event.target)
        people.style.display= "none";
        person.style.display= "block";

        let imgSelected = document.querySelector('#imgSelected')        
        let name = document.querySelector('#name')
        let email = document.querySelector('#email')
        let gender = document.querySelector('#gender')
        
        //Get the data of the target photo
        let index = event.target.getAttribute('id');
        console.log(results[index])
        imgSelected.src = results[index].picture.large

        name.innerHTML = results[index].name.first
        email.innerHTML = results[index].email
        gender.innerHTML = results[index].gender
        // history.pushState(results[index],'detail','character.html');
    } event.stopPropagation();
}


function redirectHome(event){
    people.style.display= "block";
    person.style.display= "none";

}




/**
 * Infinitive scroll
 */
// $(window).scroll(function (user) {
//     if ($(window).scrollTop() + $(window).height() == $(document).height()) { }
//     queryAPI()
// });     