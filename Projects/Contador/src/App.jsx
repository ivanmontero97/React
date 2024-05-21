import {Button} from './components/Button'
import React from 'react'
import { useState } from 'react'


//React.Fragment equivale a <> </>
export function App(){
    const [numClics,setNumClics]= useState(0);
    
    const incrementNum = () => {
        console.log("Se ha incrementado el contador en 1");
        setNumClics(numClics + 1);
      };
    
      const reiniciarNum = () => {
        console.log("Contador reiniciado a 0");
        setNumClics(0);
      };

    return(
        <React.Fragment>
            <div>Contador: {numClics}</div>
            <Button onClick={incrementNum} esClick={true}>Clicar</Button>
            <Button onClick={reiniciarNum}  esClick={false}>Reiniciar</Button>
        </React.Fragment>
    )
}

