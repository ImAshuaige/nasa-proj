import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./background.json";

export default function Home() {
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                background: "linear-gradient(to bottom, #ffa9f9, #ffffff)",
                //backgroundColor: "#ffffff",//243751 dark blue ffa9f9
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Lottie animation as the background */}
            <Lottie
                style={{
                    position: "absolute",
                    width: "115%",
                    height: "115%",
                }}
                animationData={animationData}
                loop
                autoplay
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <Link
                    to="/nasaphoto"
                    style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        backgroundColor: "#ff9900",
                        color: "#fff",
                        textDecoration: "none",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "20px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#ffcc33"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#ff9900"}
                >
                    See into the stars!
                </Link>
            </div>
        </div>
    );
}
