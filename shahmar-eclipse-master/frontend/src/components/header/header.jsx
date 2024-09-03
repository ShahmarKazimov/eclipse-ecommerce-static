import React, { useState, useEffect } from "react";
import "./header.css";
import logo from "../../../src/assets/Eclipse-logo.png";
import Cart from "../cart/cart";
import { FiSearch } from "react-icons/fi";
import { getUserData } from "../../requests";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loggedInState } from "../../features/wishlistSlice";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";


const Header = () => {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loggedInCheckout, setLoggedInCheckout] = useState(true)
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBuyWatch, setIsOpenBuyWatch] = useState(false);


  const dispatch = useDispatch()

  const basketData = useSelector((state) => state.counter.basketItems)
  const wishListData = useSelector((state) => state.wishList.wishListItems)

  const uniqueArrayWishList = wishListData.reduce((accumulator, current) => {
    if (!accumulator.find(item => item.id === current.id)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  const uniqueArray = Array.from(
    new Map(basketData.map(item => [item.id, item])).values()
  );

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };


  const logOut = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedIn(false); 
    setLoggedInCheckout(false); 
    dispatch(loggedInState(false)); 
  };
  
  useEffect(() => {
    if (window.location.href === "http://localhost:5174/checkout") {
      window.location.href = "/register";
    }
  }, []); 


  useEffect(() => {
    const fetchUserData = async () => {
      if (window.location.href === "http://localhost:5174/checkout") {
        window.location.href = "/register";
        return;
      }
  
      try {
        const userData = await getUserData();
        if (userData) {
          setUser(userData);
          setLoggedIn(true);
          dispatch(loggedInState(true));
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
        setUser(null);
      }
    };
  
    fetchUserData();
  }, [loggedInCheckout, dispatch]);
  

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpenBuyWatch(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };


  return (
    <div className={`flex w-full justify-center items-center`}>
      <div className={`sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] ${isSticky ? 'fixed top-3 z-10' : 'relative'} w-full rounded-lg justify-center border shadow-md items-center bg-[#ffffff] dark:bg-dark  z-10 ${showHeader ? "" : "hidden-temporary"}`}>
        <div className="flex items-center justify-between py-2">
          <div className="w-28 max-w-full">
            <Link to="/" className="block w-full">
              <img
                src={logo}
                alt="logo"
                className="hidden dark:block pl-5"
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${open && "navbarTogglerActive"} absolute right-5 top-1/2 block -translate-y-1/2 rounded-lg py-[6px] ring-primary lg:hidden`}>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color bg-gray-400"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color bg-gray-400"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color bg-gray-400"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`fixed backdrop-brightness-40 mt-3 z-20 left-0 top-0 w-full max-w-[300px] bg-white lg:p-1 px-7 py-4 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"} `}>
                <ul className="block lg:flex lg:h-full h-[100vh] ">
                  <div className="w-16 mb-5 max-w-full lg:hidden">
                    <Link to="/" className="block w-full">
                      <img
                        src={logo}
                        alt="logo"
                        className="hidden dark:block"
                      />
                    </Link>
                  </div>
                  <div className="lg:hidden">
                    <details>
                      <summary className="cursor-pointer w-max py-2">
                        <span className="hover:text-[#C4932C] duration-300 font-semibold">Buy a Watch</span>
                      </summary>
                      <div className="border pl-[14px] rounded-lg py-2 bg-white absolute text-left space-y-1 w-[81%] pb-3 h-[164px]">
                        <ul className="flex flex-col ml-2 font-semibold space-y-1">
                          <li className="hover:text-[#C4932C] duration-300"><Link to="/rolex">Rolex</Link></li>
                          <li className="hover:text-[#C4932C] duration-300"><Link to="/cartier">Cartier</Link></li>
                          <li className="hover:text-[#C4932C] duration-300"><Link to="/hamilton">Hamilton</Link></li>
                          <li className="hover:text-[#C4932C] duration-300"><Link to="/hublot">Hublot</Link></li>
                          <li className="hover:text-[#C4932C] duration-300"><Link to="/ulysseNardin">Ulysse Nardin</Link></li>
                        </ul>
                      </div>
                    </details>
                  </div>
                  <hr />
                  <div className="lg:hidden">
                    <ListItem NavLink="/magazine">Magazine</ListItem>
                  </div>
                  <hr />
                  <div className="lg:hidden">
                    <ListItem NavLink="/watches">Watches</ListItem>
                  </div>
                  <hr />
                  <div className="lg:hidden">
                    <ListItem NavLink="/faq">FAQ</ListItem>
                  </div>
                  <hr />
                  <div className="lg:hidden">
                    <ListItem NavLink="/security">Security</ListItem>
                  </div>
                  <hr />
                </ul>
              </nav>
            </div>
            <div className="list-none hidden lg:flex relative justify-center gap-x-2 items-center">
              <div className="relative cursor-pointer">
                <div className="hover:text-[#C4932C] duration-300  w-max flex items-center gap-x-1" onClick={() => setIsOpenBuyWatch(!isOpenBuyWatch)}>
                  {isOpenBuyWatch ? <span className="text-md"><IoIosArrowDown /></span> : <span className="text-md"><IoIosArrowForward /></span>}
                  <span className="font-semibold">Buy a Watch</span>
                </div>
                <div
                  ref={menuRef}
                  className={`transition-all duration-300 ease-in-out ${isOpenBuyWatch ? 'block top-[73px]' : 'hidden top-[63px]'} border flex items-start justify-between min-h-[173px] px-[14px] rounded-lg bg-white absolute text-left space-y-1 w-40`}
                >
                  <ul onClick={() => setIsOpenBuyWatch(!isOpenBuyWatch)} className="flex justify-between w-full mt-4">
                    <ul className="absolute flex flex-col space-y-1 font-semibold">
                      <li className="hover:text-[#C4932C] duration-300"><Link to="/rolex">Rolex</Link></li>
                      <li className="hover:text-[#C4932C] duration-300"><Link to="/cartier">Cartier</Link></li>
                      <li className="hover:text-[#C4932C] duration-300"><Link to="/hamilton">Hamilton</Link></li>
                      <li className="hover:text-[#C4932C] duration-300"><Link to="/hublot">Hublot</Link></li>
                      <li className="hover:text-[#C4932C] duration-300"><Link to="/ulysseNardin">Ulysse Nardin</Link></li>
                    </ul>
                  </ul>
                </div>
              </div>
              <ListItem NavLink="/magazine">Magazine</ListItem>
              <ListItem NavLink="/watches">Watches</ListItem>
              <ListItem NavLink="/faq">FAQ</ListItem>
              <ListItem NavLink="/security">Security</ListItem>
            </div>

            <div className="flex justify-center items-center lg:gap-x-5 sm:mr-0 mr-[70px]">
              <div className="flex justify-center items-center gap-x-4 mt-[5px]">
                <Link to="/wishlist">
                  <div className="cursor-pointer flex justify-center items-center">
                    <div className="relative">
                      <div className="absolute left-[13px] -top-[12px]">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-[#C4932C] p-[10px] text-xs text-white">{uniqueArrayWishList.length}</p>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -1 18 29" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.435 4.055a5.61 5.61 0 00-7.933 0L12 5.557l-1.502-1.502a5.61 5.61 0 00-7.933 7.933l1.502 1.502 7.933 7.933 7.933-7.933 1.502-1.502a5.61 5.61 0 000-7.933z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
                <div onClick={toggleCart} className="cursor-pointer flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute left-3 -top-3">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-[#C4932C] p-[10px] text-xs text-white">{uniqueArray.length}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 26" strokeWidth="1.5" stroke="currentColor" className="file: h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                </div>
                <div className="cursor-pointer" onClick={() => setSearchOpen(!searchOpen)}>
                  <FiSearch />
                  {searchOpen ? (
                    <div ref={searchRef} className="border absolute right-0 lg:w-72 w-full top-[89px]  overflow-hidden rounded-lg text-gray-600" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="bg-white h-10 px-5 lg:w-72 w-full pr-10  text-sm focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        type="submit"
                        className="absolute right-0 top-0 mt-3 mr-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchOpen(false);
                        }}
                      >
                        <FiSearch />
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="flex relative sm:pr-16 gap-2 justify-end items-center lg:pr-5">
                  {loggedIn ? (
                    <>
                      <div className="relative">
                        <Link to="/" className="cursor-pointer" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
                          <div className="text-lg hover:text-[#a07822] duration-200">
                            <img src={user?.profilePic} alt="" className="w-8 h-8 rounded-full object-cover" />
                          </div>
                        </Link>
                        {isOpen && (
                          <div
                            ref={dropdownRef}
                            className="absolute top-6 right-0 z-10 mt-[34px] w-max rounded-lg bg-white text-gray-800 shadow-lg dark:bg-dark-2 dark:black"
                          >
                            {loggedIn ? (
                              <div className="px-6 py-5 text-left">
                                <p className="text-sm font-semibold whitespace-nowrap">Email: <span className="text-gray-500">{user?.email}</span></p>
                                <p className="text-sm font-semibold whitespace-nowrap">Username: <span className="text-gray-500">{user?.userName}</span></p>
                                <p className="text-sm font-semibold whitespace-nowrap">Full Name: <span className="text-gray-500">{user?.fullName}</span></p>
                                <p className="text-sm font-semibold whitespace-nowrap">Gender: <span className="text-gray-500">{user?.gender}</span></p>
                                <button
                                  onClick={logOut}
                                  className="mt-3 w-full sm:hidden block rounded-md border border-red-500 py-1 text-sm font-medium text-[#C4932C] dark:border-[#C4932C] dark:text-[#C4932C] hover:bg-red-50 dark:hover:bg-[#C4932C] duration-200 dark:hover:text-white"
                                >
                                  Log out
                                </button>
                                <Link to="/profile">
                                  <button
                                    onClick={() => setIsOpen(false)} 
                                    className="mt-3 w-full rounded-md border border-red-500 py-1 text-sm font-medium text-[#C4932C] dark:border-[#C4932C] dark:text-[#C4932C] hover:bg-red-50 dark:hover:bg-[#C4932C] duration-200 dark:hover:text-white"
                                  >
                                    Edit Profile
                                  </button>
                                </Link>
                              </div>
                            ) : (
                              <div className="p-4">
                                <p className="text-sm font-semibold">Not logged in</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <button onClick={logOut} className="lg:block relative px-[55px] py-[21px] font-medium sm:block hidden button-logout">
                        <span>
                          Log Out
                        </span>
                        <span className="left-7 absolute inline-block whitespace-nowrap">Log Out</span>
                      </button>
                    </>
                  ) : (
                    <Link to="/register" className="lg:block relative px-[55px] py-[21px] font-medium button-logout">
                      <span>
                        Sign In
                      </span>
                      <span className="left-7 absolute inline-block whitespace-nowrap">Sign In</span>
                    </Link>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border">
        {isCartOpen && <Cart closeCart={toggleCart} />}
      </div>
    </div>
  );
};


export default Header;


const ListItem = ({ children, NavLink }) => {
  const location = useLocation();
  const isActive = location.pathname === NavLink;

  return (
    <>
      <li>
        <a
          href={NavLink}
          className={`duration-300 flex py-[2px] text-base font-medium text-body-color relative text-black hover:text-[#C4932C] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#C4932C] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#C4932C] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] text-dark-6 lg:ml-5 lg:inline-flex ${isActive ? 'underline underline-offset-[6px] decoration-[#a07822]' : ''}`}
        >
          {children}
        </a>
      </li>
    </>
  );
};




