//Framework para crear un servidor facilmente
const express = require('express')

//Pluggin para leer archivos
const fs = require('fs')

//iniciamos el servidor web desde el metodo express
const app = express()
const isEmail = require("is-email")
//middlewares
app.use(express.json())



//rutas
app.get('/usuarios/:id?', (request, response) => {
    /*  console.log(" ")
     console.log(request.params.id) */
    //response.send('Desde GET Usuario')
    let usuarios = JSON.parse(fs.readFileSync('src/db/usuarios.json', 'utf8'))
    // creamos un arreglo vacio
    let resp = []

    //si el parametro "nombre" no existe
    if (request.params.id) {
        usuarios.map((value) => {   //recorremos el 
            if (request.params.id == value.id) {
                //aqui se encontro una coincidencia
                resp.push(value)
            }
        })
    } else {
        resp = usuarios
    }

    response.json(resp)
})

app.post('/usuarios', (request, response) => {
    /* console.log("") */
    var isEmail = require("is-email")
    let resp = []
    let id = 1;
    let usuarios = JSON.parse(fs.readFileSync('src/db/usuarios.json', 'utf8'))

    if (!isEmail(request.body.Email)) {
        response.send('Campo Email es requerido o falta "@" ')
    } else {

        /*  console.log(request.body.email) */
        if (request.body.Nombres != undefined && request.body.Nombres !=" ") {
            if (request.body.Apellidos != undefined && request.body.Apellidos !=" ") {
                if(request.body.Celular != undefined && request.body.Celular !=" "){
                    
                usuarios.map((value) => {   //recorremos el 
                    request.body.id = usuarios.length + 1
                    if (value.id) {
                        if (value.id > id) {
                            id = value.id
                        }
                    }
                    /*  console.log(request.body.Nombres) */
                    if (request.body.Email == value.Email) {
                        //aqui se encontro una coincidencia
                        resp.push(value)
                    }
                })
                usuarios.push(request.body)
                fs.writeFileSync('src/db/usuarios.json', JSON.stringify(usuarios)) // funcion para escribir en el archivo

                //console.log(request, body)
            }else{
                //response.send('es post')
                response.send("Campo Celular es requerido")
            }
            } else {
                //response.send('es post')
                response.send("Campo Apellido es requerido")
            }
        } else {
            //response.send('es post')
            response.send("Campo Nombre es requerido")
        }
        response.json(usuarios)
    }
    
})

app.delete('/usuarios/:id', (request, response) => {
    //response.send('respuesta de DELETES')
    let id = request.params.id //para recuperar
    let usuarios = JSON.parse(fs.readFileSync('src/db/usuarios.json', 'utf8'))
    let index

    usuarios.map((value, i) => {
        if (value.id == id) {
            index = i
        }
    })
    usuarios.splice(index, 1)

    fs.writeFileSync('src/db/usuarios.json', JSON.stringify(usuarios)) // funcion para escribir en el archivo

    response.json(usuarios)

})

app.put('/usuarios/:id', (request, response) => {  //el put es para actualizar un recurso
 /*    console.log("test")
    console.log(request.id) */
    //response.send('respuesta desde PUT')
    let id = request.params.id //para recuperar
    let usuarios = JSON.parse(fs.readFileSync('src/db/usuarios.json', 'utf8'))
    let index

    usuarios.map((value, i) => {
        if (value.id == id) {
            index = i
        }
    })

    usuarios[index] = request.body
    usuarios[index].id = id
    fs.writeFileSync('src/db/usuarios.json', JSON.stringify(usuarios)) // funcion para escribir en el archivo
    response.json(usuarios)
})

//Metodo que permite al servidor web escuchar en un puerto especifico
app.listen(3000, () => {
    console.log('el servidor esta ejecutando en http://localhost:3000/')
})