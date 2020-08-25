import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { withStyles} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {addNewCall,getCalls} from '../actions/callActions';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import green from "@material-ui/core/es/colors/green";
import { getActivity} from "../actions/activityActions";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import CardContent from "@material-ui/core/CardContent";
import { Chart} from "@devexpress/dx-react-chart-material-ui";
import PieChart from 'react-minimal-pie-chart';
import {getEmployees} from "../actions/employeeActions";



const data = [
  { priority: 'גבוהה', area: 12 },
  { priority: 'בינונית', area: 7 },
  { priority: 'נמוכה', area: 7 },

];







const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },

    iconSnack: {
        fontSize: 20,

    },
    iconVariant: {
        opacity: 0.9,
        marginLeft: '24px',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    searchCall: {
        marginRight: '8px',
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: '48px',
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
    },
    align:{
        align:'center'
    },


});




class TodayTab extends Component {

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
              data,
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
    }


    componentWillReceiveProps(newProps) {

        if (newProps.errors) {
            this.setState({ errors: newProps.errors });

        }
        this.setState({nCalls: newProps.calls.calls});
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


    handleChange=(e)=> {
        this.setState({ [e.target.age]: e.target.value });
        // setAge(event.target.value);
    };

    render() {


        const {classes}=this.props;
        const { calls} = this.props.calls;
        const {nCalls}=this.state;

        const { nEmployees  } = this.state;
        let num=0;
        let high=0;
        let medium=0;
        let low=0;
        let emp_number=0;
        function createListCalls(callsList){
            callsList.map((call) => {
                    num=num+1;
                }
            );
            return (<Typography component="h1" variant="h7" style={{ color:'#37474f',}} className={ classes.align } >
                {num}
            </Typography>);
        }
        function highCall(callsList){
             callsList.map((call) => {
                if(call.call_priority==="גבוהה") {
                    high = high + 1;
                }
                }
            );
            return (<Typography component="h1" variant="h7" style={{ color:'#37474f',}} className={ classes.align } >
                {high}
            </Typography>);
        }
        function mediumCall(callsList){
            callsList.map((call) => {
                    if(call.call_priority==="בינונית") {
                        medium = medium + 1;
                    }
                }
            );
            return (<Typography component="h1" variant="h7" style={{ color:'#37474f',}} className={ classes.align } >
                {medium}
            </Typography>);
        }
        function lowCall(callsList){
            callsList.map((call) => {
                    if(call.call_priority==="נמוכה") {
                        low = low + 1;
                    }
                }
            );
            return (<Typography component="h1" variant="h7" style={{ color:'#37474f',}} className={ classes.align } >
                {low}
            </Typography>);
        }
        let callContent;
        let highpriority;
        let mediumpriority;
        let lowpriority;
        if (calls === null ) {

            console.log("calls are null");

        } else {
            //alertCalls();
            callContent = createListCalls(nCalls);
            highpriority=highCall(nCalls);
            mediumpriority=mediumCall(nCalls);
            lowpriority=lowCall(nCalls);

        }
        function createListEmp(empList){

              empList.map((emp) => {
                      emp_number=emp_number+1;
                  }
              );
            return (<Typography component="h1" variant="h7" style={{ color:'#37474f',}} className={ classes.align } >
                {emp_number}
            </Typography>);
        }


        let empContent;
        if (nEmployees=== null ) {
            console.log("no emp found");
        } else {
            //alertCalls();
            empContent = createListEmp(nEmployees);
        }

        return (
            <div >

                <Card height={1020} width={500}>

                    <AppBar position="relative" >
                        <Toolbar>
                            <Typography variant="h6" style={{ color:'#e1f5fe',}} noWrap >
                              ניתוח היום
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div className={ classes.heroContent }
                         style={{  backgroundImage: 'url(https://www.johnsplumbinghvac.com/uploads/1537190015slider.jpg)',
                             flex: '1',
                         }}
                    >

                        <Grid maxWidth="sm">
                            <Typography component="h1" variant="h4" className={ classes.align } style={{ color:'#e1f5fe',}} gutterBottom>
                                ניתוח יומי
                            </Typography>
                            <Typography variant="h6" className={ classes.align } style={{ color:'#e1f5fe',}} paragraph>

                            </Typography>
                        </Grid>
                    </div>




                        <Card  style={{display:'flex',flexDirection:'row'}}>
                            <CardContent >
                                <Typography fontWeight="fontWeightBold" variant="h5"  >

                                קריאות פתוחות במערכת
                                </Typography>
                                <Card  style={{background:"#b3e5fc",height:'180px',width:'180px', borderRadius:'90px',}}>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                  { callContent }
                                </Card>
                            </CardContent>
                            <CardContent >
                                <Typography fontWeight="fontWeightBold" variant="h5"  >
                                    קריאות בעדיפות גבוהה
                                </Typography>
                                <Card  style={{background:"#e57373",height:'180px',width:'180px', borderRadius:'90px',}}>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    { highpriority }
                                </Card>
                            </CardContent>


                            <CardContent >
                                <Typography fontWeight="fontWeightBold" variant="h5"  >
                                    קריאות בעדיפות בינונית
                                </Typography>
                                <Card  style={{background:"#ffcc80",height:'180px',width:'180px', borderRadius:'90px',}}>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    { mediumpriority }
                                </Card>
                            </CardContent>
                            <CardContent>
                                <Typography fontWeight="fontWeightBold" variant="h5"  >
                                    קריאות בעדיפות נמוכה
                                </Typography>
                                <Card  style={{background:"#fff59d",height:'180px',width:'180px', borderRadius:'90px',}}>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    { lowpriority }
                                </Card>
                            </CardContent>

                            <CardContent >
                                <Typography fontWeight="fontWeightBold" variant="h5"  >

                                    כמות עובדים בחברה
                                </Typography>
                                <Card  style={{background:"#f3e5f5",height:'180px',width:'180px', borderRadius:'90px',}}>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    { empContent }
                                </Card>
                            </CardContent>
                        </Card>



                <Chart >
                    <Typography variant="h5">
                    חלוקה עפ"י עדיפות קריאה
                    </Typography>
                    <PieChart style={{height:'300px',width:'300px',margin:'10px'} }
                        data={[
                            { title: 'עדיפות גבוהה', value: high, color: '#e3222e' },
                            { title: 'עדיפות בינונית', value: medium, color: '#e78843' },
                            { title: 'עדיפות נמוכה', value: low, color: '#f9f672' },
                        ]}
                    />

                </Chart>


                </Card>

            </div>




        );

    }

}




TodayTab.propTypes = {
    addNewCall: PropTypes.func.isRequired,
    getCalls: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getActivity: PropTypes.func.isRequired,
    getEmployees:PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    calls: state.calls,
    employee: state.employee,
});




export default connect(mapStateToProps, { addNewCall,getCalls,getActivity,getEmployees })(withStyles(styles)(withRouter(TodayTab)));
