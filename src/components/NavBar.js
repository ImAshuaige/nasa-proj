import React from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Grid from "@mui/material/Grid";

export default function NavBar() {
    return (
        <div>
            <ul>
                <Link to="/"
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
                    }}>
                    <Grid item xs={8}>
                        <HomeOutlinedIcon />
                    </Grid>
                </Link>
            </ul>
        </div>
    )
}