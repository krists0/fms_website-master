import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {addNewCall,getCalls} from '../actions/callActions';
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {withStyles} from "@material-ui/core";
import EmpAttach from "./EmpAttach";
import Divider from '@material-ui/core/Divider';



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',

    },
    table: {
        minWidth: 1020,


    },
});




class OpenCallsTab extends Component {
    constructor(props) {

        super(props);
        this.state = {
            errors: {}
        };

    }

    componentDidMount() {
        this.props.getCalls();
    }

    render() {

        const { classes } = this.props;
        const { calls} = this.props.calls;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        return (

            <div className="post-form mb-3" style={{display: 'flex', justifyContent: 'center' }}>

                <Paper className={classes.root}  >


                    <Divider  />

                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>מיקום הקריאה</TableCell>
                                <TableCell align="left">תיאור הקריאה</TableCell>
                                <TableCell align="left">עדיפות לטיפול הקריאה</TableCell>
                                <TableCell align="left">עובד מטפל</TableCell>
                                <TableCell align="left">סטטוס טיפול </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calls.map(call => (
                                <TableRow key={call._id}>
                                    <TableCell component="th" scope="row">
                                        {" דירה מספר: "+call.call_name}
                                    </TableCell>
                                    <TableCell align="left">{call.call_description}</TableCell>
                                    <TableCell align="left">{call.call_priority}</TableCell>
                                    <TableCell align="left">   { <EmpAttach calls={call}>f</EmpAttach> }</TableCell>
                                    <TableCell align="left">{call.call_status}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Paper>

            </div>


        );

    }

}




OpenCallsTab.propTypes = {
    addNewCall: PropTypes.func.isRequired,
    getCalls: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    calls: state.calls,
});




export default connect(mapStateToProps, { addNewCall,getCalls })( withStyles(styles)(withRouter(OpenCallsTab)));




/**

 import React, {Component} from 'react';
 import PropTypes from 'prop-types';


 import {connect} from "react-redux";
 import CallsFeed from './CallsFeed';
 import { withRouter } from 'react-router-dom';
 import {addNewCall,getCalls} from '../actions/callActions';
 import Card from "@material-ui/core/Card";
 import Table from "@material-ui/core/Table";
 import CardContent from "@material-ui/core/CardContent";
 import Paper from "@material-ui/core/Paper";
 import TableHead from "@material-ui/core/TableHead";
 import TableCell from "@material-ui/core/TableCell";
 import TableBody from "@material-ui/core/TableBody";
 import TableRow from "@material-ui/core/TableRow";
 import {withStyles} from "@material-ui/core";




 class OpenCall extends Component {
    constructor(props) {

        super(props);
        this.state = {
            errors: {}
        };

    }

    componentDidMount() {
        this.props.getCalls();
    }

    render() {

        const { errors } = this.state;
        const { calls} = this.props.calls;
        console.log("calls"+calls);
        let callContent;
        if (calls === null ) {
            console.log("calls are null");
        } else {
            callContent = <CallsFeed calls={calls} />;
        }
        console.log("calls="+this.props.calls);

        console.log(" cfg="+this.props.call_name);
        return (
            <div className="post-form mb-3" style={{marginLeft:'250px',marginRight:'250px'}}>
                <div className="card card-info">
                        <div className="header">
                            קריאות פתוחות
                        </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div>
                                { callContent }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}




 OpenCall.propTypes = {
    addNewCall: PropTypes.func.isRequired,
    getCalls: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

 const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    calls: state.calls,
});




 export default connect(mapStateToProps, { addNewCall,getCalls })(withRouter(OpenCall));
 **/