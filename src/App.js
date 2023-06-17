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
          <Route path="/ox-system/products" element={<ProductsPage />} />
          <Route path="/ox-system/search" element={<ProductSearch />} />
        </Routes>
    </div>
  );
}

export default App;
