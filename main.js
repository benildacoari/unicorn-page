
const contenedorUnicornios = document.querySelector('#contenedorUnicornios');
const nombre = document.querySelector('#nombre');
const poder = document.querySelector('#poder');
const foto = document.querySelector('#foto');
const edad = document.querySelector('#edad');
const boton = document.querySelector('#btn');

const nNombre = document.querySelector('#actualizarNombre');
const nPoder = document.querySelector('#actualizarPoder');
const nFoto = document.querySelector('#actualizarFoto');
const nEdad = document.querySelector('#actualizarEdad');

const nameUnicornio = document.querySelector('#nameUnicor');
const botonModificar = document.querySelector('#btnModificar');

////////////////////////////////////////---- OBTENER TODOS LOS UNICORNIOS --- /////////////////////////////////////////////

function verUnicornios(result){
    console.log(result);
    contenedorUnicornios.innerHTML = '';
    result.reverse();
    result.forEach(unicornio => {
        const {name, power, image, age} = unicornio;

        const contenedor = document.createElement('div');
        const pName = document.createElement('p');
        const pPower = document.createElement('p');
        const imagen = document.createElement('img');
        const pEdad = document.createElement('p');
        const botonActualizar = document.createElement('button');
        const botonEliminar = document.createElement('button');

        contenedor.classList.add('card');
        pName.classList.add('parrafos');
        pPower.classList.add('parrafos');
        pEdad.classList.add('parrafos');

        pName.innerHTML = name;
        pPower.innerHTML = power;
        imagen.src = image;
        pEdad.innerHTML = age;

        botonActualizar.innerHTML = "Modificar";
        botonActualizar.type = "button";
        botonActualizar.classList.add('btn-update');


        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.type = "button";
        botonEliminar.classList.add('btn-delete');

        contenedor.appendChild(imagen);
        contenedor.appendChild(pName);
        contenedor.appendChild(pPower);
        contenedor.appendChild(pEdad);
        contenedor.appendChild(botonActualizar);
        contenedor.appendChild(botonEliminar);

        contenedorUnicornios.appendChild(contenedor);

        botonActualizar.addEventListener("click", function(){
            obtenerUnUnicornio(unicornio._id);
        })

        botonEliminar.addEventListener("click", function(){
            if(confirm("¿Estas seguro de eliminar el unicornio?"))
                eliminarUnicornio(unicornio._id);
        })
    })
}

function obtenerUnicornios(){
    
    fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns")
        .then(function(result){
            return result.json();
        })
        .then((result) => {
            verUnicornios(result);
        })
        .catch(function(error){
            alert(error);
        })
}

obtenerUnicornios();

///////////////////////////////////////////--- OBTENER UN UNICORNIO ---- ///////////////////////////////////////////////////

let idGlobalModificar = '';

function obtenerUnUnicornio(id){
    function verResultados(result){
        nameUnicornio.innerHTML = result.name;
        idGlobalModificar = result._id;
        
    }

    const urlBase = "https://unicorns-api.herokuapp.com/api/v1/unicorns/";
    
    const urlConsultar = urlBase + id;

    fetch(urlConsultar)
        .then(function(result){
            // console.log(result);
            return result.json();
        })
        .then(verResultados)
        .catch(function(error){
            alert(error);
        })
}
// console.log(idGlobalModificar);
// obtenerUnUnicornio(id);

///////////////////////////////////////////--- CREAR UN UNICORNIO ---- ///////////////////////////////////////////////////


function crearUnicornio(){

    const inputNombre = nombre.value;
    const inputPoder = poder.value;
    const inputFoto = foto.value;
    const inputEdad = edad.value;

    if(inputNombre && inputPoder && inputFoto){
        function verResultados(result){
            limpiarInputs();
            obtenerUnicornios();
        }
    
        const config = {
            method: 'POST',
            body: JSON.stringify({ 
                name: inputNombre,
                power: inputPoder,
                age: inputEdad,
                image: inputFoto,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const urlConsultar = "https://unicorns-api.herokuapp.com/api/v1/unicorns/";
        
        fetch(urlConsultar, config)
            .then(function(result){
                return result.json();
            })
            .then(verResultados)
            .catch(function(error){
                alert(error);
            })
    }else{
        alert("Estos datos son obligatorios: Nombre, Poder y Foto")
    }

}

boton.addEventListener("click", crearUnicornio);

///////////////////////////////////////////--- LIMPIAR INPUTS ---- ///////////////////////////////////////////////////

function limpiarInputs() {
    nombre.value = '';
    poder.value = '';
    foto.value = '';
    edad.value = '';
    nNombre.value = '';
    nPoder.value = '';
    nFoto.value = '';
    nEdad.value = '';
    nameUnicornio.innerHTML = '';
  }

///////////////////////////////////////////--- MODIFICAR UN UNICORNIO ---- ///////////////////////////////////////////////////


function modificarUnicornio(){
    const nuevoNombre = nNombre.value;
    const nuevoPoder = nPoder.value;
    const nuevaFoto = nFoto.value;
    const nuevaEdad = nEdad.value;

    function resultadosModificados(result){
        limpiarInputs();
        alert("se modifico con exito");
        obtenerUnicornios();
    }
    const config = {
        method: 'PUT',
        body: JSON.stringify({ 
            name: nuevoNombre,
            power: nuevoPoder,
            age: nuevaEdad,
            image: nuevaFoto
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const urlBase = "https://unicorns-api.herokuapp.com/api/v1/unicorns/";
    
    const urlConsultar = urlBase + idGlobalModificar;
    
    fetch(urlConsultar, config)
        .then(function(result){
            return result.json();
        })
        .then(resultadosModificados)
        .catch(function(error){
            alert(error);
        })
}

// modificarUnicornio();
botonModificar.addEventListener("click", modificarUnicornio);

///////////////////////////////////////////--- ELIMINAR UN UNICORNIO ---- ///////////////////////////////////////////////////

function eliminarUnicornio(id){
    function verResultados(result){
        obtenerUnicornios();
    }

    const config = {
        method: 'DELETE',
    }

    const urlBase = "https://unicorns-api.herokuapp.com/api/v1/unicorns/";
    const urlConsultar = urlBase + id;
    
    fetch(urlConsultar, config)
        .then(function(result){
            return result.json();
        })
        .then(verResultados)
        .catch(function(error){
            alert(error);
        })
}



