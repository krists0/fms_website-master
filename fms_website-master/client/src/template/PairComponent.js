import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getEmployees} from "../actions/employeeActions";
import {addNewActivity,deleteActivity,getActivity} from "../actions/activityActions";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import PairComponentAddAct from './PairComponentAddAct';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
import CardContent from "@material-ui/core/CardContent";
import OpenCallsTab from "./OpenCallsTab";





const styles = theme => ({

    parent :{
    display: 'flex',
    flexDirection:'row',
        backgroundColor:'white',
        marginTop: '50px',
   },

    columnRight :{
        flex: '1 1 0px',
        width:'80px',
    },

    columnMid :{
        display:'flex',
        flex: '1 1 0px',

        marginLeft:30,
    },

    columnLeft :{
        flex: '1 1 0px',


    },

    callDiv:{
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
    },

    ul:{
        display: 'flex',
        flexDirection:'row',
        maxHeight: 300,

    },

    list:{
        width:'75%',
        maxWidth: 450,

    },

    rightIcon: {
        marginLeft: theme.spacing.unit,
    },

    mid:{
      flexDirection:'column',
    },

    button:{
      maxHeight:30,
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: '30px',
    },

});






class PairComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            emp: null,
            selectedIndex:0,
            employeesList: [],
            callsList:[],
            addCalls:false,
            addAct:false,
            pActs:[],
            act:{call:null,employee:null},
            activity:[],
        };

        this.filterEmployees=this.filterEmployees.bind(this);
        this.filterCalls=this.filterCalls.bind(this);
        this.addPActs=this.addPActs.bind(this);
;    }






    componentDidMount() {
        this.props.getActivity();
        this.setState({employeesList:this.props.employee.employees,emp:this.props.employee.employees[this.state.selectedIndex],callsList:this.props.calls.calls});
        window.scrollTo(0, 0);
    };

    componentWillReceiveProps(newProps) {

        this.setState({employeesList: newProps.employee.employees,callsList:newProps.calls.calls,activity:newProps.activity.activity,});

    };


    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index,emp:this.state.employeesList[index],pActs:[] });
    };

    handleDeleteActivity=(act_id)=>{
        this.props.deleteActivity(act_id);
    };


    ///adds picked up activities to array before adding them to the employee
    addPActs(act){
        let removed=false;
        if (this.state.pActs !==[]) {
            this.state.pActs.forEach(pAct => {
                if (pAct.call._id === act.call._id) {
                    this.state.pActs.splice(this.state.pActs.indexOf(pAct),1);
                        removed=true;
                }
            });
        }
        if(!removed)
          this.state.pActs.push(act);

    };

    ///adds the activities to the worker
    handleAddAct=()=> {
        let exist=false;
        if(this.state.pActs!==null){
            this.state.pActs.forEach((act)=>{
                this.state.activity.forEach( (activity)=>{
                    if(activity.employee._id===this.state.emp._id) {
                        if (activity.call._id === act.call._id)
                            exist = true;
                    }
                    });
                if(!exist){
                this.props.addNewActivity(act);
                }
                exist=false;});
        }
        this.setState({pActs:[]});

    };




    ///search for employee
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


    }

    filterCalls(e)
    {
        let updatedList = this.state.callsList;
        updatedList = updatedList.filter((item =>{
            return item.call_name.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        }) );

        this.setState({
            callsList: updatedList,
        });

        if(e.target.value==="") {
            this.setState({
                callsList: this.props.calls.calls,
            });
        }

    }


    handleOpenAddCalls=()=>{

        this.setState({addCalls:!this.state.addCalls});
    };





 render(){

    const {addAct,act}=this.state;
    const {classes} = this.props;
    const {activity}=this.props.activity;
    const {employeesList,emp,callsList,addCalls} = this.state;
     let self=this;
    let empId;
    let empName="", empLastName="";
    if(emp!==null){
        empId=emp._id;
        empName=emp.emp_name;
        empLastName=emp.emp_last_name
    }
    else {
        empId = 0;
    }



    let empList = employeesList.map((emp, index) =>
        < ListItem
            key={emp._id}
            button
            style={{textAlign:'right'}}
            selected={this.state.selectedIndex === index}
            onClick={event => this.handleListItemClick(event, index)}
        >
            <ListItemIcon>
                <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary={emp.emp_name + " " + emp.emp_last_name}/>

        </ListItem>
    );

    function getEmpCallList(emp_id) {
        let CallsList = activity.map((act, index) =>{
            if (act.employee._id === emp_id) {
                return <li style={{listStyle:'none'}} key={act._id}>
                    <Chip color="primary"
                          onDelete={()=>self.handleDeleteActivity(act._id)}
                          label={act.call.call_name + " " + act.call.call_description}/>
                          <br/>
                            <br/>
                </li>
            }
        });

        return (CallsList);
    }


    function getAddCalls(){

        let addCallsList=callsList.map((call)=>
            <ul className={classes.ul} >
            <li  className={classes.list} style={{listStyle:'none'}} key={call._id}>
              <PairComponentAddAct  addPActs={self.addPActs} act={act} call={call} emp={emp} />
            </li>
            </ul>


        );


        return (addCallsList)
    }

    return (

        <div >
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap >
                        הצמדת קריאות
                    </Typography>
                </Toolbar>
            </AppBar>
            <div  style={{  backgroundImage: 'url(http://netplumb.co.uk/wp-content/uploads/2015/03/banner.jpg)',
                height:'200px',width:'100%',
            }}/>
            <main>
                <div className={ classes.heroContent }
                >

                    <Grid maxWidth="sm">

                        <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                            הצמד קריאה לעובד
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            הצמד קריאה-תקלה לעובד , ניתן למחוק ולהוסיף קריאות לעובד
                        </Typography>

                        {addCalls ? <Button variant="contained" color="primary" onClick={this.handleOpenAddCalls} className={classes.button}>
                                הסתר הוספת קריאה לעובד
                            </Button>:
                            <Button variant="outlined"  color="primary" onClick={this.handleOpenAddCalls} className={classes.button}>
                               הוסף קריאה לעובד
                            </Button>}
                    </Grid>
                </div>
            </main>

            <div className={classes.parent}>
            <div className={classes.columnRight} style={{marginTop:"50px"}}>
                <CardContent style={{ background:'white', }}>
                    <Paper className={classes.paper}>

                        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                            <Toolbar>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>

                                        <SearchIcon className={classes.block} color="inherit" />
                                    </Grid>
                                    <Grid item xs>

                                        <TextField
                                            type="text"
                                            className="right-block"

                                            onChange={this.filterEmployees}
                                            style={{backgroundColor: 'inherit',}}
                                            fullWidth
                                            placeholder="חפש עובדים במערכת"
                                            InputProps={{
                                                disableUnderline: true,
                                                className: classes.searchInput,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Paper>

                </CardContent>

                <List component="nav">
                    {empList}
                </List>

            </div>
            <div className={classes.columnMid}>
                <div className={classes.mid}>
                <p style={{fontSize:'35px'}}>{empName+" "+empLastName }</p>
                {getEmpCallList(empId)}
                </div>

            </div>

            <Slide direction="right" in={addCalls} mountOnEnter unmountOnExit>
            <div className={classes.columnLeft}>
                <div className={classes.callDiv}>
                <ListSubheader>
                    <TextField
                        type="text"
                        className="right-block"
                        placeholder="חפש קריאות"
                        onChange={this.filterCalls}
                        style={{backgroundColor: 'inherit',}}
                    />
                </ListSubheader>
                {/*<br/>*/}
                {/*<br/>*/}
                <List component="nav">
                    {getAddCalls()}

                </List>
                </div>

                <span style={{direction:'left'}}>
                <Fab color="primary" aria-label="Add" onClick={this.handleAddAct} className={classes.fab}>
                    <AddIcon />
                </Fab>
                </span>
            </div>
            </Slide>

            </div>
           <OpenCallsTab/>
        </div>


    );


  }


}




PairComponent.propTypes={
    classes:PropTypes.object.isRequired,
    getEmployees:PropTypes.func.isRequired,
    addNewActivity:PropTypes.func.isRequired,
    getActivity:PropTypes.func.isRequired,
    deleteActivity:PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    //errors: state.errors,
    //auth: state.auth,
    activity:state.activity,
    employee: state.employee,
    calls:state.calls,
});



export default connect(mapStateToProps, { addNewActivity,getEmployees,deleteActivity,getActivity })(withStyles(styles)(withRouter(PairComponent)));








