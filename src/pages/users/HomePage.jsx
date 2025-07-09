import HeroSection from "../../components/users/main/HeroSection";
import AboutSection from "../../components/users/about/AboutSection";
import MenuGrid from "../../components/users/menu/MenuGrid";
import Footer from "../../components/users/footer/Footer";
import Navbar from "../../components/users/navbar/Navbar";
import YouTubeSection from "../../components/users/youtube/YoutubeSection";
import AboutUs from "../../components/users/about/AboutUs";
import AsianFoodSection from "../../components/users/main/AsianFoodSection";


const HomePage = () => {
  return (
    <>
   <Navbar />
      <HeroSection />
      <AboutSection />
      <AboutUs/>
      <YouTubeSection />
      <MenuGrid />
      <AsianFoodSection/>
      {/* <ContactUs/> */}
      <Footer />
     
    </>
  )
}

export default HomePage
