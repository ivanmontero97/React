import {Route,Routes} from "react-router-dom";
import { Welcome } from './components/pages/Welcome';
import { IndexMenu } from "./components/pages/IndexMenu";
import { MoviesList } from "./components/pages/MoviesList";
import { MoviesAdd } from "./components/pages/MoviesAdd";
import { BrowserRouter as Router } from 'react-router-dom';
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Welcome></Welcome>}></Route>
        <Route path="/indexMenu" element={<IndexMenu></IndexMenu>}></Route>
        <Route path="/movies/list" element={<MoviesList></MoviesList>}></Route>
        <Route path="/movies/add" element={<MoviesAdd></MoviesAdd>}></Route>
      </Routes>
    </Router>
  )
}

export default App
