/* MOSTRAR LAS CAMPAÑAS QUE YA TENEMOS REGISTRADAS */ 

jQuery.ajax({

    url: 'mostrar_campanya',
    type: 'POST',
    dataType: 'json'

}).then(function(response) {
    console.log('Response mostrar campañas: ', response);

    if (typeof(Storage) !== "undefined") {
          
        sessionStorage.setItem( 'session', response.id);

        for (i=0; i < response.length; i++) {
        
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

            var columnaSeleccionar = document.createElement('td')
            columnaSeleccionar.innerHTML = '<button class="btn btn-seleccionar me-md-2 " type="button" data-bs-toggle="modal" data-bs-target="#modal_seleccionar" data-id= '+response[i].id+'><i class="bi bi-check2-square"></i></button><div class="modal fade" id="modal_seleccionar" tabindex="-1" aria-labelledby="modal_seleccionar" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button></div><div class="modal-body"><h5 id="titulo-seleccionar">Esta campaña sera enviada a todos tus contactos</h5><input type="hidden" id="oculto_id"><br></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-seleccionar" id="seleccionar">Aceptar</button></div></div></div></div>'

            // Añadimos los elementos

            document.getElementById('tbody').appendChild(fila)
            document.getElementById(i).appendChild(columnaSeleccionar)
            document.getElementById(i).appendChild(columna)
            document.getElementById(i).appendChild(columna1)
            document.getElementById(i).appendChild(columna2)
            document.getElementById(i).appendChild(columnaSeleccionar)

        }

    } else {

        console.log('no se soporte estorage')
    }

    /* SELECCIONAR */
    
    $('#modal_seleccionar').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var id = button.data('id')
        console.log(id);
        var modal = $(this)
        modal.find('.modal-body #oculto_id').val(id)
    })

    $('#seleccionar').click(function() {
        seleccionar_campanya($('#oculto_id').val())
    })
})

/* FUNCION SELECCION DE CAMPAÑA */

function seleccionar_campanya (id_campanya) {

    const Url = 'http://localhost:3000/mostrar_envio_campanya'
    const data = {
        "id" : `${id_campanya}`
    }

    $.post(Url, data, function(data, status) {
        console.log("Data 2", data);
        console.log(status);
        location.reload()
    })
}