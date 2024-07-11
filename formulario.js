const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (e) => {
    e.preventDefault();
     checkInputs();
});

function checkInputs() {
    const usernameValue= username.value;
    const emailValue= email.value;
    const passwordValue= password.value;
    const passwordConfirmationValue= passwordConfirmation.value;
    if(usernameValue == "") {
        setErrorfor(username,"O nome de usuario é obrigatório.")
    }else{
        setSuccessfor (username);
    }

    if(emailValue == ""){
        setErrorfor(email, "O email é obrigatório.")
    } else if(!checkEmail(emailValue)) {
        setErrorfor (email, "Email inválido.")
    } else{
        setSuccessfor (email)
    }

    if (passwordValue == ""){
        setErrorfor (password, "A senha é obrigatória.")
    } else if(passwordValue.length < 7){
        setErrorfor(password, "A senha precisa ter no minimo 7 caracteres.")
    } else{
        setSuccessfor (password)
    }

    if(passwordConfirmationValue == ""){
        setErrorfor (passwordConfirmation, "Digite a senha novamente.")
    } else if(passwordConfirmationValue !== passwordValue){
        setErrorfor (passwordConfirmation, "As senhas não  conferem.")
    } else{
        setSuccessfor (passwordConfirmation)
    }

    const formControls = form.querySelectorAll(".form-control")

    const formIsValid = [...formControls].every(formControl =>{
        return (formControl.className === "form-control success");
    });
    
    if(formIsValid){
        console.log("Criação de conta sucedida")
    }
}

function setErrorfor(input, message){
    const formControl= input.parentElement;
    const small= formControl.querySelector("small")

    small.innerText= message;
    formControl.className= "form-control error"
}

function setSuccessfor(input){
    const formControl= input.parentElement;

    //Vou adicionar a class de sucesso
    formControl.className= "form-control success";
}
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }