const forma= document.getElementById("forma");
const username= document.getElementById("username");
const birthdate= document.getElementById("birthdate");
const email= document.getElementById("email");
const cpf= document.getElementById("cpf");
const password= document.getElementById("password");
const passwordConfirmation= document.getElementById("password-confirmation");

forma.addEventListener("submit", (e) => {
    e.preventDefault();
    checarinputs();
});

function checarinputs() {
    const usernameValue= username.value;
    const birthdateValue= birthdate.value;
    const emailValue= email.value;
    const cpfValue= cpf.value
    const passwordValue= password.value;
    const passwordConfirmationValue= passwordConfirmation.value;

    if(usernameValue==""){
            SetErrorfor(username, "O nome de usuario é obrigatório")
    }else{
        SetSuccessfor (username);
    }

    if (!isValidDate(birthdateValue)) {
        SetErrorfor(birthdate,"Data de nascimento inválido");
    }else if(birthdateValue){
        SetErrorfor(birthdate, "Data de nascimento é obrigatório")
    }else {
        SetSuccessfor(birthdate)
    }
    if(emailValue==""){
        SetErrorfor(email, "O campo de email é obrigatório")
    } else if(!checkEmail(emailValue)){
        SetErrorfor(email, "Email inválido")
    }else{
        SetSuccessfor(email)
    }

    if(cpfValue==""){
        SetErrorfor(cpf, "CPF é obrigatório")
    }else if(!isValidCPF(cpfValue)){
        SetErrorfor(cpf, "CPF inválido")
    }else{
        SetSuccessfor(cpf)
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



    
    const controle= controle.querySelectoAll(".controle")

    const controlevalido= [...controle].every(controle =>{
        return (controle.className === "controle success");
    })

    if(controlevalido){
        console.log("Conta criada com sucesso")
    }
}

function setErrorfor(input, message){
   const control= input.parentElement;
   const small= control.querySelectoAll("small")

   small.innerText= message;
   controle.className= "controle error"
}

function setSuccessfor(input){
    const control= input.parentElement

    control.className= "controle success"
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function checkAge(dateOfBirth, minAge = 18) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (age > minAge || (age === minAge && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))) {
        return { valid: true, message: "A pessoa tem a idade mínima requerida" };
    } else {
        return { valid: false, message: `A pessoa deve ter pelo menos ${minAge} anos` };
    }
}

function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false;

    // Elimina CPFs inválidos conhecidos
    if (/^(.)\1*$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}