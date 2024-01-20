import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import LoadingModal from "../components/ReserveLoadingModal";
const ReserveRoomSuccess = () => {


  const [loading, setLoading] = useState(false);


  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />
      <section>
        <div className="container">
          <button className="btn btn-primary" onClick={() => setLoading(!loading)}>LOADING</button>
          <h2>預約成功頁</h2>
          <LoadingModal isLoading={loading} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ReserveRoomSuccess;
