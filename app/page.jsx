import FeaturedPropertyCard from "@/components/FeaturedProperties";
import Hero from "../components/Hero";
import HomeProperties from "../components/HomeProperties";
import InfoBoxes from "../components/InfoBoxes";
import connectDB from "@/config/database";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedPropertyCard/>
      <HomeProperties />
    </>
  );
};

export default HomePage;
