import React, { useState, useEffect } from "react";

import "./Profile.css";
import "../../App.css";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CardHeader, Avatar, Box, Grid, Paper } from "@mui/material";

const Profile = (props) => {
    const [userData, setUserData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    let { userId } = useParams();
    console.log(userId);
    let card = null;
    const formatDate = (showdate) => {
        var year = showdate.substring(0, 4);
        var month = showdate.substring(5, 7);
        var day = showdate.substring(8, 10);
        return month + "/" + day + "/" + year;
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
                console.log(data);
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setUserData(undefined);
                setLoading(false);
                setError(error.message ? error.message : error);
            }
        }
        if (userId && userId !== undefined) fetchData();
    }, [userId]);
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        if (!userData) {
            return (
                <Link className="showlinkPage" to={`/login`}>
                    Login
                </Link>
            );
        } else {
            const commonFields = (
                <Box component="ul">
                    <li>Name: {userData.firstName + " " + userData.lastName}</li>
                    <li>Age: {userData.age}</li>
                    <li>Email: {userData.email}</li>
                    <li>Address: {userData.address}</li>
                    <li>Date of Birth: {userData.DOB}</li>
                    <li>Phone: {userData.phone}</li>
                </Box>
            );
            const nannyFields = (
                <Box component="ul">
                    <li>Years of experience: {userData.n_yearsOfExperience}</li>
                    <li>Educational Qualifications: {userData.n_qualifications}</li>
                    <li>Certifications: {userData.n_certifications}</li>
                    <li>Skills: {userData.n_skills}</li>
                    <div>
                        <h4>Children:</h4>
                        {userData.n_childIds?.map((child) => (
                            <Card key={child.id} sx={{ mt: 2 }}>
                                <CardHeader title={child.name} />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <Link to={`/child/${child.id}`}>View child profile</Link>
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Box>
            );
            const parentFields = (
                <Box component="ul">
                    <div>
                        <h4>Children:</h4>
                        {userData.p_childIds?.map((child) => (
                            <Card key={child.id} sx={{ mt: 2 }}>
                                <CardHeader title={child.name} />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <Link to={`/child/${child.id}`}>View child profile</Link>
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Box>
            );

            return (
                <div className="profile">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 2 }}>
                                <Avatar src={userData.photoUrl} alt={userData.name} sx={{ width: 200, height: 200 }} />
                                <Typography variant="h4" sx={{ mt: 2 }}>
                                    {userData.firstName + " " + userData.lastName}
                                </Typography>
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                    {userData.profile}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ p: 2 }}>
                                <Box component="ul">
                                    {commonFields}
                                    {userData.profile === "NANNY" && nannyFields}
                                    {userData.profile === "PARENT" && parentFields}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }
};

export default Profile;
