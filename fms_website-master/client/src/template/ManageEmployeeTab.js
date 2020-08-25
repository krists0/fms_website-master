import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {deleteEmployee, getEmployees, updateEmployee} from "../actions/employeeActions";
import Paper from "@material-ui/core/Paper";
import EditEmp from "./EditEmp";

const styles = theme => ({
    icon: {
        marginRight: '10px',
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
    },
    heroButtons: {
        marginTop: '30px',
    },
    cardGrid: {
        paddingTop: '64px',
        paddingBottom:  '64px',
    },
    card: {
        height: '98%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: '48px',
    },
});




class ManageEmployeeTab extends Component {

    constructor(props) {

        super(props);
        this.state = {

            nEmployees:this.props.employee.employees,
            open: false,

        };
        this.filterEmployees=this.filterEmployees.bind(this);

    }


    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(newProps) {

        if (newProps.errors) {
            this.setState({ errors: newProps.errors });

        }
        this.setState({nEmployees: newProps.employee.employees});

    }




    filterEmployees(e)
    {
        //  console.log(this.state.nEmployees[0].emp_name);
        let updatedList = this.state.nEmployees;

        updatedList = updatedList.filter((item =>{
            return item.emp_name.search(
                e.target.value) !== -1;
        }) );

        this.setState({
            nEmployees: updatedList,
        });

        if(e.target.value==="") {
            this.setState({
                nEmployees: this.props.employee.employees,
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



    render() {
        const {classes} = this.props;
       // const classes = useStyles();

        const { nEmployees  } = this.state;
        let empList;


        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>

                        <Typography variant="h6" color="inherit" noWrap>
                            רשימת עובדים
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={ classes.heroContent } style={{  backgroundImage: 'url(http://hdwpro.com/wp-content/uploads/2016/07/3D-Gray-Wallpaper.jpg)',
                        flex: '1',
                    }}>
                        <Grid maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                               רשימת עובדים
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                רשימת עובדים עדכנית.
                                ניתן לערוך/לשנות/למחוק עובדים מהמערכת .
                            </Typography>
                                        <Paper >
                                            <AppBar  position="static" color="default" elevation={0}>
                                                <Toolbar>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid item>
                                                            <SearchIcon className={classes.block} color="inherit" />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField
                                                                placeholder="חפש עובד ברשימת העובדים"
                                                                InputProps={{
                                                                    disableUnderline: true,
                                                                    className: classes.searchInput,
                                                                }}
                                                                onChange={this.filterEmployees}
                                                            />
                                                            { empList }
                                                        </Grid>
                                                    </Grid>
                                                </Toolbar>
                                            </AppBar>
                                        </Paper>

                        </Grid>
                    </div>

                    <Grid className={ classes.cardGrid } maxWidth="md">
                        <Grid container spacing={ 4 }>
                            {empList=nEmployees.map(employees => (
                                <Grid item key={employees._id}  xs={ 10 } sm={ 5 } md={ 3 }>
                                    <Card className={ classes.card }>
                                        <CardMedia
                                            className={ classes.cardMedia }
                                            image="/Images/person1.png"
                                            title="Image title"
                                        />
                                        <CardContent className={ classes.cardContent }>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {employees.emp_name +"  "+employees.emp_last_name}
                                            </Typography>
                                            <Typography>
                                                    <Typography component="p">
                                                        <EditEmp

                                                            emp_id={employees._id}
                                                            emp_name={employees.emp_name}
                                                            emp_last_name={employees.emp_last_name}
                                                            emp_email={employees.emp_email}/>
                                                    </Typography>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )) }
                        </Grid>
                    </Grid>
                </main>


            </React.Fragment>
        );

    }
}



ManageEmployeeTab.propTypes = {
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getEmployees:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    employee: state.employee,
});


export default connect(mapStateToProps,{deleteEmployee,updateEmployee,getEmployees})(withStyles(styles)(withRouter(ManageEmployeeTab)));

