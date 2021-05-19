const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const crudPromesas = require('./crudPromesas')
const login = require('./login')
const { restart } = require('nodemon')

const app = express()   // Servidor expres
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({     // Vamos a manejar sesiones
  secret: "kdikeilsok8f88f8f888kjkjas",     // Unico campo obligatorio, generamos un algoritmo
  resave: false,
  saveUninitialized: false
}))

app.use(morgan('dev'))

app.use(express.static('public'))

app.listen(port, '0.0.0.0', () => {
  console.log(`El puerto se esta escuchando por: http://localhost:${port}`)
})

/////////////////////////////////
//  RUTAS + CRUD CON PROMESAS  //
////////////////////////////////

// --- ALTA USUARIO ---

app.post('/altaUsuario', function(req, res, next){

  var email = req.body.email
  var password = req.body.password
  var id = req.body.id
  var empresa = req.body.empresa
  
  
  crudPromesas.altaUsuario(email, password, id, empresa, function(test){

    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})

// --- ACTUALIZAR USUARIO ---

app.post('/actualizarUsuario', function(req, res, next){

  let email = req.body.email
  let password = req.body.password

  // Variables de devolucion...
  let status = 0

  // Revisar si tenemos sesion activa...
  if (req.body.email != null){

    let status = 410
    let test = {'success':'Error no hay sesion'}

  }else{

    crudPromesas.actualizarUsuario(email, password, function(test){

    status = 200
    
    console.log(JSON.stringify(test));

  })

  }

  return res.status(status).json(test)

})

// --- MOSTRAR USUARIO ---

app.post('/mostrarUsuario', function(req, res, next){
  
  var email = req.body.email

  crudPromesas.mostrarUsuario(email, function(test){
  
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })

})

// --- ELIMINAR USUARIO ---

app.delete('/eliminarUsuario', function(req, res, next){
      
  var email = req.body.email

  crudPromesas.eliminarUsuario(email, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
 
})

////////////////////////////////////
// RUTAS + CRUD CORREO ALEATORIOS //
///////////////////////////////////

// --- ALTA USUARIO ---

app.post('/alta', function(req, res, next){

  var id = req.body.id
  var email = req.body.email
  var nombre = req.body.nombre
  var apellido = req.body.apellido
  var pais = req.body.pais
  
  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);

  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";

  } else {
    console.log("Sseion activa");
  }

  crudPromesas.alta(id, email, nombre, apellido, pais, id_usuarios, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})

// --- ACTUALIZAR USUARIO ---

app.post('/actualizar', function(req, res, next){

  var nombre = req.body.nombre
  var apellido = req.body.apellido
  var email = req.body.email
  var pais = req.body.pais

  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);

  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";

  } else {
    console.log("Sseion activa");
  }

  crudPromesas.actualizar(nombre, apellido, email, pais, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  }) 
})

// --- MOSTRAR USUARIO ---

app.post('/mostrar', function(req, res, next){
  
  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);

  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";

  } else {
    console.log("Sseion activa");
  }

  crudPromesas.mostrar(id_usuarios, function(test){
  
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)
  })

})

// --- ELIMINAR USUARIO ---

app.post('/eliminar', function(req, res, next){
      
  var email = req.body.email
  console.log(req.body.email);

  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);

  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";

  } else {
    console.log("Sseion activa");
  }

  crudPromesas.eliminar(email, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
 
})

///////////////////////////////////////
// RUTAS + CRUD CONFIGURACION EMAIL //
/////////////////////////////////////

// --- ALTA CONFIGURACION EMAIL ---

app.post('/alta_config_email', function(req, res, next){

  // Controlar la sesion
  if( req.session == null){
    return res.status(400)}

    var hostConfig = req.body.hostConfig
    var portConfig = req.body.portConfig
    var emailConfig = req.body.emailConfig
    var smtpencrytionConfig = req.body.smtpencrytionConfig
    var smptauthencationConfig = req.body.smptauthencationConfig
    var usernameConfig = req.body.usernameConfig
    var passwordConfig = req.body.passwordConfig
    
    let session = req.session
    var id_usuarios = session.user_id
    console.log("Sesion en alta: "+ session.user_id);

    if (id_usuarios == null) {
      console.log("Secion nula");
      window.location.href = "http://localhost:3000";

    } else {
      console.log("Sseion activa");
    }

    crudPromesas.alta_config_email(hostConfig, portConfig, emailConfig, smtpencrytionConfig, smptauthencationConfig, usernameConfig, passwordConfig, id_usuarios, function(test){

      console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})  

// --- ACTUALIZAR USUARIO ---

app.post('/actualizar_config_email', function(req, res, next){

  var hostConfig = req.body.hostConfig
  var portConfig = req.body.portConfig
  var emailConfig = req.body.emailConfig
  var smtpencrytionConfig = req.body.smtpencrytionConfig
  var smptauthencationConfig = req.body.smptauthencationConfig
  var usernameConfig = req.body.usernameConfig
  var passwordConfig = req.body.passwordConfig

  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);
  
  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";
  
  } else {
    console.log("Sseion activa");
  }

  crudPromesas.actualizar_config_email(hostConfig, portConfig, emailConfig, smtpencrytionConfig, smptauthencationConfig, usernameConfig, passwordConfig, id_usuarios, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  }) 
})

// --- MOSTRAR USUARIO ---

app.post('/mostrar_config_email', function(req, res, next){
  
  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);
  
  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";
  
  } else {
    console.log("Sseion activa");
  }

  crudPromesas.mostrar_config_email(id_usuarios, function(test){
  
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)
  })

})

/////////////////////////////////
// RUTAS + CRUD CREAR CAMPAÑA //
///////////////////////////////

// --- ALTA CAMPAÑA ---

app.post('/alta_crear_campanya', function(req, res, next){

  var id = req.body.id
  var descripcionCorta = req.body.descripcionCorta
  var descripcionLarga = req.body.descripcionLarga
  var plantilla = req.body.plantilla

  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);
  
  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";
  
  } else {
    console.log("Sseion activa");
  }
  
  crudPromesas.alta_crear_campanya(id, descripcionCorta, descripcionLarga, plantilla, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})

// --- ACTUALIZAR CAMPAÑA ---

app.post('/actualizar_campanya', function(req, res, next) {

  var id = req.body.id
  var descripcionCorta = req.body.descripcionCorta
  var descripcionLarga = req.body.descripcionLarga
  var plantilla = req.body.plantilla

  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);
  
  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";
  
  } else {
    console.log("Sseion activa");
  }

  crudPromesas.actualizar_campanya(id, descripcionCorta, descripcionLarga, plantilla, function(test) {

    console.log(JSON.stringify(test));
    return res.status(200).json(test)
  })
})

// --- MOSTRAR CAMPAÑA ---

app.post('/mostrar_campanya', function(req, res, next){
  
  req.body.id
  req.body.descripcionCorta
  req.body.descripcionLarga
  req.body.plantilla

  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);
  
  if (id_usuarios == null) {
    console.log("Secion nula");
    return res.status(120).json({"err":"no ahi sesion"})
  
  } else {
    console.log("Sseion activa");
  }
  
  crudPromesas.mostrar_campanya(function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})

// --- ELIMINAR CAMPAÑA ---

app.post('/eliminar_campanya', function(req, res, next){
  
  var id = req.body.id

  let session = req.session
  var id_usuarios = session.user_id
  console.log("Sesion en alta: "+ session.user_id);
  
  if (id_usuarios == null) {
    console.log("Secion nula");
    window.location.href = "http://localhost:3000";
  
  } else {
    console.log("Sseion activa");
  }
  
  crudPromesas.eliminar_campanya(id, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
})

////////////////////////
// ENVIO DE CAMPAÑAS //
//////////////////////

app.post('/mostrar_envio_campanya', function(req, res, next){
  
  let session = req.session
  var id_usuarios = session.user_id

  let id_campanya = req.body.id
  console.log(id_campanya);

  if (id_usuarios == null) {
    
    console.log("Secion nula");
    return res.status(400).next()

  } else {
    
    console.log("Sseion activa");
  }
  
  crudPromesas.mostrar_envio_campanya(id_usuarios, id_campanya, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).json(test)

  })
  
})

/////////////
// SESION //
///////////

// --- LOGIN ---

app.post('/webservice/login', function(req, res, next){
  
  var email = req.body.email
  var password = req.body.password

  login.login(email, password, function(test){

    // Creamos una sesion para este usuario
    req.session.user_id = test.id
    console.log('sesion : ' + req.session.user_id)

    //Ejercicio, que se genere la sesion SOLO si se tuvo exito en la busqueda del usuario, es decir si exite....

    console.log(JSON.stringify(test));
    return res.status(200).json(test)
  })
})

// --- LOGOUT ---

app.get('/logout', function(req, res, next) {
  
  req.session.destroy();    // Destruimos la sesion 
  res.send("logout success!");

})


/* app.post("/sessions", function(req, res) {
  User.findOne({ emial:req.body.email, password:req.body.password }, function(err, docs) {
    req.session.user_id = email
    red.status(200).end()
  })
}) */

/* // --- CRUD ALTA ---

app.post('/alta', function(req, res, next){
  
  var email = req.body.email
  var password = req.body.password

  crud.alta_usuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return  res.status(200).end()

  })
})

// --- CRUD MOSTAR ---

app.post('/mostrar', function(req, res, next){

  var email = req.body.email
  var password = req.body.password

  crud.mostrar_usuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return res.status(200).json(test)

  })
})

// --- CRUD ACTUALIZAR ---

app.post('/actualizar', function(req, res, next){

  var email = req.body.email
  var password = req.body.password

  crud.actualizar_usuario(email, password, function(test){
    
    console.log(JSON.stringify(test));
    return res.status(200).end()

  })   
}) 

// --- CRUD ELIMINAR ---

app.post('/eliminar', function(req, res, next){
  
  var email = req.body.email

  crud.eliminar_usuario(email, function(test){
    
    console.log(JSON.stringify(test));
    return res.status(200).end()

  })
}) */ 
