import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Button from "@material-ui/core/Button";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SBSVGLogo from '../SBSVGLogo.png';


function ElevationScroll(props) {
    const { children } = props;

    // useScrollTrigger hook is an event listener for when the user is scrolling
    const trigger = useScrollTrigger({
        // should there be little delay when a user is scrolling? Disabled it so there is no delay
        disableHysteresis: true,
        //0 means as soon as the user starts scrolling, event listener is triggered
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}


const useStyles = makeStyles(theme => ({

    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3rem",
        // [theme.breakpoints.down("md")]: {
        //     marginBottom: "2em"
        // },
        // [theme.breakpoints.down("xs")]: {
        //     marginBottom: "1.25em",
        // }
    },
    logo: {
        height: "8em",
        // [theme.breakpoints.down("md")]: {
        //     height: "7em"
        // },
        // [theme.breakpoints.down("xs")]: {
        //     height: "5.5em"
        // }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.pink,
        marginLeft: "auto"
    },
    drawerItem: {
        ...theme.typography.tab,
        color: theme.palette.common.white,
    },
    appbar: {
        zIndex: 50000
    }
}))


export function Navbar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [openDrawer, setOpenDrawer] = useState(false);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        if (window.location.pathname === "/" && value !== 0) {
            setValue(0)
        } else if (window.location.pathname === "/login" && value !== 1) {
            setValue(1)
        } else if (window.location.pathname === "/signup" && value !== 2) {
            setValue(2)
        }
        //this value tells the useEffect hook that if the value hasn't changed, don't run
        // use effect hook code again
    }, [value]);

    const tabs = (
        <React.Fragment>
            <Tabs className={classes.tabContainer}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary">

                <Tab className={classes.tab} component={Link} to="/"  label="Home" />
                <Tab className={classes.tab} component={Link} to="/login" label="Login" />
                <Tab className={classes.tab} component={Link} to="/signup" label="Sign up" />
            </Tabs>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                anchor='right'
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                // to overwrite base material-ui component style.
                classes={{paper: classes.drawer}}
            >
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    <ListItem
                        onClick={() => {setOpenDrawer(false)}}
                        divider
                        button
                        component={Link} to="/">
                        <ListItemText className={classes.drawerItem}>Home</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => {setOpenDrawer(false)}} divider button component={Link} to="/login">
                        <ListItemText className={classes.drawerItem}>Login</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => {setOpenDrawer(false)}} divider button component={Link} to="/signup">
                        <ListItemText className={classes.drawerItem}>Sign up</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer}
                        onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    )


    //toolbar helps stack content horizontally
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button component={ Link } to="/" onClick= {() => setValue(0)}
                                className={classes.logoContainer} disableRipple >
                            <img
                                src={SBSVGLogo}
                                alt="logo"
                                className={classes.logo}
                            />
                        </Button>
                        {/*if screen size is medium or small return drawer, else return tabs */}
                        {matches ? drawer : tabs }

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );

}