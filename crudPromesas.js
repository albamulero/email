const mysql = require('mysql')
const bcrypt = require ('bcrypt')
const util = require('util')

const makeid = require('./utilidades/util')
const nodemail = require('./nodemail')

// Conectamos a la DB y defenimos los valores

let HOST = '65.99.225.55'
let database_name = 'mailshi1_alba'
let database_user = 'mailshi1_alba'
let database_password = 'Suerte05alba'

/////////////////////////
// CRUD ALTA USUARIOS //
///////////////////////

// --- CRUD ALTA USUARIO ---

async function altaUsuario (email, password, id, empresa, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    //  NODE NATIVE PROMISIFY

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        const hash = bcrypt.hashSync(password, 10);         // Encriptar password
        console.log(hash);

        var id = makeid.makeid()

        sql = `INSERT INTO usuarios (email, password, id, empresa) VALUES ('${email}','${hash}','${id}', '${empresa}')`            // SQL (En caso de que no exista va insertar los varoles en la DB)
        let result = await query(sql)
        console.log(result);

        message = 'Se ha realizado con exito la operacion'
        success = true

        nodemail.enviarCorreo(email)         // Aqui voy a enviar un correo al nuevo usuario

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`, 'password':`${password}`, 'id':`${id}`, 'empresa':`${empresa}`})

    }
}

// --- CRUD MOSTAR USURIO ---

async function mostrarUsuario (email, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        let sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El usuario introducido no existe'
            success = false 
            
        } else {

            message = 'Usuario encontrado'
            success = true
                       
        }

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`})

    }
}

// --- CRUD ACTUALIZAR USUARIO ---

async function actualizarUsuario (email, password, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a la DB

    try {

        const hash = bcrypt.hashSync(password, 10);         // Encriptar password
        console.log(hash);

        let sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El usuario no existe'
            success = false

        } else {
            
            sql = `UPDATE usuarios SET password = '${hash}' WHERE email = '${email}'`           // SQL (Actualizaremos la contraseña del email introducido)
            result = await query(sql)

            message = 'Contraseña actualizada con exito'
            success = true
        }

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`, 'password':`${password}`})

    }
}

// --- CRUD ELIMINAR USUARIO ---

async function eliminarUsuario (email, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB

    try {

        let sql = `SELECT * FROM usuarios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El email introducido no existe'
            success = false

        } else {

            sql = `DELETE FROM usuarios WHERE email = '${email}'`           // Instruccion SQL (Eliminara el email introducido si existe)
            result = await query(sql)

            message = 'Email eliminado con exito'
            success = true

        } 

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`})

    }
}

///////////////////////////
// CRUD CORREO ALEATORIO //
//////////////////////////

// --- CRUD ALTA USUARIO ---

async function alta ( id, email, nombre, apellido, pais, id_usuarios, callback) {

    // Generar el id del usuario
    id = makeid.makeid()

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    //  NODE NATIVE PROMISIFY

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        sql = `INSERT INTO correos_aleatorios (id, email, nombre, apellido, pais, id_usuarios) VALUES ('${id}','${email}', '${nombre}', '${apellido}', '${pais}', '${id_usuarios}')`            // SQL (En caso de que no exista va insertar los varoles en la DB)
        let result = await query(sql)
        console.log(result);

        message = 'Se ha realizado con exito la operacion'
        success = true

        nodemail.enviarCorreo(email)         // Aqui voy a enviar un correo al nuevo usuario

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`,'id':`${id}`, 'email':`${email}`, 'nombre':`${nombre}`, 'apellido':`${apellido}`, 'pais':`${pais}`, 'id_usuarios':`${id_usuarios}`})
        
        
    }
}

// --- CRUD MOSTAR USUARIO ---

async function mostrar (id_usuarios, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB
    
    try {

        let sql = `SELECT * FROM correos_aleatorios WHERE id_usuarios = '${id_usuarios}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'Correo no encontrado' 
            resultado = null
            
        } else {

            message = 'Correos encontrados'
            success = true
            resultado = result
            console.log(resultado[0].id_usuarios);
                       
        }

    } catch (err) {

        message = err.sqlMessage
        success = false
        resultado = null

    } finally {

        callback(resultado)

        conexion.end()

        //callback({'success':`${success}`, 'message':`${message}`, 'id_usuarios':`${id_usuarios}`, 'resultado':`${resultado}`})
        
    }
}

// --- CRUD ACTUALIZAR USUARIO ---

async function actualizar (nombre, apellido ,email, pais, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a la DB

    try {

        let sql = `SELECT * FROM correos_aleatorios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El usuario no existe'
            success = false

        } else {

            sql = `UPDATE correos_aleatorios SET nombre = '${nombre}', apellido = '${apellido}', pais = '${pais}' WHERE email = '${email}'`           // SQL (Actualizaremos la contraseña del email introducido)
            result = await query(sql)

            message = 'Actualizado con exito'
            success = true
        }

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'nombre':`${nombre}`, 'apellido':`${apellido}` , 'email':`${email}`, 'pais':`${pais}`})

    }
} 

// --- CRUD ELIMINAR USUARIO ---

async function eliminar (email, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB

    try {

        let sql = `SELECT * FROM correos_aleatorios WHERE email = '${email}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)        

        if (result.length == 0) {

            message = 'Usuario no encontrado'
            success = false 

        } else {

            sql = `DELETE FROM correos_aleatorios WHERE email = '${email}'`           // Instruccion SQL (Eliminara el email introducido si existe)
            console.log(sql);
            result = await query(sql)

            message = 'Email eliminado con exito'
            success = true

        } 

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'email':`${email}`})

    }
}

///////////////////////////////
// CRUD CONFIGURACION EMAIL //
/////////////////////////////

async function alta_config_email(hostConfig, portConfig, emailConfig, smtpencrytionConfig, smptauthencationConfig, usernameConfig, passwordConfig, id_usuarios,  callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user:database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a ls DB

    try {

        const hash = bcrypt.hashSync(passwordConfig, 10)       // Encriptamos el password
        console.log(hash);

        let sql = `INSERT INTO SMPT_configuracion (host, port, send_mail, SMTP_encryption, SMTP_authentication, username, password, id_usuarios) VALUES ('${hostConfig}','${portConfig}', '${emailConfig}', '${smtpencrytionConfig}', '${smptauthencationConfig}', '${usernameConfig}', '${hash}', '${id_usuarios}')`
        let result = await query(sql)

        message = 'Se ha realizado la operacion con exito'
        success = true

    } catch(err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'hostConfig':`${hostConfig}`, 'portConfig':`${portConfig}`, 'emailConfig':`${emailConfig}`, 'smtpencrytionConfig':`${smtpencrytionConfig}`, 'smptauthencationConfig':`${smptauthencationConfig}`, 'usernameConfig':`${usernameConfig}`, 'passwordConfig':`${passwordConfig}`, 'id_usuarios':`${id_usuarios}`})
        
    }
}

async function actualizar_config_email(hostConfig, portConfig, emailConfig, smtpencrytionConfig, smptauthencationConfig, usernameConfig, passwordConfig, id_usuarios, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user:database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a ls DB

    try {

        let sql = `UPDATE SMPT_configuracion SET host = '${hostConfig}', port = '${portConfig}', send_mail = '${emailConfig}', SMTP_encryption = '${smtpencrytionConfig}', SMTP_authentication = '${smptauthencationConfig}', username = '${usernameConfig}', password = '${passwordConfig}', id_usuarios = '${id_usuarios}' `
        await query(sql)

        message = 'Actualizado con exito'
        success = true

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        callback({'success':`${success}`, 'message':`${message}`, 'hostConfig':`${hostConfig}`, 'portConfig':`${portConfig}`, 'emailConfig':`${emailConfig}`, 'smtpencrytionConfig':`${smtpencrytionConfig}`, 'smptauthencationConfig':`${smptauthencationConfig}`, 'usernameConfig':`${usernameConfig}`, 'passwordConfig':`${passwordConfig}`, 'id_usuarios':`${id_usuarios}`})

    }    

}

async function mostrar_config_email(id_usuarios, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user:database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a ls DB

    try {

        let sql = `SELECT * FROM SMPT_configuracion WHERE id_usuarios = '${id_usuarios}'`
        let result = await query(sql)

        if (result.length == 0) {

            message = 'El formulario esta vacio'
            resultado = result
        
        } else {

            message = 'El formulario esta completo'
            success = true

            resultado = result
            console.log(resultado);
        }

    } catch (err) {

        message = err.sqlMessage
        success = false
        resultado = null

    } finally {

        conexion.end()
        
        callback(resultado)
        
    }
    
}

/////////////////////////
// CRUD CREAR CAMPAÑA //
///////////////////////

async function alta_crear_campanya(id, descripcionCorta, descripcionLarga, plantilla, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user:database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a ls DB

    try {

        // split() --> Divide el texto y crea un array
        let str = plantilla.split("\n")
        let porcentaje = str.length / 100

        for (n = 0; n < str.length; n++) {

            let linea  = encodeURI(str[n].trim())

            let sql = `INSERT INTO plantillas_correo (id, descripcion_corta, descripcion_larga, html_fila) VALUES ('${id}','${descripcionCorta}', '${descripcionLarga}', "'${linea}'")`
            await query(sql)
            console.log((n / str.length)/100)


        }

        message = 'Se ha realizado la operacion con exito'
        success = true

    } catch(err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'id':`${id}`, 'descripcion_corta':`${descripcionCorta}`, 'descripcion_larga':`${descripcionLarga}`, 'plantilla':`${plantilla}`})
        
    }
}

async function actualizar_campanya(id, descripcionCorta, descripcionLarga, plantilla, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user:database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a ls DB

    try {

        let sql = `SELECT * FROM plantillas_correo WHERE id = '${id}'`         // SQL (Buscara si existe el email que introducen)
        let result = await query(sql)
        console.log(id);

        if (result.length == 0) {

            message = 'El usuario no existe'
            success = false
        
        } else {
        
            sql = `UPDATE plantillas_correo SET descripcion_corta = '${descripcionCorta}', descripcion_larga = '${descripcionLarga}', plantilla = '${plantilla}' WHERE id = '${id}'`
            result = await query(sql)
            console.log(sql);

            message = 'Actualizado con exito'
            success = true

        } 

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        callback({'success':`${success}`, 'message':`${message}`, 'id':`${id}`, 'descripcion_corta':`${descripcionCorta}`, 'descripcion_larga':`${descripcionLarga}`, 'plantilla':`${plantilla}`})

    }
}

async function mostrar_campanya(callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user:database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)         // Conexion a la DB

    try {

        // sql = `SELECT * FROM plantillas_correo`

        let sql = `SELECT DISTINCT id, descripcion_corta, descripcion_larga FROM plantillas_correo`
        console.log(sql);
        result = await query(sql)

        
        console.log(result);

        if (result.length == 0) {

            message = 'El formulario esta vacio'
            resultado = result
        
        } else {

            message = 'El formulario esta completo'
            success = true

            resultado = result
            console.log(resultado);
        }

    } catch (err) {

        message = err.sqlMessage
        success = false
        resultado = null

    } finally {

        conexion.end()
        
        callback(resultado)
        
    }
    
}

async function eliminar_campanya(id, callback) {

    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user: database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion)          // Conexion a la DB

    try {

        let plantilla = 0
        
        for (i = 0; i < plantilla.length; i++) {

            let sql = `SELECT * FROM plantillas_correo WHERE id = '${id}'`
            await query(sql)        
        }
        
        if (result.length == 0) {

            message = 'No se ha podido eliminar'
            success = false 

        } else {

            sql = `DELETE FROM plantillas_correo WHERE id = '${id}'`
            result = await query(sql)

            message = 'Eliminado con exito'
            success = true
        }

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success':`${success}`, 'message':`${message}`, 'id':`${id}`})

    }
}


////////////////////////
// ENVIO DE CAMPAÑAS //
//////////////////////

async function mostrar_envio_campanya(id_usuarios, id, callback) {
    
    const conexion = mysql.createConnection({
        host: HOST,
        database: database_name,
        user:database_user,
        password: database_password
    })

    const query = util.promisify(conexion.query).bind(conexion) 

    try {

        sql = `INSERT INTO envio_campanya (id_usuarios, id_campanya) VALUES ('${id_usuarios}', '${id}')`
        result = await query(sql)

        message = 'Campaña agregada'
        success = true

        

    } catch (err) {

        message = err.sqlMessage
        success = false

    } finally {

        conexion.end()

        callback({'success': `${success}`, 'message':`${message}`, 'id_usuarios':`${id_usuarios}`, 'id_campaya':`${id}`})
    }
}

module.exports = {
    'altaUsuario' : altaUsuario,
    'actualizarUsuario' : actualizarUsuario,
    'mostrarUsuario' : mostrarUsuario,
    'eliminarUsuario' : eliminarUsuario,
    'alta' : alta,
    'actualizar' : actualizar,
    'mostrar' : mostrar,
    'eliminar' : eliminar,
    'alta_config_email' : alta_config_email,
    'actualizar_config_email' : actualizar_config_email,
    'mostrar_config_email' : mostrar_config_email,
    'alta_crear_campanya' : alta_crear_campanya,
    'actualizar_campanya' : actualizar_campanya,
    'mostrar_campanya' : mostrar_campanya,
    'eliminar_campanya' : eliminar_campanya,
    'mostrar_envio_campanya': mostrar_envio_campanya
}