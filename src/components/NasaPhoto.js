import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./NavBar";

const apiKey = process.env.REACT_APP_NASA_KEY;

const NasaPhoto = () => {
    const [photoData, setPhotoData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
            );

            const data = await res.json();
            setPhotoData(data);
            console.log(data);
        }
    }, []);

    if (!photoData) return <div />;


    return (
        <>

            <NavBar />
            <div>
                <div>
                    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
                </div>

                {/* Rest of the content */}
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
                        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>{photoData.title}</h1>
                        <p style={{ fontSize: "16px", color: "#666", marginBottom: "10px" }}>{photoData.date}</p>
                        <p style={{ fontSize: "18px" }}>{photoData.explanation}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NasaPhoto;
