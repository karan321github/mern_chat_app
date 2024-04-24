import React, { useEffect, useState } from "react";
import axios from "axios";

navigator.geolocation.getCurrentPosition(function (position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  // Now you can use latitude and longitude variables as needed
  // For example, you can make an API call using these coordinates
});
const option = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/current.json",
  params: { q: "53.1,-0.13" },
  headers: {
    "X-RapidAPI-Key": "c6ad2c15ffmsh71350893a8b392fp1969bbjsneaac2249e667",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

const Whether = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios(option);
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchWeather();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            {key}: {typeof value === "object" ? JSON.stringify(value) : value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Whether;


// const ans = arr.reduce((i) => i+1);
// console.log(ans);
// const arr = [1,2,3,4,5,6];

// const ans = arr.map((i) => i+i+1);
// console.log(ans);

