import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import Results from "./Results";
import About from "./About";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/game'} element={<Game/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/results'} element={<Results/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
