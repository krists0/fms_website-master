import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import { withStyles} from '@material-ui/core/styles';
import CallsFeed from './CallsFeed';
import { withRouter } from 'react-router-dom';
import {addNewCall,getCalls} from '../actions/callActions';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import classNames from "classnames";
import Snackbar from "@material-ui/core/Snackbar";
import green from "@material-ui/core/es/colors/green";
import CloseSnackIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getActivity} from "../actions/activityActions";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import Toolbar from "@material-ui/core/Toolbar";

import AppBar from "@material-ui/core/AppBar";

/**
 * tracking calls tab , call for callsfeed to feed the cells with the all the calls that in the system
*/
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


});


class AddCall extends Component {

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

        const { errors } = this.state;
        const {classes}=this.props;
        const { calls} = this.props.calls;
        const {nCalls}=this.state;
        let handleSuccessSnack=this.handleSuccessSnack;
        let handleCloseSnack=this.handleCloseSnack;
        function createListCalls(callsList){

            let CallList= callsList.map((call) =>
                <li style={{listStyle: 'none'}} key={call._id}>
                    <CallsFeed calls={call}
                               handleSuccessSnack={handleSuccessSnack}
                               handleCloseSnack={handleCloseSnack} />

                </li>
            );

            return (CallList);
        }
        let callContent;

        if (calls === null ) {

          console.log("calls are null");

        } else {
            //alertCalls();
            callContent = createListCalls(nCalls);

        }




        return (
        <div >
        <Card >

            <AppBar position="relative" >
                <Toolbar>
                    <Typography variant="h6" style={{ color:'#e1f5fe',}} noWrap >
                        מעקב קריאות
                    </Typography>
                </Toolbar>
            </AppBar>

                <div className={ classes.heroContent }
                style={{  backgroundImage: 'url(https://www.johnsplumbinghvac.com/uploads/1537190015slider.jpg)',
                    flex: '1',
                }}
                >

                    <Grid maxWidth="sm">
                        <Typography component="h1" variant="h4" align="center" style={{ color:'#e1f5fe',}} gutterBottom>
                            הוספת קריאות חדשות למערכת
                        </Typography>
                        <Typography variant="h6" align="center" style={{ color:'#e1f5fe',}} paragraph>
                            הוסף קריאה חדשה למערכת , כלול עדיפות , תיאור התקלה ומספר הדירה
                        </Typography>
                    </Grid>


                    <Paper className={classes.paper} style={{marginTop:'50px'}}>
                        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                            <Toolbar>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <SearchIcon className={classes.block} color="inherit" />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField

                                            fullWidth
                                            placeholder="חפש קריאה על ידי הזנת מספר דירה"
                                            InputProps={{
                                                disableUnderline: true,
                                                className: classes.searchInput,
                                            }}
                                            onChange={this.filterCalls}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" className={classes.searchCall}>
                                            חפש
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Paper>

                </div>
            <Paper>
                <form onSubmit={this.onSubmit} style={{display: 'flex', justifyContent: 'center'}}>

                    <TextField

                        style={{ marginRight:'15px',}}
                        placeholder="מספר דירה"
                        name="call_name"
                        value={this.state.call_name}
                        onChange={this.onChange}
                        error={errors.call_name}
                        margin="dense"
                        variant="outlined"
                    />


                    <TextField
                        style={{ marginRight:'15px',}}
                        placeholder="תיאור התקלה "
                        name="call_description"
                        value={this.state.call_description}
                        onChange={this.onChange}
                        error={errors.call_description}
                        margin="dense"
                        variant="outlined"
                    />
                    <FormControl
                        style={{
                            borderRadius: 10,
                            // position: 'relative',
                            border: '1px solid #ced4da',
                            fontSize: 16,
                            width: '100px',
                            //  padding: '0px 25px 0px 20px',
                            marginTop: 7,
                            height: '50px',
                            marginRight:'15px',
                        }}
                    >
                        <InputLabel >עדיפות</InputLabel>
                        <Select
                            value={this.state.call_priority}
                            onChange={this.onChange}
                            name="call_priority"
                            error={errors.call_priority}
                        >
                            <MenuItem   value={"גבוהה"}>גבוהה</MenuItem>
                            <MenuItem   value={"בינונית"}>בינונית</MenuItem>
                            <MenuItem   value={"נמוכה"}>נמוכה</MenuItem>
                        </Select>
                    </FormControl>



                    <Grid item>
                        <Button type ="submit"  aria-label="Add"  size="small"
                                variant="contained" color="primary" className={classes.searchCall}
                                style={{
                                    height: '40px',
                                    marginRight:'15px',
                                    marginTop: 13,
                                }}
                        >
                            אישור
                        </Button>
                    </Grid>


                    <Dialog
                        open={this.state.dOpen}
                        onClose={this.handleDClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"בקשתך להוספת קריאה למערכת התקבלה"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                נוספה קריאה חדשה למערכת.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDClose} color="primary">
                                אישור
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </Paper>



            <div style={{textAlign:'center'} }>
                { callContent }
            </div>


        </Card>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.openSnack}
                autoHideDuration={6000}
                onClose={this.handleCloseSnack}
            >
                <SnackbarContent
                    className={classNames(classes['success'], classes.margin)}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar"  className={classes.message}>
          <CheckCircleIcon className={classNames(classes.iconSnack, classes.iconVariant)} />
                                הקריאה הוצמדה בהצלחה!
        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleCloseSnack}
                        >
                            <CloseSnackIcon className={classes.iconSnack} />
                        </IconButton>,
                    ]}

                />
            </Snackbar>



        </div>




    );

    }

}




AddCall.propTypes = {
    addNewCall: PropTypes.func.isRequired,
    getCalls: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getActivity: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    calls: state.calls,
});




export default connect(mapStateToProps, { addNewCall,getCalls,getActivity })(withStyles(styles)(withRouter(AddCall)));

/**
 <Fab type ="submit" color="primary" aria-label="Add"  size="small" > <AddIcon

 />
 </Fab>
 **/