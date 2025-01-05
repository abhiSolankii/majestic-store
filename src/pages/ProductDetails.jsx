import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../api/useApiRequest";
import Navbar from "../components/Navbar";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { productId } = useParams();
  const { apiRequest, loading } = useApiRequest();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addCartItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiRequest("GET", `/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Product not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const { title, image, price, category, description, rating } = product;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          className="group flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors duration-200"
          onClick={() => navigate(-1)}
        >
          <BiLeftArrowAlt className="text-2xl group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="ml-1">Back to products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex items-center justify-center bg-gray-50">
              <div className="relative w-full aspect-square">
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <p className="text-sm text-purple-600 font-medium uppercase tracking-wide mb-2">
                  {category}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(rating.rate)}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {rating.rate} ({rating.count} reviews)
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-3xl font-bold text-gray-900">${price}</p>
                  </div>
                  <button
                    onClick={() => {
                      addCartItem(product);
                      toast.success("Added to cart");
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-800">
                    ✓ Free shipping on orders over $50
                    <br />
                    ✓ 30-day return policy
                    <br />✓ Secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
