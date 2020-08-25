import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {addNewCall,getCalls} from '../actions/callActions';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
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




class TitleOpenCallsTab extends Component {
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

                    <AppBar position="relative">
                        <Toolbar>

                            <Typography variant="h6" color="inherit" noWrap>
                                קריאות פתוחות
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div  style={{  backgroundImage: 'url(https://www.johnsplumbinghvac.com/uploads/1537190015slider.jpg)',
                        flex: '1',padding: '20px',
                    }} >
                        <Grid maxWidth="sm">
                            <Typography component="h1" variant="h5" align="center" style={{ color:'#e1f5fe',}} gutterBottom>
                                קריאות קיימות במערכת
                            </Typography>
                            <Typography variant="h6" align="center" style={{ color:'#e1f5fe',}} paragraph>
                                הרשימה המוצגת הינה של כלל הקריאות הפתוחות במערכת נכון ל  {date+"."+month+"."+year}
                            </Typography>
                        </Grid>
                    </div>

                    <Divider  />


                </Paper>

            </div>


        );

    }

}




TitleOpenCallsTab.propTypes = {
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




export default connect(mapStateToProps, { addNewCall,getCalls })( withStyles(styles)(withRouter(TitleOpenCallsTab)));



