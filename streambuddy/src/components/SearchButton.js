import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        ...theme.button
    }
}));

export default function SearchButton(props) {
    const classes = useStyles();

    return (
      
            <Button variant="contained" color="primary" className={classes.button}>
                Search
            </Button>
       
    );
}
