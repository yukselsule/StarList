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
    </div>
  );
}

export default ProfilePage;
