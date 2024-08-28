const express = require('express')
const bodyParse = require('body-parser')
const afile = require("./archivosNodeJS/appendFile")
const rfile = require("./archivosNodeJS/readFile")

const app = express()


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
    extended: true
}))

const port = 3000

app.listen(port, ()=>{
    console.log(`Servidor funcionando en https://localhost:${port}`)
})



// Mostrar ESTUDIANTES 
app.get('/', (req, res)=>{
    rfile.readThisFile("./files/participantes.txt")
})

//AGREGAR
app.post('/agregar', (req, res)=>{

    //crear un archivo
    const estudiantes = `'ci': ci, 'nombre': nombre 'edad': edad 'curso': curso /n`
    //GUIARDAR
    afile.appendToFile("./files/paticipiantes.txt", estudiantes)

    res.status(200).json("Estudiante agregada exitosamente")
})  


//Modificar
app.put('/estudiantes/:id', (req, res)=> {
`
<!DOCTYPE html>
<html>
<head>
    <title>Formulario de Estudiante</title>
</head>
<body>
    <h1>Formulario de Estudiante</h1>
    <form action="/guardar" method="post">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required><br><br>
        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required><br><br>
        <label for="curso">Curso:</label>
        <input type="text" id="curso" name="curso" required><br><br>
        <input type="submit" value="Guardar">
    </form>
    <ul>

    </ul>
</body>
</html>


`
    
   
})