const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const headers = require('./encabezados')
let nombreModulo, nombreActividad, archivo;

// 
exports.validar = (nombreModulo, nombreActividad, archivo) => {

    let validacionEncabezado;
    let encabezadosTodos = [];
    const encabezadosPredeterminados = headers.headers[nombreModulo][nombreActividad]
    const archivoActual = excelToJson({
        sourceFile: archivo
    });

    for (element in archivoActual) {
        let celdas = archivoActual[element]
        encabezadosTodos.push(Object.values(celdas[0]))
    };
    console.log(encabezadosTodos.length + ":" + encabezadosPredeterminados.length);

    for (let i = 0; i < encabezadosTodos.length && encabezadosPredeterminados.length; i++) {

        let celdasActuales = encabezadosTodos[i], celdasPredetermindas = encabezadosPredeterminados[i];
        if (celdasActuales.length === celdasPredetermindas.length) {
            for (let j = 0; j < celdasActuales.length; j++) {
                for (let k = 0; k < celdasPredetermindas.length; k++) {
                    if (celdasActuales[j] !== celdasPredetermindas[k]) {
                        validacionEncabezado = false
                        console.log(celdasActuales[j], "-----", celdasPredetermindas[k], "  ", k);

                    } else {
                        validacionEncabezado = true
                        console.log(celdasActuales[j], "-----", celdasPredetermindas[k]);
                        break
                    }
                }
                if (validacionEncabezado === false) {
                    break
                }
            }
        } else {
            console.log("lA CANTIDAD DE CELDAS NO ES CORRECTA")
            validacionEncabezado = false
            break
        }
    };
    if (validacionEncabezado === true) {
        console.log("validacionEncabezado")
        exports.mensajeEvaluacion = `es valido`
    } else {
        console.log("no es valido")
        exports.mensajeEvaluacion = `no es valido:
        las celdas no coinciden`
    };
};