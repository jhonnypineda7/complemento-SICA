const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const encabezadosImportados = require('./encabezados')
let nombreModulo, nombreActividad, archivo;

validar = (nombreModulo, nombreActividad, archivo) => {

    let validado;
    let mensajeValidacion;
    let todosLosEncabezados = []
    const arreglo = encabezadosImportados.headers[nombreModulo][nombreActividad]
    const result = excelToJson({
        sourceFile: archivo
    });

    for (element in result) {
        let valores = result[element]
        todosLosEncabezados.push(Object.values(valores[0]))
    };

    for (let i = 0; i < todosLosEncabezados.length && arreglo.length; i++) {

        let hoja1 = todosLosEncabezados[i], hoja2 = arreglo[i];
        console.log(hoja1 + "!:!" + hoja2)
        // cambiar este if para que compare que los elementos en hoja1 y hoja2 sean los mismos, aunque estén en orden diferente
        if (todosLosEncabezados.length > 1 && arreglo.length > 1) {
            for (let page = 0; page < hoja1.length && hoja2.length; page++) {
                if (hoja1[page] != hoja2[page]) {
                    validado = false
                    console.log(i);
                    break
                } else {
                    validado = true
                };
            }
        } else {
            if (todosLosEncabezados[i] != arreglo[i]) {
                validado = false
                console.log(i);
                break
            } else {
                validado = true
            };
        }
        if (validado === true) {
            console.log("validado")
            mensajeValidacion = `es valido`
        } else {
            console.log("no es valido")
            mensajeValidacion = `no es valido`
            break
        };
    };


};

validar("Liquidacion", "Gestion_Terceros.xlsx", `Formatos/Liquidacion/Gestion_Terceros.xlsx`)
