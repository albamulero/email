////////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 27/04/2021
// Ult. Actualizacion: 21/04/2021
// Ver. 0 
// parametros: no aplica
// Descripcion: Activacion de los botones de la pagina
///////////////////////////////////////////

$('#btn-agregar-nueva-campanya').click(function() {
    agregar_nueva_campanya()
})


///////////////////////////////
// Autor. Alba Mulero
// Fecha creacion: 27/04/2021
// Ult. Actualizacion: 21/04/2021
// Ver. 0
// funcion: agregar_nueva_campanya()
// parametros: no aplica
// Descripcion: Es llamada desde el formulario de alta la nueva campaña.
///////////////////////////////////////////

/* MOSTRAR LAS CAMPAÑAS QUE YA TENEMOS REGISTRADAS */ 

jQuery.ajax({

    url: '/mostrar_campanya',
    type: 'POST',
    dataType: 'json'

}).then(function(response) {

    if (typeof(Storage) !== "undefined") {
          
        sessionStorage.setItem( 'session', response.id);
        
        for (i = 0; i < response.length; i++) {

            // Creamos la filas necesarias para cada elemento

            var fila = document.createElement('tr')
            fila.scope = 'row'
            fila.id = i

            // Creamos las columnas dentro de las filas

            var columna = document.createElement('td')
            columna.innerHTML = response[i].id

            var columna1 = document.createElement('td')
            columna1.innerHTML = response[i].descripcion_corta

            var columna2 = document.createElement('td')
            columna2.innerHTML = response[i].descripcion_larga

            var columnaEditar = document.createElement('td')
            columnaEditar.innerHTML = '<button class="btn btn-editar me-md-2 " type="button" data-bs-toggle="modal" data-bs-target="#modal_editar" data-id= '+response[i].id+' data-titulo='+encodeURI(response[i].descripcion_corta)+' data-subtitulo='+encodeURI(response[i].descripcion_larga)+' data-plantilla='+response[i].plantilla+'><i class="bi bi-pencil"></i></button><div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="editar" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><form><h2>Editar campaña</h2><div class="col-auto"><label class="form-label">Id</label></div><div class="mb-3"><input type="text" class="form-control" id="id_modal" name="id"></div><div class="mb-3"><label class="form-label">Titulo</label><input type="text" class="form-control" id="titulo" name="descripcionCorta"></div><div class="mb-3"><label class="form-label">Subtitulo</label><input type="text" class="form-control" id="subtitulo" name="descripcionLarga"></div><div class="mb-3"><label class="form-label">Plantilla</label><textarea id="plantilla" name="plantilla" cols="57" rows="6"></textarea></div><br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="button" class="btn btn-editar" id="editar">Editar</button></div></form></div></div></div>'

            var columnaBorrar = document.createElement('td')
            columnaBorrar.innerHTML = '<button type="button" class="btn btn-eliminar" data-bs-toggle="modal" data-bs-target="#borrar" data-id ='+response[i].id+'><i class="bi bi-trash"></i></button><div class="modal fade" id="borrar" tabindex="-1" aria-labelledby="borrar" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button></div><div class="modal-body"><h5 id="titulo-borrar">¿Seguro que desea eliminar?</h5><input type="hidden" id="oculto_id"><br></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-eliminar" id="eliminar">Aceptar</button></div></div></div></div>'

            // Añadimos los elementos

            document.getElementById('tbody').appendChild(fila)
            document.getElementById(i).appendChild(columna)
            document.getElementById(i).appendChild(columna1)
            document.getElementById(i).appendChild(columna2)
            document.getElementById(i).appendChild(columnaEditar)
            document.getElementById(i).appendChild(columnaBorrar)
        }
         
    } else {

        console.log('no se soporte estorage')
    }
    /* EDITAR CAMPAÑA */

    $('#modal_editar').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget)
        var id = button.data('id')
        var descripcionCorta = button.data('titulo')
        var descripcionLarga = button.data('subtitulo')
        var modal = $(this)
        modal.find('.modal-body #id_modal').val(id)
        modal.find('.modal-body #titulo').val(decodeURI(descripcionCorta))
        modal.find('.modal-body #subtitulo').val(decodeURI(descripcionLarga))
    })

    /* PONEMOS EL BOTON A LA ESCUCHA PARA EDITAR LA CAMPAÑA */

    $('#editar').click(function() {
        editar_campanya()
    })

    /* BORRAR CAMPAÑA */

    $('#borrar').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget)
        var id = button.data('id')
        var modal = $(this)
        modal.find('.modal-body #oculto_id').val(id)

    })

    $('#eliminar').click(function(){
        eliminar($('#oculto_id').val())
    })

})

/* FUNCION EDITAR CAMPAÑA */

function editar_campanya() {

    // Creamos el modal del editar
    $('#modal_editar').modal("toggle")
   
    let id = $("#id_modal").val()
    let descripcionCorta = $("#titulo").val()
    let descripcionLarga = $("#subtitulo").val()
    let plantilla = $("#plantilla").val()

    const data = {
        "id": `${id}`,
        "descripcionCorta": `${descripcionCorta}`,
        "descripcionLarga": `${descripcionLarga}`,
        "plantilla": `${plantilla}`
    }

    jQuery.ajax({

        url: '/actualizar_campanya',
        data:data,
        type: 'POST',
        dataType: 'json'

    }).then(function(response) {
        console.log('Response editar campaña: ', response);

        if (typeof(Storage) !== "undefined") {
          
            sessionStorage.setItem( 'session', response.id);

            if (response.success == "true") {

                // Levantamos el modal
                $('#modal_campanya').modal('show')
                // Creamos le mensaje
                let mensaje = 'Se ha editado correctamente'
                // Mostramos el mensaje
                $('#modal_campanya').find('.modal-body p').text(mensaje)
                // Ponemos el boton a la escucha
                $('#btn_modal_campanya').click(function() {
                    $(location).attr("href", "./crearCampanya.html")
                })

            
            } else {

                // Levantamos el modal
                $('#modal_campanya').modal('show')
                // Creamos el mensaje
                let mensaje = 'ERROR... Vuelvelo a intentar'
                // Mostramos el mensaje
                $('#modal_campanya').find('.modal-body p').text(mensaje)
                // Ponemos el boton a la escucha
                $('#btn_modal_campanya').click(function() {
                    $(location).attr("href", "./crearCampanya.html")
                })
            }

        } else{
            console.log("no soporta store");
        }

    }) 
}

/* FUNCION BORRAR CAMPAÑA */

function eliminar(id) {
    
    const Url = 'http://localhost:3000/eliminar_campanya'
    const data = {
        "id":`${id}`
    }

    console.log(data);

    $.post(Url, data, function(data, status) {
        console.log(data);
        console.log(status);
        location.reload()
    })
}

/* FUNCION AGREGAR CAMPAÑA */

function agregar_nueva_campanya() {

    // Cerramos el modal
    $('#agregar').modal("toggle")

    let id = $("#id").val()
    let descripcionCorta = $("#descripcionCorta").val()
    let descripcionLarga = $("#descripcionLarga").val()
    let plantilla = $("#plantilla").val()

    const data = {
        "id": `${id}`,
        "descripcionCorta": `${descripcionCorta}`,
        "descripcionLarga": `${descripcionLarga}`,
        "plantilla": `${plantilla}`
    }

    // Levantamos el modal
    $('#modal_campanya').modal('show')
    // Creamos el mensaje que queremos que se vea
    let mensaje = 'Este proceso tardara 10 mint'
    // Aqui hacemos que se vea nuestro mensaje
    $('#modal_campanya').find('.modal-body p').text(mensaje)
    // Ponemos el boton a la escucha y redirigimos la pagina
    $('#btn_modal_campanya').click(function() {
    $(location).attr("href", "/crearCampanya.html")
})

    jQuery.ajax({

        url: '/alta_crear_campanya',
        data: data,
        type: 'POST',
        dataType: 'json'

    }).then(function(response) {
        console.log('Response nueva campaña', response);

        if (typeof(Storage) !== "undefined") {
          
            sessionStorage.setItem( 'session', response.id);

            if (response.success == "true") {

                // Levantamos el modal
                $('#modal_campanya').modal('show')
                    // Creamos el mensaje que queremos que se vea
                let mensaje = 'La nueva campaña se ha agregado con exito'
                    // Aqui hacemos que se vea nuestro mensaje
                $('#modal_campanya').find('.modal-body p').text(mensaje)
                    // Ponemos el boton a la escucha y redirigimos la pagina
                $('#btn_modal_campanya').click(function() {
                    $(location).attr("href", "/crearCampanya.html")
                })


            } else {

                // Levantamos el modal
                $('#modal_campanya').modal('show')
                    // Creamos el mensaje que queremos que se vea
                let mensaje = 'No se ha podido agregar la nueva campaña'
                    // Aqui hacemos que se vea nuestro mensaje
                $('#modal_campanya').find('.modal-body p').text(mensaje)
                    // Ponemos el boton a la escucha y redirigimos la pagina
                $('#btn_modal_campanya').click(function() {
                    $(location).attr("href", "/crearCampanya.html")
                })
            }

        } else{
            
            console.log('No soporta store');
        }
    })
}




