import "./App.css";
import "./Components/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Signin from './Components/Signin';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home/>}/>
            <Route path='/:name/:id' element={<Home/>}/>
            </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
          <Route path="/Login" element={<Login/>}>
          <Route index element={<Login/>}/>
            <Route path=':username' element={<Login/>}/>
            </Route>
          <Route path='/Signin' element={<Signin/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
