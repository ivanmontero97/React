import  { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Shared.css'
export function Welcome(){
const[userName,setUserName]=useState('');
const[existingName, setExistingName]=useState(false);
const [errorMessage, setErrorMessage] = useState('');

const changeTextWelcome = e => {
    e.preventDefault();
    if(userName !== ''){
        setExistingName(true);
    } else {
        setErrorMessage('Debes introducir un nombre válido');
    }
  };

const validateUserName = !existingName ? (
<>
    <h2>Introduce tu nombre de usuario :</h2>
    <input type="text" onInput={(e)=>setUserName(e.target.value)} value={userName}    /> 
    <button onClick={changeTextWelcome}> Enviar</button>
    {errorMessage && <p className="error" >{errorMessage}</p>}

</>
)
:
(
    <>
        <h1>Bienvenido {userName}</h1>
        <Link to="/indexMenu">Peliculas para verano</Link>    
    </>
);

  return (
    <>
        <div className="card">
            {validateUserName}
        </div>
    </>
  );
}
  