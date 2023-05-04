import "./pageHeader.css";
import SearchBar from "../../components/searchBar";
function PageHeader(props) {
  const handleSearchChange = (value) => {
    props.setSearchQuery(value);
  };
  return (
    <div className="page--header_container">
      <h2>{props.label}</h2>
      <SearchBar onSearchClick={handleSearchChange} />
    </div>
  );
}

export default PageHeader;
