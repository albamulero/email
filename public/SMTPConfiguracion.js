////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 21/04/2021
// Ult. Actualizacion: 21/04/2021
// Ver. 0 
// parametros: no aplica
// Descripcion: Activacion de los botones de la pagina
/////////////////////////////////////////// 

let editar = null  // Esta variable seria true si tengo que editar o false si tengo que añadir

$('#btn_enviar_configuracion_email').click(function() {

    if (editar == true){ 
        editar_configuracion_email()
    }else{
        alta_configuracion_email()
    }

})

////////
// Buscar si el usuario ya ha registrado su envio de correo
////////////

jQuery.ajax({

    url:'/mostrar_config_email',
    type:'POST',
    dataType: 'json'

}).then(function(response) {
    console.log('Response mostrar', response);

    if (typeof(Storage) !== "undefined") {
          
        sessionStorage.setItem( 'session', response.id);

        if(response.length == 0) {
            console.log("El formulario esta vacio");
            editar = false

        }else{
            console.log("El usuario esta completo");
            editar = true

            $('#hostConfig').val(response[0].host)
            $('#portConfig').val(response[0].port)
            $('#emailConfig').val(response[0].send_mail)
            $('#smtpencrytionConfig').val(response[0].SMTP_encryption)
            $('#smptauthencationConfig').val(response[0].SMTP_authentication)
            $("#usernameConfig").val(response[0].username)
            $("#passwordConfig").val(response[0].password)
        }
    } else {

        console.log('no se soporte estorage')
    }

})

///////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 21/04/2021
// Ult. Actualizacion: 21/04/2021
// Ver. 0
// funcion: alta_configuracion_email()
// parametros: no aplica
// Descripcion: Es llamada desde el formulario de alta de la direcion de correo.
///////////////////////////////////////////

function alta_configuracion_email() {
    
    let hostConfig = $("#hostConfig").val()
    let portConfig = $("#portConfig").val()
    let emailConfig = $("#emailConfig").val()
    let smtpencrytionConfig = $("#smtpencrytionConfig").val()
    let smptauthencationConfig = $("#smptauthencationConfig").val()
    let usernameConfig = $("#usernameConfig").val()
    let passwordConfig = $("#passwordConfig").val()

    const data = {
        "hostConfig":`${hostConfig}`,
        "portConfig":`${portConfig}`,
        "emailConfig":`${emailConfig}`, 
        "smtpencrytionConfig":`${smtpencrytionConfig}`,
        "smptauthencationConfig":`${smptauthencationConfig}`,
        "usernameConfig":`${usernameConfig}`,
        "passwordConfig":`${passwordConfig}` 
    } 

    jQuery.ajax({

        url:'/alta_config_email',
        data: data,
        type: 'POST',
        dataType: 'json'
    
    }).then(function(response) {
        console.log('Response alta', response);

        if(response.success == "true") {

            // Levantamos el modal
            $('#modal_configuracion_email').modal('show')
            // Creamos el mensaje que queremos que se vea
            let mensaje = 'La direccion de correo se ha agregado con exito'
            // Aqui hacemos que se vea nuestro mensaje
            $('#modal_configuracion_email').find('.modal-body p').text(mensaje)
            // Ponemos el boton a la escucha y redirigimos la pagina
            $('#btn_modal_configuracion_email').click(function() {
                $(location).attr("href", "/entrada.html")
            })
            

        } else {

            // Levantamos el modal
            $('#modal_configuracion_email').modal('show')
            // Creamos el mensaje que queremos que se vea
            let mensaje = 'La direccion de correo no se ha podido agregar'
            // Aqui hacemos que se vea nuestro mensaje
            $('modal_configuracion_email').find('.modal-body p').text(mensaje)
            // Ponemos el boton a la escucha y redirigimos la pagina
            $('#btn_modal_configuracion_email').click(function() {
                $(location).attr("href", "/SMTPConfiguracion.html")
            })
        }
    })
}


function editar_configuracion_email() {
    
    let hostConfig = $("#hostConfig").val()
    let portConfig = $("#portConfig").val()
    let emailConfig = $("#emailConfig").val()
    let smtpencrytionConfig = $("#smtpencrytionConfig").val()
    let smptauthencationConfig = $("#smptauthencationConfig").val()
    let usernameConfig = $("#usernameConfig").val()
    let passwordConfig = $("#passwordConfig").val()

    const data = {
        "hostConfig":`${hostConfig}`,
        "portConfig":`${portConfig}`,
        "emailConfig":`${emailConfig}`, 
        "smtpencrytionConfig":`${smtpencrytionConfig}`,
        "smptauthencationConfig":`${smptauthencationConfig}`,
        "usernameConfig":`${usernameConfig}`,
        "passwordConfig":`${passwordConfig}` 
    }

    jQuery.ajax({

        url:'/actualizar_config_email',
        data:data,
        type:'POST',
        dataType:'json'

    }).then(function(response) {
        console.log('Editar', response);

        if(response.success == "true") {
            
            // Levantamos el modal
            $('#modal_configuracion_email').modal('show')
            // Creamos el mensaje que queremos que se vea
            let mensaje = 'Configuracion de correo editada'
            // Aqui hacemos que se vea nuestro mensaje
            $('#modal_configuracion_email').find('.modal-body p').text(mensaje)
            // Ponemos el boton a la escucha y redirigimos la pagina
            $('#btn_modal_configuracion_email').click(function() {
                $(location).attr("href", "/entrada.html")
            })
        
        } else {

            // Levantamos el modal
            $('#modal_configuracion_email').modal('show')
            // Creamos el mensaje que queremos que se vea
            let mensaje = 'No se pudo editar la configuaracion del correo'
            // Aqui hacemos que se vea nuestro mensaje
            $('#modal_configuracion_email').find('.modal-body p').text(mensaje)
            // Ponemos el boton a la escucha y redirigimos la pagina
            $('#btn_modal_configuracion_email').click(function() {
                $(location).attr("href", "/entrada.html")
            })

        }
    })

}



