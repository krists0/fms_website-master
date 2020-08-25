
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {deleteCall} from '../actions/callActions';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import { getActivity } from '../actions/activityActions';
import {getEmployees} from "../actions/employeeActions";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PairComponent from "./PairComponent";
import Button from "@material-ui/core/Button";


const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
    cardGrid: {
        paddingTop: '64px',
        paddingBottom:  '64px',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    card: {
        height: '98%',
        display: 'flex',
        flexDirection: 'column',
    },
});

class FeedEmployeeActivity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dOpen: false,
            dCallId: "",
            calls:null,
            anchorEl: null,
            activity: this.props.activity.activity,
            expanded: false,
            dChangeCard:false,
            dUpdatedDialog:false,
            openDelDialog:false,
            emp_id: props.emp_id,
            emp_name: props.emp_name,
            emp_last_name:props.emp_last_name,
            emp_email:props.emp_email,
            nEmployee:this.props.nEmployee,
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleDetailsChange=this.handleDetailsChange.bind(this);
        this.onDeleteClick=this.onDeleteClick.bind(this);
    }
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
    onDeleteClick(){
        let {emp_id}=this.state;
        this.props.deleteEmployee(emp_id);
        this.handleCloseDeleteClick();
    };
    handleClose = () => {
        this.setState({ dOpen: false });
    };
    handleClosePop=()=>{
        this.setState({
            anchorEl: null,
        });

    };
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            activity: nextProps.activity.activity,
            nEmployees: nextProps.employee.employees
        });

    };

    componentDidMount() {
        this.props.getActivity();
    };
    render() {
        const {classes} = this.props;
        const { nEmployee} = this.state;

        const { activity} = this.state;

        function GetActivity(id){

            let GetAct= activity.map((activity) =>{

                if(activity.employee._id === id && activity.employee.emp_name !=null ) {
                    return   <Grid item key={activity.call._id}  xs={ 9 } sm={ 6 } md={ 3 }>
                        <Card className={ classes.card }  >
                            <CardMedia
                                className={ classes.cardMedia }
                                image="https://www.sba.co.il/wp-content/uploads/2018/01/shutterstock_701174023.jpg"
                                title="Image title"
                            />
                            <CardContent className={ classes.cardContent }>
                                <Typography gutterBottom variant="h6" component="h2">
                                   דירה : {activity.call.call_name}
                                </Typography>
                                <Typography>
                                    <CardContent>
                                        <Typography variant="h7" color="textSecondary"  align="center">
                                            תיאור התקלה בדירה :{activity.call.call_description}
                                        </Typography>
                                        <Typography variant="h7" color="textSecondary"  align="center">
                                        עדיפות לטיפול הקריאה :{activity.call.call_priority}
                                        </Typography>

                                    </CardContent>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                }


            });
            return (GetAct);

        }



        return (


            <div >
                <ExpansionPanel style={{textAlign:'right'}}>
                    <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon/> }>
                        <span  >{
                            <p variant="h4" align="center">
                                לחץ לפעילות עובד
                            </p>
                        } </span>
                    </ExpansionPanelSummary>

                    <Grid className={ classes.cardGrid } maxWidth="md" style={{background:"#cfd8dc"}}>
                        <Grid container spacing={ 4 }>


                            {GetActivity(nEmployee._id)}
                        </Grid>

                    </Grid>

                </ExpansionPanel>


            </div>
        );

    }
}


FeedEmployeeActivity.propTypes = {

    calls: PropTypes.array.isRequired,
    deleteCall:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    getActivity:PropTypes.func.isRequired,
    getEmployees:PropTypes.func.isRequired,

};



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    activity: state.activity,
    employee: state.employee,

});


export default connect(mapStateToProps,{getActivity,deleteCall,getEmployees})(withStyles(styles)(withRouter(FeedEmployeeActivity)));

