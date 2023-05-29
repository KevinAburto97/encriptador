const vowels = {
    "a" : "ai",
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "u" : "ufat"
}

var btnEncriptar = document.getElementById("encriptar"),
    btnDesencriptar = document.getElementById("desencriptar"),
    showResponse = document.getElementById("showResponse"),
    inputTexto = document.getElementById("texto"),
    copy = document.getElementById("copy"),
    contentNotFound = document.getElementById("contentNotFound"),
    iconError = document.getElementById("error"),
    snackbar = document.getElementById("snackbar");

inputTexto.addEventListener('keyup', function(key){
    let texto = this.value
    if(texto != ""){
        if(validateText(texto)){
            iconError.style.display = "none";
            btnEncriptar.removeAttribute("disabled");
            btnDesencriptar.removeAttribute("disabled");
        }
        else{
            iconError.style.display = "block";
            btnEncriptar.disabled = "true";
            btnDesencriptar.disabled = "true";
        } 
    }

    inputTexto.value = texto.toLowerCase();
})

copy.addEventListener('click', function(){
    showResponse.select();
    document.execCommand("copy");
    snackbar.innerHTML = "Texto copiado!";
    snackbar.className = "show";
    setTimeout(function(){
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
})

btnEncriptar.addEventListener('click', function(){
    let texto = document.getElementById("texto").value,
        response = "";    
    if(texto != ""){
        for(letra of texto){
            response += encriptar(letra);
        }
        showResponse.value = response;
        hideNotFound();
    }
    else{
        showNotFound();
    }
})

btnDesencriptar.addEventListener('click', function(){
    let texto = document.getElementById("texto").value
    if(texto != ""){
        let response = desencriptar(texto);
        showResponse.value = response;
        hideNotFound();
    }
    else{
        showNotFound();
    }
})

function validateText(texto){
    let patron = /^[a-zA-Z\s]+$/;
    return patron.test(texto);
}

function hideNotFound(){
    copy.style.display = "block";
    contentNotFound.style.display = "none";
    showResponse.style.display = "block";
}

function showNotFound(){
    contentNotFound.style.display = "block";
    showResponse.style.display = "none";
}

function encriptar(letra){
    return vowels.hasOwnProperty(letra) ? vowels[letra] : letra;
}

function desencriptar(texto){
    let response = "",
        i = 0;
    
    while(i < texto.length){
        let found = false;
        for(const key in vowels){
            let vowel = vowels[key];
            if(texto.slice(i,i+vowel.length) === vowel ){
                response += key;
                i += vowel.length;
                found = true;
                break;
            }
        }
        if(!found){
            response += texto[i];
            i += 1;
        }
    }
   return response;
}
