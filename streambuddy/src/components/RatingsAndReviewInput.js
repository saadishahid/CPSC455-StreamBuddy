import React, {useContext} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, TextField} from "@material-ui/core";
import {UserContext} from "./UserContext";


export default function RatingsAndReviewInput() {
    const [value, setValue] = React.useState(0);
    const [value1, setValue1] = React.useState('Write your review here...');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeReview = (event) => {
        setValue1(event.target.value);
    };

    const postReview = () => {
        console.log('You clicked post review' + value1);
        // user.reviews.push();
    };

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rate This Movie!</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend" style={{marginBottom: 10}}>Write a Review!</Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    rows={8}
                    defaultValue="Write your review here..."
                    variant="outlined"
                    value={value1}
                    onChange={handleChangeReview}
                    style={{width: 400}}
                />
            </Box>
                <box><Button variant="contained"
                        color="primary" onClick={postReview}>Post Review </Button>
                </box>
        </div>
    );
}