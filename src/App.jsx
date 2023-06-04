import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/coins/:id' element={<CoinPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
