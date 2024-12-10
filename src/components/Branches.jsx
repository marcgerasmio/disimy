import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import Navbar from "./Navbar";

const branches = [
  { id: 1, name: "Butuan" },
  { id: 2, name: "Davao" },
  { id: 3, name: "Manila" },
  { id: 4, name: "Cebu" },
  { id: 5, name: "Surigao" },
];

function Branches() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mb-10">
        <div className="flex justify-center">
          <h2 className="text-3xl font-semibold text-center mb-8 relative">
            Our Branches
            <span className="absolute bottom-0 left-0 right-0 mx-auto w-1/6 h-1 bg-customOrange"></span>
          </h2>
        </div>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {branches.map((branch) => (
            <Link
              key={branch.id}
              to="/products"
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300 h-64 flex flex-col justify-center"
            >
              <div className="flex items-center justify-center mb-4">
                <FaStore className="text-8xl text-customRed" />
              </div>
              <h2 className="text-2xl font-semibold text-center">
                {branch.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Branches;
