const nodemailer = require('nodemailer')

async function enviarCorreo(email_usuario) {
    
    let jConfig = {
        "host":"mail.mailshield.com.mx",
        "port":"465",
        "secure":true,
        "auth":{
            "type":"login",
            "user":"pruebasalba@mailshield.com.mx",
            "pass":"BpJqK9bjgk+("
        }
    }

    let email = {
        from:"pruebasalba@mailshield.com.mx",            // Remitente
        to:`${email_usuario}`,                                   // Destinatario
        subject:"Confirmacion de registro",         // Asusto del correo
        html:`
        <div>
            <p>Le informamos que su reguistro en MALING se ha realizado </p>
        </div>`
    }

    let createTransport = nodemailer.createTransport(jConfig)

    createTransport.sendMail(email, function(err, info){

        if(err) {

            console.log("Error al enviar el email");

        } else{

            console.log("Correo enviado con exito");

        }

        createTransport.close()
    })
}

module.exports = {
    
    "enviarCorreo":enviarCorreo
}