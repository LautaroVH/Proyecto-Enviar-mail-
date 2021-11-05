//variables
const enviarBtn = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//event listeners}
eventListeners();
function eventListeners(){
    //cuando arranca la app
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);
    //reiniciar el formulario
    btnReset.addEventListener('submit', resetearFormulario);
    // Enviar email
    formulario.addEventListener("submit", enviarEmail);
}


//funciones

function iniciarApp() {
    enviarBtn.disabled = true
    // resetBtn.disabled = true
    enviarBtn.classList.add("cursor-not-allowed", "opacity-50"); // me fijo en elements su "class" (caracteristicas, y las edito desde aca)
    // resetBtn.classList.add("cursor-not-allowed", "opacity-50");
}

//valida el formulario

function validarFormulario(e) {

    // console.log(e.target.type); //muestra los tipos en consola

    if (e.target.value.length > 0 ) {

        //elimina los errores
        const error = document.querySelector("p.error");
        if (error) {
            error.remove();
        }
        e.target.classList.remove("border", "border-red-500"); //descolorea todos los bordes del form particular.
        e.target.classList.add("border", "border-green-500"); //colorea todos los bordes del form particular.
    // } else {
    //     // e.target.style.borderBottomColor = "red"; // color red la base d abajo
    //     e.target.classList.add ("error")
    //     }
    }else{
        e.target.classList.remove("border", "border-green-500") //descolorea todos los bordes del form particular.
        e.target.classList.add("border", "border-red-500") //colorea todos los bordes del form particular.
        mostrarError( "Todos los campos son obligatorios");
    }
    if (e.target.type === "email") {
        
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const resultado = e.target.value.indexOf("@");  // validar un mail.. solo si tiene "@"
        if(er.test(e.target.value) ) {
            const error = document.querySelector("p.error");
            if (error) {
                error.remove();
            }
    
            e.target.classList.remove("border", "border-red-500") //descolorea todos los bordes del form particular.
            e.target.classList.add("border", "border-green-500") //colorea todos los bordes del form particular.
    
        } else {
            e.target.classList.remove("border", "border-green-500") //descolorea todos los bordes del form particular.
            e.target.classList.add("border", "border-red-500") //colorea todos los bordes del form particular.
            mostrarError( "email no valido");
        }
    }
    if(er.test(email.value) && asunto.value !== "" && mensaje !== "") {
        enviarBtn.disabled = false;
        enviarBtn.classList.remove("cursor-not-allowed", "opacity-50"); // me fijo en elements su "class" (caracteristicas, y las edito desde aca)
        }
}

    function mostrarError(mensaje) {
        const mensajeError = document.createElement ("p");  // p = crear parrafor
        mensajeError.textContent = mensaje;
        mensajeError.classList.add("border", "border-red-500", "backgound-color-100", "text-red-500", "p-3", "mt-5", "text-center", "error");

        const errores = document.querySelectorAll (".error");
        if (errores.length === 0){          // solo un mensaje de error
        formulario.appendChild(mensajeError); //se muestra abajo
            // formulario.insertBefore(mensajeError, document.querySelector(".mb-10")); //mb-10 es un div, lo buscas en consola
        }
    } 

    //enviar mail
    function enviarEmail(e) {
        e.preventDefault();
    //mostrar spinner
    const spinner = document.querySelector("#spinner")        ;
    spinner.style.display = "flex";
    // despues de 3 segundos ocultar el spinner y mostrar el mensaje enviado
    setTimeout(() => {      //interval es cada 3 seg
        spinner.style.display ="none";

        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envio correctamente";
        parrafo.classList.add("text-center", "my-10", "p-2", "bg-green-500", "text-white", "uppercase");
        //insertar el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove ();// eliminar el mensaje de exito
            resetearFormulario();
        },5000  );
    }, 3000 );
    }

    //funcion que resetea el formulario
    function resetearFormulario () {
        preventDefault();
        formulario.reset();
        iniciarApp();
    }

    //no funciona el reset .. cambio el index, submit por button, sigue sin andar