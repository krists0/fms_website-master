
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import CardActions from "@material-ui/core/CardActions";

import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";

import red from "@material-ui/core/es/colors/red";

import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {connect} from "react-redux";
import {deleteEmployee, getEmployees, updateEmployee} from "../actions/employeeActions";
import {withRouter} from "react-router-dom";
import TextFieldGroupHeb from "../components/common/TextFieldGroupHeb";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";


const styles = theme => ({
    card: {
        maxWidth: 400,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        margin: '5px',


    },

    container: {
        flex: 1,
        flexDirection:"right",
        display: 'flex',
        justifyContent: 'space-between'
    },
    fab: {
        margin: theme.spacing.unit,
    },
});




class EditEmp extends React.Component {

    constructor(props){

        super(props);

        this.state={
            expanded: false,
            dChangeCard:false,
            dUpdatedDialog:false,
            openDelDialog:false,
            emp_id: props.emp_id,
            emp_name: props.emp_name,
            emp_last_name:props.emp_last_name,
            emp_email:props.emp_email,

        };


        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleDetailsChange=this.handleDetailsChange.bind(this);
        this.onDeleteClick=this.onDeleteClick.bind(this);

    }





    handleOpenDetailsChange=()=>{

        this.setState({dChangeCard:true})
    };

    handleDetailsChange=()=>{

        let empDetails={
            id: this.state.emp_id,
            u_emp_name:this.state.emp_name,
            u_emp_last_name:this.state.emp_last_name,
            u_emp_email:this.state.emp_email,
        };
        this.props.updateEmployee(empDetails);
        this.props.getEmployees();
        this.forceUpdate();
        this.handleCloseDetailsChange();


    };

    handleCloseDetailsChange=()=>{
        this.setState({dChangeCard:false})
    };



    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCloseDeleteClick = () => {
        this.setState({ openDelDialog: false });
    };
    handleDeleteClick=()=>{
        this.setState({ openDelDialog: true });

    };

    onDeleteClick(){
        let {emp_id}=this.state;
        this.props.deleteEmployee(emp_id);
        this.handleCloseDeleteClick();
    };
    render() {
        const { classes } = this.props;
        let {emp_name,emp_last_name,emp_email}=this.state;

        return (

            <Grid  >
                    <CardHeader
                    > <h>{emp_name}</h></CardHeader>

                    <Card  class='row-wise-spread' style={{paddingLeft:'90px'}}>
                        {!this.state.dChangeCard ?

                            <CardContent>
                                <Typography component="p">
                                    שם העובד :{emp_name}<br />
                                    שם משפחה :{emp_last_name}<br />
                                    אימייל :{emp_email}<br />

                                    תפקיד: איש אחזקה
                                </Typography>
                            </CardContent>
                            :
                            <div >
                                <TextFieldGroupHeb
                                    style={{paddingRight:'30px'}}
                                    label="שם"
                                    name="emp_name"
                                    type="name"
                                    value={this.state.emp_name}
                                    onChange={this.handleInputChange}
                                    //error={errors.name}

                                />

                                <TextFieldGroupHeb
                                    style={{paddingRight:'30px'}}
                                    label="שם משפחה"
                                    name="emp_last_name"
                                    type="last name"
                                    value={this.state.emp_last_name}
                                    onChange={this.handleInputChange}
                                    // error={errors.last_name}

                                />

                                <TextFieldGroupHeb
                                    label="דואר אלקטרוני"
                                    name="emp_email"
                                    type="email"
                                    value={this.state.emp_email}
                                    onChange={this.handleInputChange}
                                    style={{paddingRight:'30px'}}
                                />

                                <div className={classNames(classes.container)}>
                                    <Button  onClick={this.handleCloseDetailsChange} size={'small'} color="primary"  className={classes.button} >
                                        ביטול
                                    </Button>
                                    <Button color="primary" onClick={this.handleDetailsChange} variant={"text"} size={'small'}  className={classes.button} >
                                        שמור שינויים
                                    </Button>

                                </div>
                            </div>}


                    </Card>



                    <CardActions className={classes.actions} disableActionSpacing>

                        <Button size="small" color="primary" onClick={ this.handleOpenDetailsChange}  >
                            עריכה
                        </Button>
                        <Button  onClick={this.handleDeleteClick}  size="small" color="primary">
                            מחק
                            <DeleteIcon/>
                        </Button>



                    </CardActions>

                    <Dialog
                        open={this.state.openDelDialog}
                        onClose={this.handleCloseDeleteClick}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"מחיקת עובד מהמערכת"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                האם ברצונך למחוק עובד זה מהמערכת ? פעולה זו לא ניתנת לשינוי לאחר מכן.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseDeleteClick} color="primary">
                                ביטול
                            </Button>
                            <Button onClick={this.onDeleteClick} color="primary" autoFocus>
                                מחק
                            </Button>
                        </DialogActions>
                    </Dialog>

            </Grid>
        );
    }
}


EditEmp.propTypes = {
    //errors: PropTypes.object.isRequired,
    deleteEmployee:PropTypes.func.isRequired,
    updateEmployee:PropTypes.func.isRequired,
    getEmployees:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,

};

export default connect("",{deleteEmployee,updateEmployee,getEmployees})(withStyles(styles)(withRouter(EditEmp)));
