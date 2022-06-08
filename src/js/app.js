// Variables 
/**
 * Input con la cantidad de caracteres que tendrá la contraseña. 
 * @type {HTMLElement}
 */
const cantidadCaracteres = document.querySelector('#cantidadCaracteres');
/**
 * Botón para reducir un carácter. 
 * @type {HTMLElement}
 */
const btnMenosUno        = document.querySelector('#menosUno');
/**
 * Botón para aumentar un carácter. 
 * @type {HTMLElement}
 */
const btnMasUno          = document.querySelector('#masUno');
/**
 * Botón de configuración para que la contraseña contenga simbolos. 
 * @type {HTMLElement}
 */
const btnSimbolos        = document.querySelector('#simbolos');
/**
 * Botón de configuración para que la contraseña contenga números. 
 * @type {HTMLElement}
 */
const btnNumbers         = document.querySelector('#numbers');
/**
 * Botón de configuración para que la contraseña contenga mayúsculas. 
 * @type {HTMLElement}
 */
const btnUpperCase       = document.querySelector('#upperCase');
/**
 * Botón para generar la contraseña. 
 * @type {HTMLElement}
 */
const btnGenerar         = document.querySelector('#btnGenerar');
/**
 * Input que contiene la contraseña generada. 
 * @type {HTMLElement}
 */
const inputPassword      = document.querySelector('#password');

/**
 * Contiene propiedades sobre la cantidad de caracteres que tendrá la contraseña y si contendrá o no números, simbolos y mayúsculas. 
 * @type {{caracteres:Number, simbolos:Boolean, numbers:Boolean, upperCase:Boolean, lowerCase:Boolean}}
 */
const setting = {
    caracteres: parseInt(localStorage.getItem('caracteres')),
    simbolos  : localStorage.getItem(`simbolos`) == 'true',
    numbers   : localStorage.getItem(`numbers`) == 'true',
    upperCase : localStorage.getItem(`upperCase`) == 'true',
    lowerCase : true
}

/**
 * Contiene los caracteres para cada caso de la generación de la contraseña. 
 * @type {{numbers:String, simbolos:String, upperCase:String, lowerCase:String}}
 */
const caracteres = {
    numbers  : '0 1 2 3 4 5 6 7 8 9',
    simbolos : '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? ¿ ! | /',
    upperCase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    lowerCase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
}

// Listeners
btnMenosUno.addEventListener('click', validarCaracteres);
btnMasUno.addEventListener('click', validarCaracteres);
btnSimbolos.addEventListener('click', validarSetting);
btnNumbers.addEventListener('click', validarSetting);
btnUpperCase.addEventListener('click', validarSetting);
btnGenerar.addEventListener('click', generarPassword);
inputPassword.addEventListener('click', copiarPassword);
document.addEventListener('DOMContentLoaded', () => {
    
    // Para que se impriman en el DOM los valores de la configuración que estén guardados en el localStorage al cargar la página. 
    validarStorage();
    // Para que aparezca una contraseña generada cada vez que se carga la página con las configuraciones guardadas. 
    generarPassword(); 

    // Iniciar la característica de popover de Bootstrap.  
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    const popover = new bootstrap.Popover('.popover-dismiss', {
        trigger: 'focus'
    });
});

// Funciones. 
/**
 * Verifica si se presionó el botón de aumentar o disminuir caracteres y según haya sido el caso, imprime el valor en el DOM y a su vez lo guarda en el localStorage.
 * @param {Event} e El evento que se desencadena y sus características. 
 */
function validarCaracteres(e){

    const {caracteres} = setting;

    if (e.target.id === 'masUno' || e.target.classList.contains('fa-angle-right')){
        if (caracteres < 25){
            cantidadCaracteres.value = ++setting.caracteres; 
            cantidadCaracteres.classList.remove('is-invalid');
            localStorage.setItem(`caracteres`,`${cantidadCaracteres.value}`);
        }else{
            cantidadCaracteres.classList.add('is-invalid');
        }
    }else{
        if (caracteres > 4){
            cantidadCaracteres.value = --setting.caracteres;
            cantidadCaracteres.classList.remove('is-invalid');
            localStorage.setItem(`caracteres`,`${cantidadCaracteres.value}`);
        }else{
            cantidadCaracteres.classList.add('is-invalid');
        }
    }
    
}

/**
 * Cambia el icono en el DOM del botón de la configuración seleccionada según sea el caso, cambia el valor de la propiedad en el objeto de {@link setting} y guarda en el localStorage el valor de la configuración (true|false).
 * @param {Event} e El evento que se desencadena y sus características. 
 */
function validarSetting(e){

    const icono = e.target.nextElementSibling.firstChild;
    icono.classList.toggle('fa-check');
    icono.classList.toggle('fa-xmark');
    setting[e.target.id] = !setting[e.target.id];
    localStorage.setItem(`${e.target.id}`,`${setting[e.target.id]}`);
    
}

/**
 * Genera la contraseña tomando en cuenta los valores de la configuración y la imprime en DOM. 
 */
function generarPassword(){

    let caracteresTotales = '';
    let password = '';

    for(propiedad in setting){

        if (setting[propiedad] === true){
            caracteresTotales += caracteres[propiedad] + ' ';
        }
    }

    caracteresTotales = caracteresTotales.trim();
    caracteresTotales = caracteresTotales.split(' ');

    for(let i = 0; i < setting.caracteres; i++){
        password += caracteresTotales[Math.floor(Math.random() * caracteresTotales.length)];
    }

    inputPassword.value = password;

    if (password.length >= 4 && password.length <= 8){

        alertaSeguridad('Contraseña débil', 'danger');

    } else if(password.length >= 9 && password.length <= 12){

        alertaSeguridad('Contraseña bastante segura', 'warning');

    }else{

        alertaSeguridad('Contraseña Segura', 'success');

    }
	
}

/**
 * Copia la contraseña al portapapeles.
 */
function copiarPassword(){
    
    const password = inputPassword.value; 

    navigator.clipboard.writeText(password).then(() => {
        // console.log("Text copied to clipboard...")
    })
}

/**
 * Toma los datos necesarios para crear una alerta con información sobre qué tan fuerte es la contraseña generada. 
 * @param {String} mensaje El texto del mansaje que tendrá la alerta.
 * @param {String} tipo El tipo de alerta que quiere mostrarse, dentro de los tipos de alertas que ofrece Bootstrap.
 */
function alertaSeguridad(mensaje, tipo){
    
    const container = document.querySelector('.container');
    const lastChild = container.lastElementChild;  

    if (lastChild.id === 'alert') {
        container.removeChild(lastChild);  
    }

    const contenedorAlert = document.createElement('div');
    contenedorAlert.id    = 'alert';
    const alert           =`<div id="alerta" class="row d-flex justify-content-center align-items-center">
                                <div class="col-xs-12 col-lg-4">
                                    <div class="alert alert-${tipo} fade show text-center mt-2" role="alert">
                                        ${mensaje}
                                    </div>
                                </div>
                            </div>`
    contenedorAlert.innerHTML = alert;
    container.appendChild(contenedorAlert);

    setTimeout(() => {
        container.removeChild(document.querySelector('#alert'));  
    }, 2000);
    
}

/**
 * Verifica si los elementos necesarios para guardar la configuración existen o no en el localStorage y luego toma los valores existentes para mostrarlos en el DOM y que la configuración se muestre tal cual el usuario la haya dejado. 
 */
function validarStorage(){

    if (!localStorage.getItem(`numbers`)){
        localStorage.setItem(`simbolos`,`true`);
        localStorage.setItem(`numbers`,`true`);
        localStorage.setItem(`upperCase`,`true`);
        localStorage.setItem(`caracteres`,`8`);
    }

    cantidadCaracteres.value = localStorage.getItem(`caracteres`);

    const iconoNumbers = btnNumbers.nextElementSibling.firstChild;
    const iconoSimbolos = btnSimbolos.nextElementSibling.firstChild;
    const iconoUpperCase = btnUpperCase.nextElementSibling.firstChild;

    if(localStorage.getItem('numbers') == 'true'){
        iconoNumbers.classList.add('fa-check');
        iconoNumbers.classList.remove('fa-xmark');
    }else{
        iconoNumbers.classList.remove('fa-check');
        iconoNumbers.classList.add('fa-xmark');
    }

    if(localStorage.getItem('simbolos') == 'true'){
        iconoSimbolos.classList.add('fa-check');
        iconoSimbolos.classList.remove('fa-xmark');
    }else{
        iconoSimbolos.classList.remove('fa-check');
        iconoSimbolos.classList.add('fa-xmark');
    }

    if(localStorage.getItem('upperCase') == 'true'){
        iconoUpperCase.classList.add('fa-check');
        iconoUpperCase.classList.remove('fa-xmark');
    }else{
        iconoUpperCase.classList.remove('fa-check');
        iconoUpperCase.classList.add('fa-xmark');
    }
    
}