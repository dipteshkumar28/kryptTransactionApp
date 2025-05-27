import { Toaster } from "react-hot-toast";
import { Navbar, Welcome, Footer, Services, Transactions } from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Toast Notification Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="gradient-bg-welcome ">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
