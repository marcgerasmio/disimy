import Navbar from "./Navbar";
import { FaArrowRight } from "react-icons/fa";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Dashboard() {

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
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;