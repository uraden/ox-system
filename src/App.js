import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProductsPage from './components/ProductsPage';
import ProductSearch from './components/ProductSearch';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/search" element={<ProductSearch />} />
        </Routes>
    </div>
  );
}

export default App;
