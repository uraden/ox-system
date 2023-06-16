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
          <Route exact path="" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/search" element={<ProductSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
