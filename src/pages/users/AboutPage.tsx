import AboutSection from "../../components/users/about/AboutSection";
import Footer from "../../components/users/footer/Footer";
import Navbar from "../../components/users/navbar/Navbar";
import AboutUs from "../../components/users/about/AboutUs";
import YouTubeSection from "../../components/users/youtube/YoutubeSection";

const AboutPage = () => {
  return (
    <>
   <Navbar />
    <AboutUs/>
        <YouTubeSection />

    <Footer />
     
    </>
  )
}

export default AboutPage
