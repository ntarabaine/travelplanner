import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuLateral from './components/sidebar';
import Home from './components/home';
import Painel from './components/painel';



const App = () => (
  <Router>
    <div className="flex">
      <MenuLateral />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/viagem/:id" element={<Painel/>} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
