function makeid() {         // Con esta funcion genero letrar aleatoria

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}



module.exports = {
    'makeid': makeid
}