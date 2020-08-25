
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import Hidden from "@material-ui/core/Hidden";



const styles = theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding:'8px',
        flexShrink: 0,
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: '64px',
        backgroundImage: 'url("/Images/Building-Maintenance-slide1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: '48px',
        [theme.breakpoints.up('md')]: {
            padding: '96px',
            paddingRight: '0',
        },
    },
    mainGrid: {
        marginTop: '48px',
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },

    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop:'64px',
        padding:'64px',
    },
});





class Home extends Component {


    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>

                <Grid maxWidth="lg">
                    <Toolbar className={classes.toolbar}>

                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >

                        </Typography>

                    </Toolbar>

                    <main>

                        <Paper className={classes.mainFeaturedPost}>

                            <div className={classes.overlay} />
                            <Grid container >
                                <Grid item md={6}>
                                    <div className={classes.mainFeaturedPostContent}>
                                        <Typography   component="h1" variant="h3" color="inherit"  gutterBottom>
                                            F.M.S -Fault Management System
                                        </Typography>
                                        <Typography variant="h5" color="inherit" paragraph>
                                            מערכת זו נועדה לניהול וטיפול בקריאות\ תקלות למבני מגורים
                                        </Typography>

                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Grid container spacing={4} className={classes.cardGrid}>

                                <Grid item  xs={12} md={6}>
                            <CardActionArea component="a" href="#">
                                <Card className={classes.card}>
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component="h2" variant="h5">
                                                מעקב קריאות וטיפולן
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">

                                            </Typography>
                                            <Typography variant="subtitle1" paragraph>
                                                ניתן לבצע מעקב אחר תקלות בצורה יעילה ונוחה. תחת מעקב קריאות ניתן לראות את כלל
                                                הקריאות שבמערכת ניתן לערוך ,להצמיד לעובד ולמחוק תקלות בלחיצת כפתור.
                                            </Typography>

                                        </CardContent>
                                    </div>
                                    <Hidden xsDown>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://www.smart-plumbers.co.il/files/articles/item/thumbsrc/iStock_924709504.jpg"
                                            title="Image title"
                                        />
                                    </Hidden>
                                </Card>
                            </CardActionArea>
                        </Grid>

                            <Grid item  xs={12} md={6}>
                                <CardActionArea component="a" href="#">
                                    <Card className={classes.card}>
                                        <div className={classes.cardDetails}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    ניהול יומן עובדים
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">

                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>
                                                    ניתן לבצע מעקב אחר פעילות עובדים ,להצמיד להם קריאות לטיפול תוך כדי סיווג לעדיפות טיפול.
                                                    ניתן לשנות לערוך ולטפל בכל הקשור למשימות העובדים .
                                                </Typography>

                                            </CardContent>
                                        </div>
                                        <Hidden xsDown>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://cdn.mishpati.co.il/article/20180104-Article_Main/bdee3c97-a9c4-42b5-a83d-a85e00a0a7d6.jpg?w=334&h=206&mode=crop"
                                                title="Image title"
                                            />

                                        </Hidden>
                                    </Card>
                                </CardActionArea>
                            </Grid>

                            <Grid item  xs={12} md={6} >
                                <CardActionArea component="a" href="#">
                                    <Card className={classes.card}>
                                        <div className={classes.cardDetails}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    רשימת קריאות עדכנית
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">

                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>
                                                    רשימת הקריאות המופיעה במערכת הינה רשימה עדכנית. ניתן למחוק/להצמיד לעובד , העובד
                                                    יקבל את הקריאה באפליקציה שלו ויוכל לטפלה בהתאם לעדיפות.
                                                </Typography>

                                            </CardContent>
                                        </div>
                                        <Hidden xsDown>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSEa1v7tHTTKudr8a2McnA9CEqxMPgS_xIJllts0Iu5BXnONku"
                                                title="Image title"
                                            />
                                        </Hidden>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                            <Grid item  xs={12} md={6} >
                                <CardActionArea component="a" href="#">
                                    <Card className={classes.card}>
                                        <div className={classes.cardDetails}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    משתמשים
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">

                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>

                                                    תחת משתמשים ,ניהול עובדים ניתן לערוך את פרטי העובדים ,כמו כן ניתן למחוק עובדים קיימים.נא למלא
                                                    את כלל השדות המבוקשים במערכת .

                                                </Typography>

                                            </CardContent>
                                        </div>
                                        <Hidden xsDown>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://www.sba.co.il/wp-content/uploads/2018/01/shutterstock_701174023.jpg"
                                                title="Image title"
                                            />
                                        </Hidden>
                                    </Card>
                                </CardActionArea>
                            </Grid>

                        </Grid>

                    </main>
                </Grid>

            </React.Fragment>
        );

    }
}


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});


export default connect(mapStateToProps)(withStyles(styles)(withRouter(Home)));

