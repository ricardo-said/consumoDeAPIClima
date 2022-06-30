const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener('load', ()=> {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();
    // validar el formulario

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '' ) {
        mostrarError('Los campos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais);
    
    // mandar a llamar a la api

    
}

function mostrarError(mensaje){


    const alerta = document.querySelector('.bg-red-100')

    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md',
            'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML =
            `<strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>`;
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 4000);
    }


  
}

function consultarAPI(ciudad, pais){
    const appId = 'd10203d36f9da0a6d8b0be4bafd54b72';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url);
    
    
    spinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
            limpiarHTML();
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada');
                return;
            }
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    const{name, main: {temp, temp_max,temp_min}}=datos;
    let centigrados = gradosCentigrados(temp);
    let max = gradosCentigrados(temp_max);
    let min = gradosCentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML= `Clima en: ${name} `;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML= `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl')

    const temperaturaMax = document.createElement('p');
    temperaturaMax.innerHTML=`Max: ${max} &#8451 `;
    temperaturaMax.classList.add('text-xl');

    const temperaturaMin = document.createElement('p');
    temperaturaMin.innerHTML=`Min: ${min} &#8451 `;
    temperaturaMin.classList.add('text-xl');

    

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temperaturaMax);
    resultadoDiv.appendChild(temperaturaMin);

    resultado.appendChild(resultadoDiv);
    
}
function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function gradosCentigrados(temp){
    const grados =Math.round(temp - 273.15);
    return grados;
}

function spinner(){
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML=   `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>`

    resultado.appendChild(divSpinner);
  
}