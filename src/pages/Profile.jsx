import Header from "../components/Header";
import Lists from "../components/Lists";
import Summary from "../components/Summary";

function Profile() {
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

export default Profile;
