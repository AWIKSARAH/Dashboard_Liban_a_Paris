import PageHeader from "../../components/pageHeader";
import SearchBar from "../../components/searchBar";
import { useAuthHeader } from "react-auth-kit";
import "./home.css";
function HomePage() {
  return (
    <>
      <PageHeader label="Home Page" />
      <SearchBar />
    </>
  );
}

export default HomePage;
