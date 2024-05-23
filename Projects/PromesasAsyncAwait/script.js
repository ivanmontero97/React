
// ----------------------------------------------------------------- Ejercicio 1 ---------------------------------------
function isDivisibleByTwo(number) {
    return new Promise((resolve, reject) => {
        if (number % 2 === 0) {
            resolve(`El número ${number} es divisible entre dos.`);
        } else {
            reject(`El número ${number} NO es divisible entre dos.`);
        }
    });
}

// -------------------------------------------------- Formas sincrona --------------------------------------------------------
//  let par = isDivisibleByTwo(4)
//  let impar =  isDivisibleByTwo(5) //Como no uso un catch no estoy manejando el reject de esta promise

// isDivisibleByTwo(4)
//     .then(data=>console.log(data))
//     .catch(error=>console.log(error));

// isDivisibleByTwo(5)
//     .then(data=>console.log(data))
//     .catch(error=>console.log(error)); //Aqui en cambio si manejo el reject

// -----------------------------------------------Forma asincrona -----------------------------------------------------------------
async function checkDivisibility() {
try{
    const par =await isDivisibleByTwo(4)
    console.log(par)

} catch (error){
    console.log(error)
}
//Otro try catch para manejar los errores de cada promesa por separado. Realmente al ser la misma promesa se podría hacer todo dentro del mismo bloque pero es por poner el ejemplo
try{
    const impar =await isDivisibleByTwo(5)
    console.log(impar)

} catch (error){
    console.log(error)
}

}

// checkDivisibility();


// ---------------------------------------------------- Ejercicio 2 -----------------------------------------------------
function checkValue (value){
    return new Promise((resolve,reject) => {
        if(value >= 0 && value <10){
            resolve(`El valor ${value} esta en el rango de [0,10)`);
        } else {
            reject(`El valor ${value} esta fuera del rango de [0,10)`);
        }
    });
}

// ------------------------------------------------- Forma sincrona -------------------------------------------------------------------------
// let value1=1;
// let value2=11;
// const valueToCheck =  checkValue(value1)
// const valueToCheck2 = checkValue(value2)

// valueToCheck
//     .then(message=> console.log(message))
//     .catch(error => console.log(error))

// valueToCheck2
//     .then(message=>console.log(message))
//     .catch(error=>console.log(error))  //Aqui al usar catch si estoy manejando el reject de la promise y el error no se propaga.

// ------------------------------------------------- Forma asincrona -------------------------------------------------------------------------
async function checkValuesAsync() {
    try{
        const value =await checkValue(1)
        console.log(value)
        const value2 =await checkValue(11)
        console.log(value2)
    } catch (error){
        console.log(error)
    }
}    

//  checkValuesAsync();
// ------------------------------------------------ APARTADO APARTE PARA ENTENER EL PROMISE.ALL -----------------------------------------------------------------------
//Si solo pongo promesas que se resuelven devolvera un array con las promesas resueltas
//Para ver el ejemplo bien hay que descomentar las partes sincronas del ejercicio 1 y 2

// Promise.all([par,valueToCheck])
//     .then(response => response.forEach((element)=>
//         console.log("Promesa resuelta en Promise.All : " + element)
//     ))
//     .catch(error => console.log(error))
// //Si pongo una promesa que no se resuelve y entra en el reject , promise.all solo me devolvera la promesa que no se resuelve con su reject.
// Promise.all([par,valueToCheck,valueToCheck2])
//     .then(response => response.forEach((element)=>
//         console.log(element)
//     ))
//     .catch(error => console.log("Promise.All cuyo Array de promesas no se resuelve :" + error))


// --------------------------------------------------------------------- EJERCICIO 3 --------------------------------------------------------------
function esVocal(letra){
    return new Promise((resolve,reject)=>{
        let arr = ['a','e','i','o','u']
        arr.forEach((item)=> {
            if(item === letra){
                resolve(`La letra ${letra} es una vocal`)
            }
        })
        reject(`La letra ${letra} NO es una vocal`)
    })
}

async function checkEsVocal(){
    try{
        let vocal = await esVocal('a');
        console.log(vocal);
        let consonante = await esVocal('b');
        console.log(consonante);
    } catch (error) {
        console.log(error);
    }
}

// --------------------------------------------------------------------- EJERCICIO 4 --------------------------------------------------------------
function divisionPromise(dividendo, divisor) {
    return new Promise((resolve, reject) => {
        if (divisor === 0) {
            reject("Error: No se puede dividir por cero.");
        } else {
            const cociente = dividendo / divisor;
            resolve(`El cociente de la division es ${cociente}`);
        }
    });
}
async function checkDivisionPromise(){
    try{
        let divisionPosible = await divisionPromise (4,4);
        console.log(divisionPosible);
        let divisionImposible = await divisionPromise(4,0);
        console.log(divisionImposible);
    }catch (error){
        console.log(error)
    }
}

//Para que las funciones se ejecuten de la forma deseada , es decir , primero que se resuelvan las promises del ejercicio1 , luego el ejercicio2 , etc. Si no me devuelve desordenado los resultados por consola
// Encadenar las llamadas de las funciones async para asegurar el orden deseado
async function runExercises() {
    console.log("Ejercicio 1 : ")
    await checkDivisibility();
    console.log("Ejercicio 2 : ")
    await checkValuesAsync();
    console.log("Ejercicio 3 : ")
    await checkEsVocal();
    console.log("Ejercicio 4 : ")
    await checkDivisionPromise();
}

// Llamar a la función que ejecuta ambas tareas en el orden deseado
runExercises();