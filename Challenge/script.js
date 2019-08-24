var photos=document.querySelector('.Contenedor')
var navegador=document.querySelector('#Usuarios')
let resultados;

const arrayDatos = fetch('https://randomuser.me/api/?results=13').then(res => res.json())
arrayDatos.then((user) => {
    crearfoto(user)
})


const offset = 10000;
$(window).scroll(function(user) {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
  
  
}       
    fetch('https://randomuser.me/api?results=13')
    .then(function(res){
            return res.json()
     })
    .then(function(user) {
    crearfoto(user);
    })       

});


    function crearfoto(user){
        resultados=user.results;

        for (var index = 0; index < 13; index++) {  
            
            var miObjeto=user.results[index]                  
            localStorage.setItem('datos', JSON.stringify(miObjeto));
            var guardado = localStorage.getItem('datos');                
            var article1= document.createElement('article')
                            
            var nameImg=document.createElement('div')
            var imagen= document.createElement('img')

            var clickImage=document.createElement('a')

            article1.appendChild(imagen)
            article1.appendChild(nameImg)

            nameImg.innerHTML= user.results[index].name.first
            

            imagen.src=user.results[index].picture.large
            imagen.alt=user.results[index].name.first
            imagen.className=user.results[index].name.first
            clickImage.href=user.results[index].picture.large
            clickImage.id=user.results[index].name.first

            var location=user.results[index].location.street 
            var city=user.results[index].location.city 
            var phone=user.results[index].phone

            imagen.id=index;
            
            navegador.appendChild(clickImage)
            
            photos.appendChild(article1)
            

        }   
            
    }




var theParent = document.querySelector('.Contenedor');
theParent.addEventListener('click',doSomething,false);
function doSomething (e){
    
    if (e.target !== e.currentTarget){
    
        alert('Hello');
        var data = e.target.getAttribute('id'),
        url = data;          
    //    history.pushState(resultados[data],'detail','personaje.html');

    }  e.stopPropagation();   
}