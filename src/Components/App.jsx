import '../Styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Articles from './Articles';
import Navbar from './Navbar';
import ArticleDetails from './ArticleDetails';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
        <Route path='/' element={<Articles />}/>
        <Route path='/article/:title' element={<ArticleDetails />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
