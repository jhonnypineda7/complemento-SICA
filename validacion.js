const excelToJson = require('convert-excel-to-json')
const headers = require('./encabezados')
// 
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
    
    for (let i = 0; i < encabezadosTodos.length && encabezadosPredeterminados.length; i++) {

        let celdasActuales = encabezadosTodos[i], celdasPredeterminadas = encabezadosPredeterminados[i];
        
        if (celdasActuales.length === celdasPredeterminadas.length) {

            for (let j = 0; j < celdasActuales.length; j++) {

                for (let k = 0; k < celdasPredeterminadas.length; k++) {

                    if (celdasActuales[j] !== celdasPredeterminadas[k]) {
                        validacionEncabezados = false
                    } else {
                        validacionEncabezados = true
                        break
                    }
                }

                if (validacionEncabezados === false) {
                    break
                }
            }
        } else {
            validacionEncabezados = false
            break
        }
    };

    if (validacionEncabezados === true) {
        console.log(archivo);
        exports.mensajeEvaluacion = `--Es valido--`
    } else {
        exports.mensajeEvaluacion = `No es valido: las celdas no coinciden`
    };
};