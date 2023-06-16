import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";

import './ProductPage.css';

const ProductsPage = () => {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://toko.ox-sys.com/variations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          params: {
            page: currentPage,
          },
        });

        if (response.status === 200) {
          setProducts(response.data.items);
          setTotalPages(Math.ceil(response.data.total_count / 100)); 
        } else {
          console.log(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const handleNavigateToAnotherPage = () =>{
    navigate('/search')
  }

  const handleNavigateLoginPage = () =>{
    navigate('/')
    }

  return (
    <> 
    {localStorage.length > 0 ? (    <div>
    <h3>Mahsulotlar roʻyxati / <span className='navigate-to-page' onClick={handleNavigateToAnotherPage}>Mahsulot qidirish</span></h3>
    {products.length === 0 ? (
      <ScaleLoader color='#f44336' loading={true} size={150} />
    ) : (<div>
      <div className='table-container'>
      <table className='table-child'>
        <thead className='table-head'>
          <tr>
            <th>SKU</th>
            <th>Yetkazib beruvchi</th>
            <th>Shtrix-kod</th>
            <th>Mahsulot nomi</th>
            <th>Mahsulot tavsifi</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.supplier}</td>
              <td>{product.productName}</td>
              <td>{product.barcode}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
            href="#"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div> )}
    </div>) : (
        <div className='login-error'>
            <h3>Siz saytdan foydalanish uchun tizimga kiring. <span className='navigate-to-page' onClick={handleNavigateLoginPage}>Kirish sahifasi </span> </h3>
        </div>
    )}
    </>
  );
};

export default ProductsPage;
