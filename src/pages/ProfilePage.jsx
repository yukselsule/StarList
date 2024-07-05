import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Lists from "../components/Lists";
import Summary from "../components/Summary";
import DetailedSummary from "../components/DetailedSummary";

function ProfilePage() {
  return (
    <div>
      <Header />
      <div className="profile-page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Summary />
                <Lists />
              </>
            }
          />
          <Route path="summary" element={<DetailedSummary />} />
        </Routes>
      </div>
    </div>
  );
}

export default ProfilePage;
