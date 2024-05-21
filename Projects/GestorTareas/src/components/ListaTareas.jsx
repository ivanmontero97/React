import { useState } from "react"
import {FormularioTareas} from './FormularioTareas'
import { Tarea } from "./Tarea";


export function ListaTareas(){
const [tareas,setTareas]=useState([]);
console.log("Número de tareas actuales " + tareas.length + " hasta que no se vuelva a renderizar el componente no se actualizará el estado");
tareas.forEach((tarea) => {
    console.log ("Tarea con id : " + tarea.id +" Descripcion : " + tarea.text +"Completada : " + tarea.completada);     
})

const afegirTarea= (tasca) => {
    const nuevaTarea ={
        ...tasca, // Utiliza el operador de propagación para copiar todas las propiedades de tasca al nuevo objeto nuevaTarea.
        id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1, // Asignar un ID único a la nueva tarea
        text: tasca.text,
        completada: false // Inicializar la propiedad 'completada' como false   
    };
    console.log ("Nueva Tarea creada con id : " + nuevaTarea.id +" Descripcion : " + nuevaTarea.text +" Completada : " + nuevaTarea.completada);     
    setTareas([...tareas, nuevaTarea]) // Actualizar el estado tareas con la nueva tarea

}

const eliminarTarea = id => {
    const tasquesRestants = tareas.filter( (tarea) => tarea.id !== id)
    setTareas(tasquesRestants);
}

const completarTarea = (id) => {
    const nuevaTarea = tareas.map((tarea) => {
        if (tarea.id === id) {
          return { ...tarea, completada: !tarea.completada };
        }
        return tarea;
      });
    setTareas(nuevaTarea);
}

return(
        <>
        <h1>Lista de Tareas : </h1>
        <FormularioTareas afegirTarea={afegirTarea} />
        <div className="Tareas">
        {tareas.map((tarea) => (
                <Tarea 
                key={tarea.id} 
                tarea={tarea} 
                completarTarea={completarTarea} 
                eliminarTarea={eliminarTarea}
                />
            ))}
        </div>
        </>
    )
}