import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { BsCart4, BsSearch, BsStarFill } from "react-icons/bs";
import useApiRequest from "../api/useApiRequest";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Home = () => {
  const { apiRequest, loading } = useApiRequest();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  const { addCartItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest("GET", "/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];
    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      );
    }
    if (sort === "priceLow") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "ratingHigh") {
      updatedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    setFilteredProducts(updatedProducts);
  }, [search, category, sort, products]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <header className="relative bg-purple-700 py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to MajesticStore
          </h1>
          <p className="text-xl text-purple-100">
            Discover premium products curated just for you
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                      {product.title}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <BsStarFill className="text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-purple-600">
                      ${product.price}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addCartItem(product);
                        toast.success("Added to cart");
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
