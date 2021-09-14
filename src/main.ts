//------ OPEN AND CLOSE MENUS/POPUPS -----//
// div menu mobile
const menuMobile = document.querySelector(".menu-mobile");
// console.log(menuMobile);

// div menu contacts
const menuContacts = document.querySelector("#contacts");

// each li form menu mobile
const allLi = document.querySelectorAll(".menu-mobile-li");

// function to open
function openMenu(element) {
    // remove class display none
    element.classList.remove("close-menu");
    // disable body scroll
    document.body.style.overflow = 'hidden';
} 

// function to close
function closeMenu(element) {
    // add class display none
    element.classList.add("close-menu");
    // able body scroll
    document.body.style.overflow = 'visible';
}

//open menu mobile
document.querySelector(".menu-mobile-hamburguer").addEventListener('click', function() { openMenu (menuMobile) });

// close menu mobile
document.querySelector('#mobile-x').addEventListener('click', function() { closeMenu (menuMobile) });

// open pop-up contacts
document.querySelector("#contacts-menu-laptop").addEventListener('click', function() { 
    openMenu (menuContacts); 
    closeMenu(menuMobile); // close menu mobile when open contacts pop
});

// open pop-up contacts mobile
document.querySelector("#contacts-menu-mobile").addEventListener('click', function() { openMenu (menuContacts); });

// close pop-up contacts
document.querySelector('#contact-x').addEventListener('click', function() { closeMenu(menuContacts); });

document.querySelector("#contacts-menu-laptop").addEventListener("click", function () { document.body.style.overflow = 'hidden'; })

// close menu when click on each section
for (let i = 0; i < allLi.length; i++) {
    allLi[i].addEventListener('click', function() { closeMenu (menuMobile); });
}

// connect button - open menu contacts
document.querySelector("#connect-button").addEventListener("click", function() { openMenu (menuContacts); });


// ------FORM------ //
//form
const form = document.querySelector("#form");
// console.log(form);

// name input
const nameInput = <HTMLInputElement>document.querySelector("#userName");
console.log(nameInput);
// email input 
const emailInput = <HTMLInputElement>document.querySelector("#mail");
console.log(emailInput);
//textarea input
const textAreaInput = <HTMLInputElement>document.querySelector("#message-area");
// button 
const formButton = <HTMLButtonElement>document.querySelector("#form-summit");
// name message
const nameMessage = <HTMLElement>document.querySelector("#name-message");
// email message
const emailMessage = <HTMLElement>document.querySelector("#email-message");
// textarea message
const textAreaMessage = <HTMLElement>document.querySelector("#textarea-message");

// check validation
let formValidated : boolean = false;
// prevent validation of email input while the user is writtinh name input
let validationOnGoing : boolean = false;

// all inputs
const inputs : Array<HTMLInputElement> = [nameInput, emailInput, textAreaInput];

// local storage array
let fieldsArray : Array<object> = [ 
    // { name: nameInput.value,
    // email: emailInput.value,
    // message: textAreaInput.value }
    ];

// email characters validation
function validateEmail(email) : boolean {
    const exceptionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exceptionEmail.test(String(email).toLowerCase());
}

// clean value of inputs when refresh page
window.onload = function() { inputs.forEach(element => {element.value = ''; }); }

// remove error messages
function resetInputs(input : HTMLInputElement, message : HTMLElement) : void {
    input.classList.remove('error');
    message.classList.remove('active');
}

// show errors - border and message
function invalidateInput(input : HTMLInputElement, messageText : HTMLElement, message : string) : void {
    // add visibility
    messageText.classList.add('active');
    // add message
    messageText.innerText = message;

    // add error class
    input.classList.add("error");
}

// validate all inputs
function validateInputs() : void {
    if(!validationOnGoing) return;

    formValidated = true
    resetInputs(nameInput, nameMessage);
    resetInputs(emailInput, emailMessage);
    resetInputs(textAreaInput, textAreaMessage);

    // check if name input is valid
    if(!nameInput.value) {
        // show error
        invalidateInput(nameInput, nameMessage, 'Name is not valid!');

        formValidated = false;
    }

    // check if email input is valid
    if(!validateEmail(emailInput.value)) {
        // show error
        invalidateInput(emailInput, emailMessage, 'E-mail is not valid!');

        formValidated = false;
    }

    // check if textarea input is valid
    if(!textAreaInput.value) {
        // show error
        invalidateInput(textAreaInput, textAreaMessage, 'Message in not invalid!');
    
        formValidated = false;
    }
}

// add data to local storage
function addToLocalStorage(nameEl, emailEl, messageEl) {
    // add each input.value to objecto in the array
    fieldsArray.push({ name: nameEl.value, email: emailEl.value, message: messageEl.value });

    // stringify data and save in local storage
    let stringifyInputs = JSON.stringify(fieldsArray);
    localStorage.setItem('Contact Info', stringifyInputs);

    // show all messages saved in LocalStorage
    console.log(JSON.parse( localStorage.getItem( 'Contact Info' )));
}

// form prevent default call back
form.addEventListener('submit', (e) => { 
    e.preventDefault();
    // console.log("click submit button");

    validationOnGoing = true;

    validateInputs(); 
 
    if(formValidated) {
        // success message
        const successMessage = document.querySelector("#sent-message")
        // display success message
        successMessage.classList.add("active");

        // remove success message after 3s
        setTimeout(function () {
            successMessage.classList.remove("active");
        }, 3000)

        addToLocalStorage(nameInput, emailInput, textAreaInput);

        // add each input to the array
        inputs.forEach(input => {  
           inputs.push(input);
        });

        // remove value of all inputs
        inputs.forEach( input => { input.value = '' });    
    }
});

// validate each time the user adds something to the inputs
inputs.forEach(input => {
    input.addEventListener("input", () => { validateInputs(); })
});