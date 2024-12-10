import Navbar from "./Navbar";
import { FaArrowRight } from "react-icons/fa";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Dashboard() {
  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      name: "Product 4",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-0">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Welcome to
                <span className="text-customOrange ms-5">Our</span>
                <span className="text-customGreen ms-4">Store</span>
              </h1>
              <p className="text-lg mb-6">
                Discover amazing products across our various branches. Start
                your shopping journey now!
              </p>
              <Link
                to="/branches"
                className="btn bg-customOrange text-white hover:bg-customOrange"
              >
                Explore Branches <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="img.png" alt="Store showcase" />
            </div>
          </div>
        </div>
        {/* Sample Products Section */}
        <div className="container mx-auto px-8 mb-20">
          <div className="flex justify-center">
            <h2 className="text-3xl font-semibold text-center mb-8 relative">
              Featured Products
              <span className="absolute bottom-0 left-0 right-0 mx-auto w-1/6 h-1 bg-customOrange"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {sampleProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-xl text-customGreen">
                  ${product.price.toFixed(2)}
                </p>
                <button className="mt-4 bg-customOrange text-white px-4 py-2 rounded-md hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
