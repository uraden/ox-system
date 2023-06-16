import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./ProductPage.css";

const ProductSearch = () => {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
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
            "Content-Type": "application/json",
            Accept: "application/json",
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

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const handleNavigateToAnotherPage = () => {
    navigate("/products");
  };

  const handleNavigateLoginPage = () =>{
    navigate('/ox-system')
    }

  return (
    <>
    {localStorage.length > 0 ? (<div>
      <h3>
        <span
          className="navigate-to-page"
          onClick={handleNavigateToAnotherPage}
        >
          Mahsulotlar roʻyxati{" "}
        </span>
        / Mahsulot qidirish
      </h3>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Mahsulot nomi bo'yicha qidirish"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="eeeeeeeee">
        {products.length === 0 ? (
          <ScaleLoader color="#f44336" loading={true} size={150} />
        ) : (
          <div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Yetkazib beruvchi</th>
                    <th>Mahsulot nomi</th>
                    <th>Shtrix-kod</th>
                    <th>Mahsulot tavsifi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
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
                  className={`page-link ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>) : (<div className='login-error'>
            <h3>Siz saytdan foydalanish uchun tizimga kiring. <span className='navigate-to-page' onClick={handleNavigateLoginPage}>Kirish sahifasi </span> </h3>
        </div>)}
    </>
  );
};

export default ProductSearch;
