/**
 * Definition of the variables 
 */
let photos = document.querySelector('#photos')
let people = document.querySelector('#people')
let person = document.querySelector('#person')
let header = document.querySelector('#navOptions')
let returnButton = document.querySelector('#returnButton')
const API = 'https://randomuser.me/api/?results=50';
let results={};
let countApiCall=0;


/**
 * API call 
 * 
 */
function queryAPI () {
    fetch(API).then((value) =>{        
        return value.json();
    }).then((value) => { 
        countApiCall++;    
        results = prepData(value.results,countApiCall); 
        createPhoto(results,countApiCall); 
    }).catch(err => {
        console.log(err)
    })    
}

/**
 * Initialize the view 
 */
queryAPI()


/**
 * Prepare the data to have all the calls to the API in a single object
 * 
 * @param {Input with the users array with all data} user
 * @param {Number of calls performed to the API} numCall
 */
function prepData(data, numCall= 0) { 
    let cont=0;
    for (let index = numCall*50-50; index < Object.keys(data).length + numCall*50-50; index++) {
        // results = {...results,...data[index]};  
        results[index] = data[cont];
        console.log(`Insertion:${index} == ${data[cont]}`);
        cont++;
    }
    return results
}


/**
 * Creates the new photos on the DOM when the API is called
 * 
 * @param {Input with the users array with all data} user
 * @param {Number of calls performed to the API} numCall
 */
function createPhoto(data, numCall= 0) {   

    for (let index = numCall*50-50; index < Object.keys(data).length + numCall*50-50; index++) {        
               
        // new DOM elements         
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
        header.appendChild(clickImage)             
    }

}


/**
 * Add the EventListener for the events that are going to be detected
 */
photos.addEventListener('click', selectImage, false);
returnButton.addEventListener('click',redirectHome, false )

/**
 * Event to display an specific person
 * 
 * @param {event to shows the specific data of an user} event
 */
function selectImage(event) {   
    //Certified that the click was performed on the image
    if (event.target !== event.currentTarget) {         
        people.style.display= "none";
        person.style.display= "block";

        let imgSelected = document.querySelector('#imgSelected')        
        let name = document.querySelector('#name')
        let email = document.querySelector('#email')
        let gender = document.querySelector('#gender')
        let phone = document.querySelector('#phone')
        let cell = document.querySelector('#cell')
        
        //Get the data of the target photo
        let index = event.target.getAttribute('id');        
        imgSelected.src = results[index].picture.large

        name.innerHTML = `Name: ${results[index].name.first}` 
        email.innerHTML = `Email: ${results[index].email}`
        gender.innerHTML = `Gender: ${results[index].gender}`      
        phone.innerHTML = `Phone: ${results[index].phone}`   
        cell.innerHTML = `Cell: ${results[index].cell}`   

    } event.stopPropagation();
}


/**
 * Event to change the display view
 * 
 * @param {event to redirect to home view} event
 */
function redirectHome(event){
    people.style.display= "block";
    person.style.display= "none";
}


/**
 * Infinitive scroll
 * 
 */
window.onscroll = function() {    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {            
        queryAPI()
    }
};  