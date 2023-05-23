const vowels = {
    "a" : "ai",
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "u" : "ufat"
}

var btnEncriptar = document.getElementById("encriptar"),
    btnDesencriptar = document.getElementById("desencriptar"),
    showResponse = document.getElementById("showResponse")

btnEncriptar.addEventListener('click', function(){
    let texto = document.getElementById("texto").value,
        response = ""
    for(letra of texto){
        response += encriptar(letra)
    }
    showResponse.value = response
})

btnDesencriptar.addEventListener('click', function(){
    let texto = document.getElementById("texto").value,
    response = desencriptar(texto)

    showResponse.value = response
})

function encriptar(letra){
    return vowels.hasOwnProperty(letra) ? vowels[letra] : letra 
}

function desencriptar(texto){
    let response = "",
        i = 0
    
    while(i < texto.length){
        let found = false
        for(const key in vowels){
            let vowel = vowels[key]
            if(texto.slice(i,i+vowel.length) === vowel ){
                response += key
                i += vowel.length
                found = true
                break;
            }
        }
        if(!found){
            response += texto[i]
            i += 1
        }
    }
   return response
}
