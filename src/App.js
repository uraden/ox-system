import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProductsPage from './components/ProductsPage';
import ProductSearch from './components/ProductSearch';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/ox-system" element={<LoginPage />} />
          <Route path="/ox-system/products" element={<ProductsPage />} />
          <Route path="/ox-system/search" element={<ProductSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
