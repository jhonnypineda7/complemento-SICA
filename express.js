var express = require('express');
var excels = require('./validacion.js');
var bodyParser = require('body-parser');
var multer = require('multer');

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './archivos')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
}),

    upload = multer({ storage }),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/seleccionModulo.html');
})

app.post('/validacion_de_archivos', upload.single('archivo'), (req, res) => {

    // if (req.file.originalname === undefined ) {
    //     next(new Error('Not valid name'));
    // }
    fileName = req.file.originalname
    modulo = req.body.modulo
    excels.validar(modulo, `${fileName}`, `archivos/${fileName}`);
    
    let respuesta = `<h1 style="text-align:center;margin-top:300px;font-family: Arial, Helvetica, sans-serif;"> 
                        <center>${modulo}</center>
                        El archivo: ${fileName}<br>${excels.mensajeEvaluacion}
                        <a href="https://pruebadevalidacion.herokuapp.com/"><br><br>
                        <button style="font-size:25px; border-radius: 10px;">INICIO</button></a>
                    </h1>`

    res.send(respuesta)

});

app.use(function (err, req, res, next) {

    let error = `<h1 style="text-align:center;margin-top:300px;font-family: Arial, Helvetica, sans-serif;">El archivo no coincide con el modulo seleccionado<a href="https://pruebadevalidacion.herokuapp.com/">
                <br><br><button style="font-size:25px; border-radius: 5px;">INICIO</button></a></h1>`

    return res.status(500).send(error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);


