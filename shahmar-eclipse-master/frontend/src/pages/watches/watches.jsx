import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import ProductDetail from '../products/productDetail/productDetail';
import "./watches.scss";
import myData from '../../data.js';
import { GiShoppingCart } from "react-icons/gi";
import { increment } from "../../features/basketSlice.js";
import { useSelector, useDispatch } from 'react-redux'
import { addWishListItem, removeWishListItem } from "../../features/wishlistSlice.js";


const Products = () => {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [brandFilter, setBrandFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const loadProducts = () => {
      setProductsData(myData);
      setFilteredProducts(myData);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let products = [...productsData];

    if (brandFilter !== 'All') {
      products = products.filter(product => {
        const productTitle = product.title || '';
        return productTitle.toLowerCase().includes(brandFilter.toLowerCase());
      });
    }

    if (categoryFilter !== 'All') {
      products = products.filter(product => product.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (searchQuery) {
      products = products.filter(product => {
        const productTitle = product.title || '';
        return productTitle.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    if (sortOption === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(products);
    setCurrentPage(1);
  }, [sortOption, brandFilter, categoryFilter, searchQuery, productsData]);


  const dispatch = useDispatch()
  const wishListItems = useSelector(state => state.wishList.wishListItems);

  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleBrandChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleWishlist = (product) => {
    if (wishListItems.some(item => item.id === product.id)) {
      dispatch(removeWishListItem(product.id));
    } else {
      dispatch(addWishListItem(product));
    }
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className='sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] my-10 mx-auto'>
      <div className={selectedProduct ? "blurred" : ""}>
        <div className="flex flex-col justify-between items-center">
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold inline-block">All Watches</h2>
          </div>
          <div className="mt-4 w-full flex flex-col md:flex-row justify-between gap-5 items-center">
            <div className='flex justify-between gap-x-2 '>
              <select className="cursor-pointer border px-5 py-1 rounded-md" value={brandFilter} onChange={handleBrandChange}>
                <option value="All">All Brands</option>
                <option value="Rolex">Rolex</option>
                <option value="Cartier">Cartier</option>
                <option value="Hublot">Hublot</option>
                <option value="Hamilton">Hamilton</option>
                <option value="Ulysse Nardin">Ulysse Nardin</option>
              </select>
              <select className="cursor-pointer border px-5 py-1 rounded-md" value={categoryFilter} onChange={handleCategoryChange}>
                <option value="All">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className='flex justify-between gap-x-2'>
              <select className="cursor-pointer border px-5 py-1 rounded-md w-[163px]" value={sortOption} onChange={handleSortChange}>
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border px-5 py-1 rounded-md w-full md:mb-0"
              />
            </div>
          </div>
          <div className="w-full mt-10 mb-7">
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {currentProducts.length === 0 ? (
                  <p className="mx-auto col-span-4 text-center text-lg text-gray-500">No products found</p>
                ) : (
                  currentProducts.map(product => (
                    <div key={product.id} className="flex flex-col">
                      <div className="relative">
                        <div className="bg-white shadow-md rounded-lg duration-500 hover:shadow-xl border overflow-hidden">
                          <div>
                            <div className='cursor-pointer overflow-hidden flex justify-center items-center w-full '>
                              <img src={product.productPic} alt="Product" className="hover:scale-105 duration-500 object-cover lg:w-full sm:w-40 w-28" />
                            </div>
                            <div className="cursor-auto px-5">
                              <p className="sm:text-lg text-xs font-bold text-black truncate block capitalize">{product.title}</p>
                              <span className="text-gray-400 mr-3 uppercase text-xs">{product.category}</span>
                              <div className="flex items-center">
                                <p className="sm:text-lg text-xs font-semibold text-black cursor-auto my-2">${product.price}</p>
                                <div className="ml-auto flex gap-2 items-center">
                                  <button onClick={() => openProductDetail(product)} aria-label="view" className="text-md sm:text-2xl">
                                    <HiOutlineEye />
                                  </button>
                                  <button aria-label="wishlist" className="text-sm sm:text-xl" onClick={() => toggleWishlist(product)}>
                                    {wishListItems.some(item => item.id === product.id) ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
                                  </button>
                                  <button className='text-md sm:text-2xl'>
                                    <GiShoppingCart onClick={() => dispatch(increment(product))} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <nav>
                  <ul className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index + 1}>
                        <button
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-[#C4932C] text-white' : 'bg-white text-black'}`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <div className="product-detail-overlay">
          <ProductDetail product={selectedProduct} onClose={closeProductDetail} />
        </div>
      )}
    </div>
  );
};




export default Products;








