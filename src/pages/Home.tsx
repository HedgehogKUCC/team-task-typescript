import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <figure>
        <img
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/banner.png"
          className="img-fluid"
          alt=""
        />
      </figure>
      <Footer />
    </>
  );
};

export default Home;
