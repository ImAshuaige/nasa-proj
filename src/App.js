import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import NasaPhoto from "./components/NasaPhoto";

//adding comment - mehak
//adding comment - Hester
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" exact />
        <Route Component={NasaPhoto} path="/nasaphoto" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
