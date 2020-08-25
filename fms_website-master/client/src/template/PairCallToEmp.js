import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getEmployees} from "../actions/employeeActions";
import {addNewActivity} from "../actions/activityActions";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListSubheader from "@material-ui/core/ListSubheader";
import green from "@material-ui/core/es/colors/green";
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,

    },

    success: {
        backgroundColor: green[600],
    },

    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },


});



class PairCallToEmp extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            call: this.props.call,
            emp: null,
            selectedIndex:0,
            employeesList:[],
        };
        this.filterEmployees=this.filterEmployees.bind(this);
    }





    componentDidMount() {
        this.setState({employeesList:this.props.employee.employees});
    }

    componentWillReceiveProps(newProps) {

        this.setState({employeesList: newProps.employee.employees});

    };


    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index,emp:this.state.employeesList[index] });
    };


    handlePair=()=>{

       let pairDetails={
            call:this.state.call,
            employee: this.state.emp,

        };


       this.props.addNewActivity(pairDetails);
       this.props.handleSuccessSnack();
       this.props.handleClosePop();

    };






    filterEmployees(e)
    {

        let updatedList = this.state.employeesList;

        updatedList = updatedList.filter((item =>{
            return (item.emp_name.search(
                e.target.value) !== -1)||(item.emp_last_name.search(
                e.target.value) !== -1);

        }) );

        this.setState({
            employeesList: updatedList,
        });

        if(e.target.value==="") {
            this.setState({
                employeesList: this.props.employee.employees,
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


    render(){

        const { classes } = this.props;
        const {employeesList}=this.state;

        let empList=employeesList.map((emp, index)=>

                    < ListItem
                        key={emp._id}
                        button
                        selected={this.state.selectedIndex === index}
                        onClick={event => this.handleListItemClick(event, index)}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={emp.emp_name +" "+emp.emp_last_name} />

                    </ListItem>


                    );



        return(
                <div>

                <div className={classes.root}>

                        <ListSubheader >
                        <TextField
                            type="text"
                            className="right-block"
                            placeholder="חפש עובדים"
                            onChange={this.filterEmployees}
                            style={{ backgroundColor: 'inherit',}}
                        />
                        </ListSubheader>
                        {/*<br/>*/}
                        {/*<br/>*/}
                    <List component="nav">
                        {empList}

                    </List>

                </div>
            <div>
                <Button variant="contained" onClick={this.handlePair} size="small" color="primary" >
                הצמד
                </Button>

            </div>


        </div>






        );





    }





}


PairCallToEmp.propTypes = {
    classes: PropTypes.object.isRequired,
    //errors: PropTypes.object.isRequired,
    //auth: PropTypes.object.isRequired,
    getEmployees:PropTypes.func.isRequired,
    addNewActivity:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    //errors: state.errors,
    //auth: state.auth,
    employee: state.employee,
});


    export default connect(mapStateToProps, { addNewActivity,getEmployees })(withStyles(styles)(withRouter(PairCallToEmp)));



