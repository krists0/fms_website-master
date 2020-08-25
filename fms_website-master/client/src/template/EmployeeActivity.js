import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { withStyles} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {addNewCall,getCalls} from '../actions/callActions';
import CardContent from "@material-ui/core/CardContent";
import green from "@material-ui/core/es/colors/green";
import { getActivity} from "../actions/activityActions";
import {getEmployees} from "../actions/employeeActions";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import FeedEmployeeActivity from "./FeedEmployeeActivity";



const styles = theme => ({


    success: {
        backgroundColor: green[600],
    },

    iconSnack: {
        fontSize: 20,

    },
    iconVariant: {
        opacity: 0.9,
        marginLeft: theme.spacing.unit *3,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },


});



class EmployeeActivity extends Component {

    constructor(props) {

        super(props);
        this.state = {

            call_name: '',
            call_priority: '',
            call_description: '',
            errors: {},
            nCalls: this.props.calls.calls,
            open: false,
            dOpen:false,
            emptySearchMessage:false,
            openSnack:false,
            activity: this.props.activity.activity,
            nEmployees:this.props.employee.employees,

        };
        this.props.getActivity();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.filterCalls = this.filterCalls.bind(this);
    }




    componentDidMount() {
        this.props.getCalls();
        this.props.getActivity();
        window.scrollTo(0, 0);
    }


    componentWillReceiveProps(newProps) {

        if (newProps.errors) {
            this.setState({ errors: newProps.errors });

        }
        this.setState({nCalls: newProps.calls.calls});
        this.setState({
            activity: newProps.activity.activity
        });
        this.setState({nEmployees: newProps.employee.employees});

    }


    handleSuccessSnack = () => {
        this.setState({ openSnack: true });
    };

    handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnack: false });
    };


    filterCalls(e)
    {
        let updatedList = this.state.nCalls;
        updatedList = updatedList.filter((item =>{
            return item.call_name.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        }) );

        let updatedList2 = this.state.nEmployees;

        updatedList2 = updatedList2.filter((item =>{
            return item.emp_name.search(
                e.target.value) !== -1;
        }) );

        this.setState({
            nEmployees: updatedList2,
        });

        if(e.target.value==="") {
            this.setState({
                nEmployees: this.props.employee.employees,
            });
        }

        if (updatedList2 === 0 ) {
            this.setState({
                emptySearchMessage: true,
            });
        } else {
            this.setState({
                emptySearchMessage: false,
            });


        }
        this.setState({
            nCalls: updatedList,
        });

        if(e.target.value==="") {
            this.setState({
                nCalls: this.props.calls.calls,
            });
        }

        if (updatedList === 0 ) {
            this.setState({
                emptySearchMessage: true,
            });
        } else {
            this.setState({
                emptySearchMessage: false,
            });


        }

    }



    onSubmit(e) {

        this.setState({ open: true });
        e.preventDefault();
        //  const { user } = this.props.auth;

        const newCall= {
            call_priority: this.state.call_priority,
            call_name: this.state.call_name,
            call_description: this.state.call_description,
            calls:[],
            // name: user.name

        };


        this.props.addNewCall(newCall, this.props.history);


        this.setState({ call_name: '',call_description: '',call_priority:'',dOpen:true });
        this.forceUpdate();
    }



    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });

    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDClose=()=>{

        this.setState({ dOpen: false });
    };



    render() {

        const { nEmployees  } = this.state;

        function createListEmp(empList){
            let emplList= empList.map((emp) =>
                <li style={{listStyle: 'none'}} key={emp._id}>
                    <Typography  variant="h6" align="center" color="Primary" >
                        { emp.emp_name + " " + emp.emp_last_name }
                    </Typography>

                        <FeedEmployeeActivity nEmployee={ emp }/>

                </li>
            );
            return (emplList);
        }
        let empContent;
        if (nEmployees=== null ) {

            console.log("no emp found");
        } else {
            //alertCalls();
            empContent = createListEmp(nEmployees);
        }

        return (
            <div>

                <AppBar position="relative">
                    <Toolbar>

                        <Typography variant="h6" color="inherit" noWrap >

                            פעילות עובדים
                        </Typography>
                    </Toolbar>
                </AppBar>
                    <div
                        style={{  backgroundImage: 'url(https://www.johnsplumbinghvac.com/uploads/1537190015slider.jpg)',
                            flex: '1',padding: '20px',
                        }}
                    >
                        <Grid maxWidth="sm">
                            <Typography component="h1" variant="h5" align="center"  style={{ color:'#e1f5fe',}} gutterBottom>
                                פעילות עובדים
                            </Typography>
                            <Typography variant="h6" align="center"  style={{ color:'#e1f5fe',}} paragraph>
                                לחץ על העובד הרצוי בכדי לעיין בפעילותו ובמטלות הקשורות אליו.
                            </Typography>
                        </Grid>
                    </div>

                <Card style={{marginTop:'50px'}}>
                    <CardContent>
                        <div style={{textAlign:'center'} }>
                            {empContent}
                        </div>
                    </CardContent>
                </Card>
            </div>

        );

    }

}




EmployeeActivity.propTypes = {
    addNewCall: PropTypes.func.isRequired,
    getCalls: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getActivity: PropTypes.func.isRequired,
    getEmployees:PropTypes.func.isRequired

};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    calls: state.calls,
    activity: state.activity,
    employee: state.employee,
});




export default connect(mapStateToProps, { addNewCall,getCalls,getActivity,getEmployees })(withStyles(styles)(withRouter(EmployeeActivity)));

