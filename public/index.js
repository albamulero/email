$(document).ready(function() {

    ////////////////////////////////
    // Autor. Alba Mulero
    // Fecha creacion: 13/04/2021
    // Ult. Actualizacion: 13/04/2021
    // Ver. 0 
    // parametros: no aplica
    // Descripcion: Activacion de los botones de la pagina
    ///////////////////////////////////////////

    $('#boton-login').click(function(e) {
        login(e)
    })
    
    ////////////////////////////////
    // Autor. Alba Mulero
    // Fecha creacion: 13/04/2021
    // Ult. Actualizacion: 13/04/2021
    // Ver. 0
    // funcion: alta_nuevo_usuario()
    // parametros: no aplica
    // Descripcion: Es llamada desde el formulario de alta de nuevos usuarios.
    ///////////////////////////////////////////

    function login(e) {
        let email = $("#email").val()
        let password = $("#password").val()

        const data = {
            "email":`${email}`,
            "password":`${password}`
        }

        jQuery.ajax({
            
            url: '/webservice/login',
            data: data,
            type: 'POST',
            dataType: 'json'

        }).then(function(response) {
            console.log(response);

            if(response.success == "true") {
                console.log("success es True")

                if (typeof(Storage) !== "undefined") {
          
                    sessionStorage.setItem( 'session', response.id);
                    
                    $(location).attr("href", "/entrada.html");

                } else {
          
                    console.log('no se soporte estorage')
                }

            }else {
                console.log("success es False")

                // Levantamos el modal de exito 
                $('#modal_login').modal('show')

                let mensaje = 'Lo sentimos.. Por favor compuebe login y password'

                // Aqui hacemos que se oueda ver el nesaje que queremos mostrar
                $('#modal_login').find('.modal-body p').text(mensaje)
        
                // Ponemos el boton a la escucha del modal y redirigimos a la pag
                $('#btn_modal_login').click(function() {
                    $(location).attr("href", "/index.html");
                })
            }
        
        }).catch(function(e) {
            console.log(e);
        })
    }
})