import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewEmployee} from "../actions/employeeActions";

import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import PeopleIcon from '@material-ui/icons/People';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";

import ShowEmployees from "./ShowEmployees";


const styles =theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
    },

});

class AddNewEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            last_name:'',
            email:'',
            errors: {},
            dOpen:false
        };
        this.handleInputChange=this.handleInputChange.bind(this);
    }



    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    handleDialogClose=()=>{
        this.setState({dOpen:false})
    };


    submitAddEmployee=(event)=> {
        event.preventDefault();


        const newEmployee = {
            emp_name:this.state.name,
            emp_last_name:this.state.last_name,
            emp_email: this.state.email,
        };

        console.log(newEmployee);


        this.props.addNewEmployee(newEmployee, this.props.history);
        this.setState({dOpen:true,name:"",last_name:"",email:""})
    };

    render() {

        const {errors}=this.state;

        const {classes } = this.props;

        return (

            <div>

                <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap >
                        <PeopleIcon color="white" />
                        הוספת עובד
                    </Typography>
                </Toolbar>
            </AppBar>

                    <div className={ classes.heroContent } style={{  backgroundImage: 'url(https://www.sba.co.il/wp-content/uploads/2018/01/shutterstock_701174023.jpg)',
                        flex: '1',
                    }}
                    >
                        <Grid maxWidth="sm">

                            <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                                הוסף עובד חדש
                            </Typography>
                            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                מלא את כלל השדות להוספת עובד חדש למערכת
                            </Typography>
                        </Grid>
                    </div>

            <Card className={classes.card} style={{display: 'flex', justifyContent: 'center' ,marginTop:"50px"}}>
                <CardContent  >
                    <Typography style={{display: 'flex', justifyContent: 'right',textAlign:'right'}} className={classes.title} color="textSecondary" gutterBottom>
                        <br />
                        נא הזן את כל הפרטים המתבקשים ולאחר מכן אישור
                    </Typography>
                    <Typography component="div"  size="small"  >

                        <form style={{textAlign:'center',
                        }} >
                            <Card >

                            <TextField
                                autoComplete="שם"
                                margin="normal"
                                variant="outlined"
                                placeholder="שם"
                                label="שם"
                                name="name"
                                type="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                error={errors.name}
                                style={{textAlign:'right',width:'400px', margin:"center",}}
                            />

                            <TextField
                                autoComplete="שם משפחה"
                                margin="normal"
                                variant="outlined"
                                style={{textAlign:'right',width:'400px',margin:"center"}}
                                placeholder="שם משפחה"
                                label="שם משפחה"
                                name="last_name"
                                type="last name"
                                value={this.state.last_name}
                                onChange={this.handleInputChange}
                                error={errors.last_name}

                            />

                            <TextField
                                autoComplete="דואר אלקטרוני"
                                margin="normal"
                                variant="outlined"
                                placeholder="דואר אלקטרוני"
                                label="דואר אלקטרוני"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                error={errors.email}
                                style={{textAlign:'right',width:'400px',margin:"center"}}
                            />

                            <CardActions>
                            <button

                                color="primary"
                                type="button"
                                size="small"
                                className="login-btn"
                                onClick={this
                                    .submitAddEmployee
                                    .bind(this)}>אישור</button>
                            </CardActions>
                                <div  style={{  backgroundImage: 'url(http://www.bestplumbers.ca/wp-content/uploads/2014/01/3D-Plumber-Wrench-Toolbox-opt.jpg)',
                                    height:'250px',width:'350px',
                                }}/>

                            </Card>
                            <Dialog
                                open={this.state.dOpen}
                                onClose={this.handleDClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"הוספת עובד למערכת"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        נוסף עובד/ת חדש/ה למערכת.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleDialogClose} color="primary">
                                        אישור
                                    </Button>

                                </DialogActions>
                            </Dialog>
                        </form>
                    </Typography>
                </CardContent>
                <ShowEmployees/>

            </Card>


            </div>

                );





/**

            <Card  className={classes.card}>



                <div className="header">
                    הוספת עובד חדש
                </div>
                <div className="box">


                    <TextFieldGroup
                        placeholder="שם"
                        label="שם"
                        name="name"
                        type="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        error={errors.name}
                        //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup
                        placeholder="שם משפחה"
                        label="שם משפחה"
                        name="last_name"
                        type="last name"
                        value={this.state.last_name}
                        onChange={this.handleInputChange}
                        error={errors.last_name}
                        //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup
                        placeholder="דואר אלקטרוני"
                        label="דואר אלקטרוני"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        error={errors.email}
                        //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .submitAddEmployee
                            .bind(this)}>הוסף עובד</button>
                </div>
            </Card>
        );

 style={{ backgroundImage: "url(" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr4zPMq8_Ctfec-5C4KS9lq2ThgoQjcMucunnYL8LduEiBts97Sg" + ")",
                }}
 **/
    }

}


AddNewEmployee.propTypes = {
    addNewEmployee: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    employee:state.employee,
    errors: state.errors
});





export default connect(mapStateToProps, { addNewEmployee })( withStyles(styles)(withRouter(AddNewEmployee)));
