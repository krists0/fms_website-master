
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteCall} from '../actions/callActions';
import Typography from '@material-ui/core/Typography';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Popover from '@material-ui/core/Popover';
import PairCallToEmp from './PairCallToEmp';
import { withStyles} from '@material-ui/core/styles';
import { deleteActivity } from '../actions/activityActions';
import EmpAttach from "./EmpAttach";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from '@material-ui/icons/Assignment';
/**
 * feed the cells with open calls
 */
const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class CallsFeed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dOpen: false,
            dCallId: "",
            calls:null,
            anchorEl: null,
            activity: null,
        };
    }


    handleClose = () => {
        this.setState({ dOpen: false });
    };
    handleDeleteClick=(id)=>{

        this.setState({ dOpen: true });
        this.setState({ dCallId: id });
    };


    deleteCallActivities=(id)=>{

        if(this.state.activity){
            this.state.activity.forEach(act => {
                if (act.call._id === id) {
                    this.props.deleteActivity(act._id);
                }
            })
        }
    };

    onDeleteClick(id){
        this.deleteCallActivities(id);
        this.props.deleteCall(id);

        this.handleClose();
    };

    handleClickPop = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
        console.log("anchorEl:"+this.state.anchorEl);
    };

    handleClosePop=()=>{
        this.setState({
            anchorEl: null,
        });

    };


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            activity: nextProps.activity.activity
        })
    };
    componentDidMount() {
      this.setState({activity:this.props.activity.activity})
    };



    render() {
        const { classes } = this.props;
        const { calls} = this.props;

        const { anchorEl} = this.state;
        const openPop = Boolean(anchorEl);
        const {handleSuccessSnack,handleCloseSnack}=this.props;

        function trackingColor(priority){
            console.log("tracking  status="+priority);

                if(priority==='גבוהה'){
                    console.log("high");
                    return(
                        <Avatar style={{background:"#f44336"}}>
                            <AssignmentIcon />
                        </Avatar>
                );}
                if(priority==="בינונית"){
                    return(
                        <Avatar style={{background:"#ff9800"}}>
                            <AssignmentIcon />
                        </Avatar>


                    );}
                if(priority==="נמוכה"){
                    return(
                        <Avatar style={{background:"#ffeb3b"}}>
                            <AssignmentIcon />
                       </Avatar>

                );}

        }
        return (

            <div >
                <ExpansionPanel style={{textAlign:'right'}}>
                    <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon/> } style={{display:'flex',flexDirection:'row'}}>
                        <div style={{flex:'0'}}>
                            {trackingColor(calls.call_priority)}
                        </div>
                        <span style={{flex:'1',flexDirection:'row',marginRight:'10px'}}> דירה :{calls.call_name}   </span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{textAlign:'right'}}>
                        <Typography variant="h7" gutterBottom  >
                            <p >
                            <span> תיאור הקריאה :{calls.call_description} </span>
                            </p>
                            <p>
                                <span>  עדיפות לטיפול קריאה :{calls.call_priority}   </span>

                            </p>
                            <p>
                           <span> שם העובד המטפל :{ <EmpAttach  calls={calls}/> } </span>
                            </p>
                            <p >
                                <span> סטטוס :{calls.call_status} </span>
                            </p>
                        </Typography>


                    </ExpansionPanelDetails>

                    <Button onClick={this.handleDeleteClick.bind(this,calls._id)} variant="contained" color="primary">
                        מחק
                        <DeleteIcon/>
                    </Button>



                    <Dialog
                        open={this.state.dOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle>{"מחיקת קריאה-תקלה מהמערכת"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                האם ברצונך למחוק קריאה זו מהמערכת ? פעולה זו לא ניתנת לשינוי לאחר מכן.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                ביטול
                            </Button>
                            <Button onClick={()=>this.onDeleteClick(this.state.dCallId)} color="primary" autoFocus>
                                מחק
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Button variant="contained"
                            color="primary"
                            aria-owns={openPop ? 'simple-popper' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClickPop}>
                        הצמד
                    </Button>

                    <Popover
                        id="simple-popper"
                        open={openPop}
                        anchorEl={anchorEl}
                        onClose={this.handleClosePop}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >

                        <div className={classes.typography}><PairCallToEmp call={calls}
                                                                           handleSuccessSnack={handleSuccessSnack}
                                                                           handleCloseSnack={handleCloseSnack}
                                                                            handleClosePop={this.handleClosePop}/></div>

                    </Popover>



                </ExpansionPanel>


            </div>
        );

    }
}

CallsFeed.propTypes = {
     calls: PropTypes.array.isRequired,
    deleteCall:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    deleteActivity:PropTypes.func.isRequired,
};



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    activity: state.activity,

});


export default connect(mapStateToProps,{deleteActivity,deleteCall})(withStyles(styles)(withRouter(CallsFeed)));