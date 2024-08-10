import '../Styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Articles from './Articles';
import Navbar from './Navbar';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
        <Route path='/' element={<Articles />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
