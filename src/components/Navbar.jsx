import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { BsCart4, BsSearch } from "react-icons/bs";

const Navbar = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Majestic
            </span>
            <span className="text-3xl font-light">Store</span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <BsSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-600"
            >
              <option value="">All Categories</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewellery</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-600"
            >
              <option value="">Sort By</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="ratingHigh">Rating: High to Low</option>
            </select>

            <Link to="/cart" className="relative p-2">
              <BsCart4 className="text-2xl text-gray-700 hover:text-purple-600 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
