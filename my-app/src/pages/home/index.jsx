import React, { useState, useEffect } from "react";
import PageHeader from "../../components/pageHeader";
import axios from "axios";
import "./home.css";
import Card from "./homeComponent/cardGlass";
import NewsLetter from "./homeComponent/newsLetter";
import { useAuthHeader } from "react-auth-kit";
import LatestPlaces from "./homeComponent/latest";
function HomePage() {
  const authHeader = useAuthHeader();
  const [data, setData] = useState([]);
  const [newsLetter, setnewsLetter] = useState([]);
  const [event, setevent] = useState([]);
  const [place, setplace] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/home`, {
        headers: { Authorization: authHeader() },
      })
      .then((response) => {
        setData(response.data);
        setnewsLetter(response.data.newsLetter);
        setevent(response.data.latestUnconfirmedEvents);
        setplace(response.data.latestUnconfirmedPlaces);
        console.log(response.data.latestUnconfirmedEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  console.log(data);
  return (
    <>
      <PageHeader label="Home Page" />
      <div className="home__container">
        <div className="home__first__div">
          <Card
            className="div1"
            title={"Places"}
            value={data.PlaceCount}
            link={"/places"}
          ></Card>
          <Card
            className="div2"
            title={"Events"}
            value={data.eventCount}
            link={"/events"}
          ></Card>
          <Card
            className="div3"
            title={"Blogs"}
            link={"/blog"}
            value={data.blogCount}
          ></Card>
        </div>
        {console.log(data)}
        <div className="Home__second_container">
          <div className="home__second__div">
            <LatestPlaces
              data={event}
              link={"/events"}
              handleRefresh={handleRefresh}
            />
            <LatestPlaces
              data={place}
              link={"/places"}
              handleRefresh={handleRefresh}
            />

            <NewsLetter data={newsLetter} handleRefresh={handleRefresh} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
