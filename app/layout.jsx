import "@/assets/styles/globals.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
