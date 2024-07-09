import DetailedSummary from "../components/DetailedSummary";
import Footer from "../components/Footer";
import Header from "../components/Header";

function DetailedSummaryPage() {
  return (
    <div>
      <Header />
      <main className="container">
        <DetailedSummary />
      </main>
      <Footer />
    </div>
  );
}

export default DetailedSummaryPage;
