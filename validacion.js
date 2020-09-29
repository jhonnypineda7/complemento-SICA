const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const headers = require('./encabezados')
let nombreModulo, nombreActividad, archivo;

exports.validar = (nombreModulo, nombreActividad, archivo) => {

    let validacionEncabezados;
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

        let celdasActuales = encabezadosTodos[i], celdasPredeterminadas = encabezadosPredeterminados[i];
        if (celdasActuales.length === celdasPredeterminadas.length) {
            for (let j = 0; j < celdasActuales.length; j++) {
                // console.log(celdasActuales[j], "------", celdasPredeterminadas[j])
                for (let k = 0; k < celdasPredeterminadas.length; k++) {
                    if (celdasActuales[j] !== celdasPredeterminadas[k]) {
                        validacionEncabezados = false
                    } else {
                        validacionEncabezados = true
                        console.log(celdasActuales[j], "-----", celdasPredeterminadas[k]);
                        break
                    }
                }
                if (validacionEncabezados === false) {
                    break
                }
            }
        } else {
            console.log("lA CANTIDAD DE CELDAS NO ES CORRECTA")
            validacionEncabezados = false
            break
        }
    };
    if (validacionEncabezados === true) {
        console.log("validado")
        exports.mensajeEvaluacion = `es valido`
    } else {
        console.log("no es valido")
        exports.mensajeEvaluacion = `no es valido:
        las celdas no coinciden`
    };
};