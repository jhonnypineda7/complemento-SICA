var express = require('express');
var excels = require('./validacion.js');
<<<<<<< HEAD
var bodyParser = require('body-parser');
var multer = require('multer');
=======
var body_parser = require('body-parser');
var multer = require('multer')
app.use(body_parser.urlencoded({ extended: true }));
>>>>>>> fdf14f607d686fac19bf9f6e21ff67618f8e1c9b

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './archivos')
    },
    filename: function (req, file, cb) {
<<<<<<< HEAD
        cb(null, file.originalname)
=======
        cb(null, file.originalname) // Le pasamos el nombre original del archvio
>>>>>>> fdf14f607d686fac19bf9f6e21ff67618f8e1c9b
    }
}),

    upload = multer({ storage }),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
<<<<<<< HEAD
    res.sendFile(__dirname + '/validacion.html');
})

app.post('/validacion_de_archivos', upload.single('archivo'), (req, res) => {
    fileName = req.file.originalname
    modulo = req.body.modulo
    excels.validar(modulo, fileName, `archivos/${fileName}`);
    res.send(`<h1 style="text-align:center;margin-top:300px;font-family: Arial, Helvetica, sans-serif;"> 
                El archivo:${fileName}<br>${excels.evaluacion} 
                <a href="http://localhost:3000/"><br>
                <button style="font-size:25px; border-radius: 10px;">INICIO</button></a>
              </h1>`
    )
});
=======
    res.sendFile(__dirname + '/seleccionModulo.html');
})

app.post('/validacion_de_archivos', upload.single('archivo'), (req, res) => {
    arc = req.file.originalname
    excels.validar('Analisis', arc, `archivos/${arc}`)
    res.send('Archivo subido correctamente: ' + req.file.originalname +
        '<h1>' + `${excels.evaluacion}` + '<br>' + '<a href="http://localhost:3000/"><button>volver</button></a></h1>')
})
>>>>>>> fdf14f607d686fac19bf9f6e21ff67618f8e1c9b

app.listen(3000, () => {
    console.log('http://localhost:3000...');
});
