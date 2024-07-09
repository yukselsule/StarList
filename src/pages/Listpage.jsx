import Footer from "../components/Footer";
import Header from "../components/Header";
import List from "../components/List";

function Listpage() {
  return (
    <div>
      <Header />
      <main className="container">
        <List />
      </main>
      <Footer />
    </div>
  );
}

export default Listpage;
