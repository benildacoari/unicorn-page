
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
        const {name, power, image, age, _id} = unicornio;

        const contenedor = document.createElement('div');
        
        contenedor.classList.add('card');
        
        const divImagen = `<div > 
        <img src=${image} class="imagenStyle"></img>
        </div>
        <div class="detalleU">
            <div class="palabras">
                <span class="descripcion">Nombre: </span><span>${name}</span>
            </div>
            <div class="palabras">
                <span class="descripcion">Poder: </span><span>${power}</span>
            </div>
            <div class="palabras">
                <span class="descripcion">Edad: </span><span>${age}</span>
            </div>
            <div class="palabras">
                <button class="boton2" type="button" onclick="obtenerUnUnicornio('${_id}')">Actualizar</button>
            </div>
            <div class="palabras">
                <button class="boton2" type="button" onclick="eliminarUnicornio('${_id}')">Eliminar</button>
            </div>
        </div>
        `
        contenedor.innerHTML = divImagen;
       
        contenedorUnicornios.appendChild(contenedor);
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
    if(!confirm("¿Estas seguro de eliminar el unicornio?")) 
        return; 
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



