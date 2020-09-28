const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const headers = require('./encabezados')
let nombreModulo, nombreActividad, archivo;

// 
exports.validar = (nombreModulo, nombreActividad, archivo) => {

    let validado;
    let encabezadosTodos = [];
    const arreglo = headers.headers[nombreModulo][nombreActividad]
    const result = excelToJson({
        sourceFile: archivo
    });

    for (element in result) {
        let valores = result[element]
        encabezadosTodos.push(Object.values(valores[0]))
    };
    console.log(encabezadosTodos.length + ":" + arreglo.length);

    for (let i = 0; i < encabezadosTodos.length && arreglo.length; i++) {

        let hoja1 = encabezadosTodos[i], hoja2 = arreglo[i];
        if (hoja1.length === hoja2.length) {
            for (let page = 0; page < hoja1.length; page++) {
                console.log(hoja1[page],"------",hoja2[page])
                for (let elementoAc = 0; elementoAc < hoja2.length; elementoAc++) {
                    if (hoja1[page] !== hoja2[elementoAc]) {
                        validado = false
                    } else {
                        validado = true
                        console.log(hoja1[page], "-----", hoja2[elementoAc], "  ", elementoAc);
                        break
                    }
                }
                if (validado === false) {
                    break
                }
            }
        } else {
            console.log("lA CANTIDAD DE CELDAS NO ES CORRECTA")
            validado = false
            break
        }
    };
    if (validado === true) {
        console.log("validado")
        exports.evaluacion = `es valido`
    } else {
        console.log("no es valido")
        exports.evaluacion = `no es valido:
        las celdas no coinciden`
    };
};