import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./NavBar";

const apiKey = process.env.REACT_APP_NASA_KEY;

const NasaPhoto = () => {
  const [photoData, setPhotoData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate && !isToday(selectedDate)) {
      fetchPhoto(selectedDate);
    } else {
      fetchDefaultPhoto();
    }
  }, [selectedDate]);

  const fetchPhoto = async (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedDate = nextDay.toISOString().split("T")[0];

    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formattedDate}`
    );

    const data = await res.json();
    setPhotoData(data);
  };

  const fetchDefaultPhoto = async () => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );

    const data = await res.json();
    setPhotoData(data);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <NavBar />
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "20px" }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            style={{ fontSize: "18px", textAlign: "center" }}
          />
        </div>
      
        {photoData && (
          <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            {photoData.media_type === "image" ? (
              <img
                src={photoData.url}
                alt={photoData.title}
                className="photos"
                style={{ maxWidth: "30%", height: "auto" }}
              />
            ) : (
              <iframe
                title="space-video"
                src={photoData.url}
                frameBorder="0"
                gesture="media"
                allow="encrypted-media"
                allowFullScreen
                className="photos"
                style={{ width: "100%", height: "500px" }}
              />
            )}
            <div style={{ margin: "20px" }}>
              <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {photoData.title}
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                {photoData.date}
              </p>
              <p style={{ fontSize: "18px" }}>{photoData.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NasaPhoto;
