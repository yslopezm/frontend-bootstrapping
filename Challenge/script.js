
 
/**
 * Definition of the variables 
 */
let photos = document.querySelector('.container')
let browser = document.querySelector('#users')
const offset = 10000;
const API = 'https://randomuser.me/api/?results=13';
let results;


/**
 * Query
 */
function queryAPI () {
    fetch(API).then((value) =>{   
        console.log(value)
        return value.json();
    }).then((value) => {
        console.log(value)
        createPhoto(value)
    })
}

/**
 * @param {Input with the users array with all data} user
 */
function createPhoto(user) {
    results = user.results;
    
    for (let index = 0; index < 13; index++) {
        console.log(user.results[index])        
        localStorage.setItem('datos', JSON.stringify(user.results[index]));
        let saved = localStorage.getItem('datos');
        let article1 = document.createElement('article')

        let nameImg = document.createElement('div')
        let imagen = document.createElement('img')

        let clickImage = document.createElement('a')

        article1.appendChild(imagen)
        article1.appendChild(nameImg)

        nameImg.innerHTML = user.results[index].name.first

        // Image properties
        imagen.src = user.results[index].picture.large
        imagen.alt = user.results[index].name.first
        imagen.className = user.results[index].name.first
        clickImage.href = user.results[index].picture.large
        clickImage.id = user.results[index].name.first

        let location = user.results[index].location.street
        let city = user.results[index].location.city
        let phone = user.results[index].phone

        imagen.id = index;

        browser.appendChild(clickImage)

        photos.appendChild(article1)

    }

}


let theParent = document.querySelector('.container');
theParent.addEventListener('click', doSomething, false);
function doSomething(e) {

    if (e.target !== e.currentTarget) {

        alert('Hello');
        let data = e.target.getAttribute('id'),
            url = data;
           history.pushState(results[data],'detail','personaje.html');

    } e.stopPropagation();
}

/**
 * Initialize the view 
 */
queryAPI()


/**
 * Infinitive scroll
 */
$(window).scroll(function (user) {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {

    }
        queryAPI()

});     