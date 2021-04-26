jQuery.ajax({

    url:'/mostrar',
    type:'POST',
    dataType: 'json'

}).then(function(response){
    console.log('Response:' , response);
    
    for(i=0; i < response.length; i++) {
        
        // Creo la fila
        var fila = document.createElement('tr')
        fila.scope = 'row'
        fila.id = i
        // Creo columnas dentro de la fila
        var columna = document.createElement('td')
        columna.innerHTML = response[i].id
        // Creamos la columna 1 pondremos el nombre
        var columna1 = document.createElement('td')
        columna1.innerHTML = response[i].nombre
        // Creamos la columna 2 pondremos el apellido
        var columna2 = document.createElement('td')
        columna2.innerHTML = response[i].apellido
        // Creamos la columna 3 pondremos el email
        var columna3 = document.createElement('td')
        columna3.innerHTML = response[i].email
        // Creamos la columna 4 pondremos el pais
        var columna4 = document.createElement('td')
        columna4.innerHTML = response[i].pais
        // Creamos el boton editar
        var columnaActualizar = document.createElement('td')
        columnaActualizar.innerHTML = '<button class="btn btn-editar me-md-2 " type="button" data-bs-toggle="modal" data-bs-target="#modal_editar" data-id= '+response[i].id+' data-nombre='+response[i].nombre+' data-apellido='+response[i].apellido+' data-email='+response[i].email+' data-pais='+response[i].pais+'><i class="bi bi-pencil"></i></button><div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="editar" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><form action="/actualizar" method="POST"><h2>Editar usuario</h2><div class="col-auto"><label for="exampleInputEmail1" class="form-label" for="inputPassword6">Id</label></div><div class="mb-3"><input type="string" class="form-control" id="InputId" for="inputPassword6"  name="id"></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Nombre</label><input type="string" class="form-control" id="InputNombre" name="nombre"></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Apellido</label><input type="string" class="form-control" id="InputApellido" name="apellido"></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Email</label><input type="email" class="form-control" id="InputEmail" name="email"></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Pais</label><input type="string" class="form-control" id="InputPais" name="pais"></div><br><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-editar">Editar</button></div></form></div></div></div></div>'
         // Creamos el boton el boton eliminar
        var columnaEliminar = document.createElement('td')
        columnaEliminar.innerHTML = '<button type="button" class="btn btn-eliminar" data-bs-toggle="modal" data-bs-target="#borrar" data-email ='+response[i].email+'><i class="bi bi-trash"></i></button><div class="modal fade" id="borrar" tabindex="-1" aria-labelledby="borrar" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button></div><div class="modal-body"><h5 id="titulo-borrar">¿Seguro que desea eliminar?</h5><input type="hidden" id="oculto_email"><br></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-eliminar"  id="eliminar">Aceptar</button></div></div></div></div>'
        
        // Añado los elementos
        document.getElementById('tbody').appendChild(fila)
        document.getElementById(i).appendChild(columna)
        document.getElementById(i).appendChild(columna1)
        document.getElementById(i).appendChild(columna2)
        document.getElementById(i).appendChild(columna3)
        document.getElementById(i).appendChild(columna4)
        document.getElementById(i).appendChild(columnaActualizar)
        document.getElementById(i).appendChild(columnaEliminar)
    }
    
    /* EDITAR */
    $('#modal_editar').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var id = button.data('id')
        var nombre = button.data('nombre')
        var apellido = button.data('apellido')
        var email = button.data('email')
        var pais = button.data('pais')
        var modal = $(this)
        modal.find('.modal-body #InputId').val(id)
        modal.find('.modal-body #InputNombre').val(nombre)
        modal.find('.modal-body #InputApellido').val(apellido)
        modal.find('.modal-body #InputEmail').val(email)
        modal.find('.modal-body #InputPais').val(pais)
    })
    
    /* BORRAR */
    $('#borrar').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var email = button.data('email')
        console.log(email);
        var modal = $(this)
        modal.find('.modal-body #oculto_email').val(email)
        
    })
    $('#eliminar').click(function(){
        eliminar($('#oculto_email').val())
    })
    
})


/* BORRAR */

function eliminar (correo) {

    const Url = 'http://localhost:3000/eliminar'
    const data = {
        "email":`${correo}`
    }

    console.log(data);
    console.log(correo);

    $.post(Url, data, function(data, status) {
        console.log(data);
        console.log(status);
        location.reload()
    })
}

