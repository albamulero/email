////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 20/04/2021
// Ult. Actualizacion: 20/04/2021
// Ver. 0 
// parametros: no aplica
// Descripcion: Activacion de los botones de la pagina
///////////////////////////////////////////

$('#btn_principal_logout').click(function(e) {  
    $('#modal_logout').modal('show')        // Levantamos el modal
    let mensaje = 'Seguro que deseas salir'
    $('#modal_logout').find('.modal-body p').text(mensaje)      // Aqui hacemos que se pueda ver el mesaje que queremos mostrar
})

$('#btn_modal_logout_aceptar').click(function(e) { 
    logout()
})

$('#btn_modal_logout_cerrar').click(function(e) {
    $(location).attr("href", "/entrada.html");
})

////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 20/04/2021
// Ult. Actualizacion: 20/04/2021
// Ver. 0
// funcion: logout()
// parametros: no aplica
// Descripcion: 
///////////////////////////////////////////

function logout(e) {

    jQuery.ajax({
        
        url: '/logout',
        type: 'GET'

    }).then(function(response) {

        if (typeof(Storage) !== "undefined") {
          
            sessionStorage.removeItem( 'session', response.id);
            
            $(location).attr("href", "/");

        } else {
  
            console.log('no se soporte estorage')
        }
    
    }).catch(function(e) {
        console.log(e);
    })
}
