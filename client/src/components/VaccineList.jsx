import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from "@mui/icons-material/Delete"
import { Grid } from '@mui/material';
import '../App.css';
import { getVaccineAPICall } from '../redux/vaccines/vaccineActions';
import { vaccineSetAPICall } from '../redux/vaccines/vaccineActions';
import { delVaccineAPICall } from '../redux/vaccines/vaccineActions'
import AddIcon from '@mui/icons-material/Add';
import DeleteModal from './modals/DeleteVaccineModal';
import Button from '@mui/material/Button';

import image from '../img/vaccineimage.png'
import AddModal from './modals/AddVaccineModal';

const submitButton= {
    position: 'absolute',
    right: '5%',
    top: '95%',
    width: 40,
    height: 40,
    borderRadius: 10,
}

const VaccineList = ({ getVaccineAPICall, vaccineSetAPICall, vaccineData, delVaccineAPICall }) => {
    let card = null
    let { childId } = useParams();

    //    const tConvert = (time) => {
    //     // Check correct time format and split into components
    //     time = time
    //       .toString()
    //       .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    //     if (time.length > 1) {
    //       // If time format correct
    //       time = time.slice(1); // Remove full string match value
    //       time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    //       time[0] = +time[0] % 12 || 12; // Adjust hours
    //     }
    //     return time.join(''); // return adjusted time or original string
    //   };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorPage, setErrorPage] = useState(false)
    const [deleteId, setDeleteId] = useState('')


    const handleOpen = () => {setOpen(true)};
    const handleClose = () => setOpen(false);

    const handleOpen2 = (id) => {

        setDeleteId(id)

        setOpen2(true)
    };
    const handleClose2 = () => setOpen2(false);


    useEffect(() => {
        getVaccineAPICall(childId);
        setLoading(false)
    }, [childId]);


    const addVaccine = async (obj) => {
            await vaccineSetAPICall(obj, childId)
        }
    

    const deleteVaccine = async (vaccineId) => {
        delVaccineAPICall(vaccineId)
        handleClose2()
    }

    const buildCard = (vaccines) => {
        return (
            <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={vaccines && vaccines._id}>
                <Card
                    variant='outlined'
                    sx={{
                        maxWidth: 345,
                        height: 'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        borderRadius: 5,
                        // border: '1px solid #080a33',
                        boxShadow:
                            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
                    }}>
                    <CardHeader
                        title={vaccines.name}
                        subheader={vaccines.date}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={image}
                    />
                    <CardActions disableSpacing>

                        {/* <IconButton onClick={() => handleOpen} color='error' aria-label="Add Vaccine">
                            <FavoriteIcon />
                        </IconButton> */}
                        <IconButton onClick={() => handleOpen2(vaccines && vaccines._id)} color='textSecondary' aria-label="Delete Vaccine">
                            <DeleteIcon />
                        </IconButton>

                    </CardActions>

                </Card>
            </Grid >

        );
    };


    card =
        vaccineData &&
        vaccineData.data &&
        vaccineData.data.map((vaccines) => {
            if (vaccines !== null) {
                return buildCard(vaccines);

            }
        });

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
        // } else if (error) {
        //     return (
        //         <div>
        //             <h2>Error 404: No data for this page</h2>
        //         </div>
        //     );

    } else {
        return (
            <div>
                <div>
                    <br />
                    <Button  variant="contained" onClick={() => handleOpen()} startIcon={<AddIcon />}>
                     Add Vaccine
                     </Button>
                     <br />
                     <br />

                    <Grid
                        container
                        spacing={2}
                        sx={{
                            flexGrow: 1,
                            flexDirection: 'row'
                        }}
                    >
                        {card}
                        
                    </Grid>

                    {open2 && <DeleteModal
                        open={open2}
                        onClose={handleClose2}
                        _id={deleteId}
                        deleteVaccine={deleteVaccine}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    />}
                     {open && <AddModal
                        open={open}
                        onClose={handleClose}
                        addVaccine={addVaccine}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    />}
                </div>
                <br />
                <br />
              
            </div>

        );
    }
};

const mapStateToProps = state => {
    return {
        userData: state.users,
        vaccineData: state.vaccines
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getVaccineAPICall: (childId) => dispatch(getVaccineAPICall(childId)),
        vaccineSetAPICall: (obj, childId) => dispatch(vaccineSetAPICall(obj, childId)),
        delVaccineAPICall: (vaccineId) => dispatch(delVaccineAPICall(vaccineId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VaccineList);