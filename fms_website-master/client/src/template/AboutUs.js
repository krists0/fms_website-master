
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";


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
        backgroundImage: 'url(https://projectskillssolutions.com/assets/Building-Maintenance-slide1.jpg)',
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





class AboutUs extends Component {


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
                        <Paper className={classes.mainFeaturedPost}>
                            <div className={classes.overlay} />
                            <Grid container >
                                <Grid item md={6}>
                                    <div className={classes.mainFeaturedPostContent}>
                                        <Typography   component="h1" variant="h3" style={{color:"#eceff1",flexDirection:'row',marginLeft:'10px' }} gutterBottom>
                                            F.M.S -Fault Management System
                                        </Typography>

                                    </div>
                                </Grid>
                            </Grid>

                        </Paper>
                    <Typography variant="h7" color="inherit" paragraph>
                        <Card>
                           <CardContent>
                            מערכות CMMS , נמצאות בשוק משנות ה-80 , והתחילו לצבור יותר פופולאריות בזמן האחרון.
                            פיתוח מערכות אלה נבע מהצורך לניהול וארגון תהליכי עבודה בארגונים , לפני פיתוח המערכות כל התיעוד של ארגון העבודה היה מתועד במסמכים ודפים מה שגרר לאי-סדר ואיבוד נתונים חשובים לארגונים.
                            מערכות אלו הן כלי עזר נפלא לארגונים שמטמיעות אותן בחברות שלהן. מן היתרונות הפופולאריים ניתן למנות גם בקרה על העובדים ,
                               ארגון סדר יום העובד ,שימוש יעיל יותר ש משאבי כוח אדם ,דיווח איכותי בזמן אמת ועוד מגוון יתרונות.
                               פרויקט זה מתמקד בפיתוח אתר ואפליקציה שיהוו הנגשה ברמת השפות העיקריות ובכך אנו
                               ננגיש את האפליקציה לעובדי החברה וההטמעה תתבצע בצורה יעילה יותר .
                               כמו כן המערכת מפותחת תחת שימת דגש לתפעול קל, נגיש, ידידותי ככל הניתן למשתמשיה .
                           </CardContent>
                            <CardContent>
                                מפתחי התוכנה :
                                מיכאל אטלס וקריסטינה ציביליוב
                            </CardContent>
                        </Card>
                    </Typography>

                </Grid>

            </React.Fragment>
        );

    }
}


AboutUs.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});


export default connect(mapStateToProps)(withStyles(styles)(withRouter(AboutUs)));

