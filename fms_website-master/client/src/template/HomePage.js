import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import AddNewEmployee from './AddNewEmployee';
import Tooltip from '@material-ui/core/Tooltip';
import CartIcon from './image1/logo.png';
import {connect} from "react-redux";
import {setShowEmployee, getEmployees, setAddEmployee} from "../actions/employeeActions";
import {withRouter} from 'react-router-dom';
import ShowEmployees from './ShowEmployees';
import AddCall from "./AddCall";
import {logoutUser} from "../actions/authActions";
import classNames from "classnames";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PublicIcon from '@material-ui/icons/Public';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import Avatar from '@material-ui/core/Avatar';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Drawer from "@material-ui/core/Drawer";
import OpenCallsTab from "./OpenCallsTab";
import EmployeeActivity from "./EmployeeActivity";
import PairComponent from './PairComponent';
import ManageEmployeeTab from "./ManageEmployeeTab";
import Link from "@material-ui/core/Link";
import TitleOpenCallsTab from "./TitleOpenCallsTab";
import Home from "./Home";
import AboutUs from "./AboutUs";
import TodayTab from "./TodayTab";


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        maxWidth: 1800,

        overflow: 'hidden',

    },

    appBar: {

        left: 0,
        right:255,
        width:1264
    },

    secondaryBar:{
        top: 48,
        left: 0,
        right:255,
        width:1264

    },

    thirdBar:{
        top: 48,
        left:0 ,
        right:255,
        width:1264

    },
    categoryHeader: {
        paddingTop: 16,
        paddingBottom: 16,

    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,

    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,

        color: '#e1f5fe',

    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: 16,
        paddingBottom: 16,
    },

    //bigger logo
    firebase: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.white,
    },
    itemActionable: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemActiveItem: {
        color: '#4fc3f7',

    },
    itemPrimary: {
        color: 'inherit',
        fontSize: theme.typography.fontSize,
        '&$textDense': {
            fontSize: theme.typography.fontSize,
        },
    },
    textDense: {},
    divider: {
        marginTop: theme.spacing.unit * 2,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    blueAvatar: {
        margin: 10,
        color: '#fff8f9',
        backgroundColor: blueGrey[200],
    },

});

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built by '}
            <Link color="inherit" href="https://material-ui.com/">
                Christina and Michael Project 13
            </Link>
            {' team'}
        </Typography>
    );
}
class HomePage extends React.Component {
    state = {
        value: 0,
        valueNav:0,
        openMenu: false
    };


    handleClick = () => {
        this.setState(state => ({openMenu: !state.openMenu }));

    };

    handleNavClick=(value)=>{

        this.setState( ()=>({value: value }))
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    componentDidMount() {
        this.props.getEmployees();
    }

    logOut=(e)=>{
        e.preventDefault();

        this.props.logoutUser();
        this.props.history.push('/showLoginReg');

    };


    render() {
        const { classes,...other } = this.props;
        const { value } = this.state;
        console.log(this.state.value);

        const {user}=this.props.auth;


        var date = new Date().getDate();
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        return (
            <div className={classes.root}  style={{background:'#eceff1',}} >
                <div >
                <AppBar color="primary"  position="static" elevation={0} style={{height:'180px',width:'100%',
                    backgroundImage: "url(" + "https://vastphotos.com/files/uploads/photos/10175/high-resolution-new-york-city-skyline-m.jpg" + ")",
                }}

                >
                    <Toolbar  >
                        <Grid container spacing={8} alignItems="center">
                            <Hidden smUp>
                                <Grid item>
                                    <IconButton color="inherit" aria-label="Open drawer">
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                            </Hidden>
                            <Grid item xs />
                            <Grid item>
                                <Tooltip title="Alerts • No alters">
                                    <IconButton color="inherit">
                                        <NotificationsIcon />

                                    </IconButton>
                                </Tooltip>
                            </Grid>

                        </Grid>
                    </Toolbar>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography variant="h5" fontWeight={600} m={1} color="inherit" style={{marginRight:'8px',marginTop:'90px'}}
                            >
                                  מערכת לניהול קריאות במבני מגורים
                            </Typography>
                        </Grid>
                    </Grid>

                </AppBar>

                    <AppBar position="static"  style={{ backgroundColor: '#232f3e',top:'50'}}

                    >

                        <Tabs value={value} onChange={this.handleChange}>

                            <Tab variant="h6" textColor="inherit" label="ראשי" />
                            <Tab textColor="inherit" label="קריאות פתוחות" />
                            <Tab textColor="inherit" label="מעקב קריאות" />
                            <Tab textColor="inherit" label="ניתוח היום" />
                            <Tab textColor="inherit" label="אודות" />

                            <Tab  />
                            <Tab />
                            <Tab  />
                            <Tab  />
                        </Tabs>
                    </AppBar>

                </div>

                <Drawer variant="permanent" { ...other } anchor= 'left' >
                    <List disablePadding>
                        <ListItem className={ classNames(classes.firebase, classes.item, classes.itemCategory) }>
                            <Avatar alt="Remy Sharp"
                                    img src={CartIcon}
                                    style={{

                                        width: 50,
                                        height: 50,
                                    }}
                            />
                            F.M.S

                        </ListItem>
                        <ListItem variant="h1" className={ classNames( classes.item, classes.itemCategory)}>
                            {date+"."+month+"."+year+"      "+hours+":"+min}
                        </ListItem>
                        <ListItem className={ classNames(classes.item, classes.itemCategory) }>
                            <Avatar className={classes.blueAvatar}>{user.name[0]+user.last_name[0]}</Avatar>
                            <ListItemText
                                classes={ {
                                    primary: classes.itemPrimary,
                                } }
                            >

                                {user.name+" "+user.last_name}

                            </ListItemText>


                        </ListItem>
                        <ListItem button dense onClick={()=>this.handleClick()} className={ classNames(
                            classes.item,
                            classes.itemCategory,
                        ) }>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText
                                classes={ {
                                    primary: classes.itemPrimary,
                                } }
                                inset primary="עובדים"

                            />
                            {this.state.openMenu ? <ExpandLess /> : <ExpandMore />}

                        </ListItem>
                        <Collapse in={this.state.openMenu} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button   className={ classNames(
                                    classes.item,
                                    classes.itemCategory,
                                    classes.nested,
                                ) } value={value}  onClick={()=>this.handleNavClick(9)   }>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText   classes={ {
                                        primary: classes.itemPrimary,
                                    } } inset primary="ניהול עובדים"  />

                                </ListItem>

                                <ListItem button className={ classNames(
                                    classes.item,
                                    classes.itemCategory,
                                    classes.nested,
                                ) }  value={value}  onClick={()=>this.handleNavClick(5)}>
                                    <ListItemIcon>
                                        <DnsRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText  classes={ {
                                        primary: classes.itemPrimary,
                                    } } inset primary="הוספת עובד חדש" />
                                </ListItem>

                                <ListItem button className={ classNames(
                                    classes.item,
                                    classes.itemCategory,
                                    classes.nested,

                                ) }  value={value}  onClick={()=>this.handleNavClick(6)}>
                                    <ListItemIcon>
                                        <DnsRoundedIcon/>
                                    </ListItemIcon>
                                    <ListItemText  classes={ {
                                        primary: classes.itemPrimary,
                                    } } inset primary="הצגת פרטי עובד" >

                                    </ListItemText>

                                </ListItem>
                            </List>

                        </Collapse>

                        <ListItem button dense className={ classNames(
                            classes.item,
                            classes.itemCategory,
                        ) }>
                            <ListItemIcon>
                                <PublicIcon/>
                            </ListItemIcon>
                            <ListItemText
                                classes={ {
                                    primary: classes.itemPrimary,
                                } }
                                inset primary="פעילות עובדים"
                                value={value}  onClick={()=>this.handleNavClick(7)}
                            >

                            </ListItemText>
                        </ListItem>

                        <ListItem button dense onClick={()=>this.handleNavClick(8)} className={ classNames(
                            classes.item,
                            classes.itemCategory,
                        ) }>
                            <ListItemIcon>
                                <PublicIcon/>
                            </ListItemIcon>
                            <ListItemText
                                classes={ {
                                    primary: classes.itemPrimary,
                                } }
                                inset primary="הצמדת קריאות"
                            />

                        </ListItem>

                        <ListItem button dense onClick={this.logOut.bind(this)} className={ classNames(
                            classes.item,
                            classes.itemCategory,
                        ) }>
                            <SvgIcon>
                                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                            </SvgIcon>
                            <ListItemText
                                classes={ {
                                    primary: classes.itemPrimary,
                                } }
                                inset primary="התנתק"
                            />
                        </ListItem>

                    </List>
                </Drawer>





                {value === 0 &&  <TabContainer ><Home/></TabContainer>
                }
                {value === 1 && <TabContainer><TitleOpenCallsTab/><OpenCallsTab/></TabContainer>}
                {value === 2 && <TabContainer ><AddCall/></TabContainer>}
                {value === 3 && <TabContainer><TodayTab/></TabContainer>}
                {value === 4 && <TabContainer><AboutUs/></TabContainer>}
                {value === 9 && <TabContainer ><ManageEmployeeTab/></TabContainer>}
                {value === 6 && <TabContainer ><ShowEmployees/></TabContainer>}
                { value === 5 && <TabContainer ><AddNewEmployee/></TabContainer>}
                { value === 8 && <TabContainer ><PairComponent/></TabContainer>}
                { value === 7 && <TabContainer ><EmployeeActivity/></TabContainer>}

                <footer className={ classes.footer }>
                    <Typography variant="h6" align="center" gutterBottom>
                        F.M.S -fault management system

                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        ליצירת קשר ותמיכה טכנית :
                        <p>
                            קריסטינה :christina@gmail.com


                            מיכאל: michaek@gmail.com
                        </p>

                    </Typography>

                </footer>

                <MadeWithLove/>
            </div>





        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    setShowEmployee:PropTypes.func.isRequired,
    setAddEmployee:PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    employee:state.employee
    // showEmployees:state.showEmployees
});


export default connect(mapStateToProps,{logoutUser,setAddEmployee,setShowEmployee,getEmployees})(withStyles(styles)(withRouter(HomePage)));

/**
 <Avatar alt="Remy Sharp"
 img src={CartIcon}
 style={{

                                        width: 90,
                                        height: 90,
                                    }}
 />**/

/**
 <div  style={{
                    flexGrow: 1,
                    maxWidth: 1800,

                    overflow: 'hidden',
                    width: "100%",
                    height: "1000px",
                    backgroundImage: "url(" + "https://projectskillssolutions.com/assets/Building-Maintenance-slide1.jpg" + ")",    }} >


 </div>
 **/