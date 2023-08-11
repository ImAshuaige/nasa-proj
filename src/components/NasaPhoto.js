import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./NavBar";
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Typewriter from "typewriter-effect";

const apiKey = process.env.REACT_APP_NASA_KEY;

const NasaPhoto = () => {
  const [photoData, setPhotoData] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterAutoStart, setTypewriterAutoStart] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Update the typewriter text when photoData.explanation changes
    setTypewriterText(photoData.explanation || "");
    setTypewriterAutoStart(true);
  }, [photoData.explanation]);

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

  const img = (
    <img
      src={photoData.url}
      alt={photoData.title}
      className="photos"
      style={{ maxWidth: "30%", height: "auto" }}
    />
  );

  return (
    <>
      <NavBar />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "10px", fontFamily: "Title" }}>
          {photoData.title}
        </h1>
        <div style={{ fontFamily: "Roboto, sans-serif", textAlign: "center", margin: "20px" }}>
          {photoData.media_type === "image" ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Slide direction="right" in mountOnEnter unmountOnExit>
                {img}
              </Slide>
            </Box>
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
          <div style={{ marginBottom: "20px", marginTop: "10px", textAlign: "center" }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              maxDate={new Date()}
              style={{ fontSize: "18px", textAlign: "center" }}
            />
          </div>
          <p style={{ fontSize: "18px", textAlign: "left", margin: "30px", fontFamily: "Title" }}>
            <Typewriter
              options={{
                strings: [typewriterText], // Use the dynamic text
                autoStart: typewriterAutoStart,
                pauseFor: 100000,
                delay: 70, //This changes the speed at which the text is typed at
                reset: true, // Reset the text before typing new content
              }}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default NasaPhoto;
