import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Result from './pages/Result';
import Rules from './pages/Rules';
import Round from './pages/Round';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Rules' element={<Rules />} />
        <Route path='/Result' element={<Result />} />
        <Route path='/rounds/:round' element={<Round />} />
      </Routes>
    </div>
  );
}

export default App;
