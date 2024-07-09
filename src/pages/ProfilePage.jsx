import Footer from "../components/Footer";
import Header from "../components/Header";
import Lists from "../components/Lists";
import Summary from "../components/Summary";

function ProfilePage() {
  return (
    <div>
      <Header />
      <div className="profile-page">
        <Summary />
        <Lists />
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
