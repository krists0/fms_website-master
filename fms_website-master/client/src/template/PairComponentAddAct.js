import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {addNewActivity} from "../actions/activityActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import EmpAttach from "./EmpAttach";
import Checkbox from "@material-ui/core/Checkbox";
import green from '@material-ui/core/colors/green';



const styles = theme => ({

    checkBox:{
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },

    checked: {},

    main:{
        display: 'flex',
        flexDirection:'row',
    },


});






class PairComponentAddAct extends React.Component{


    constructor(props) {
        super(props);

        this.state={
            emp:null,
            call:null,
            checked:false,

        };
    }



 componentDidMount() {
    this.setState({call:this.props.call,emp:this.props.emp})
 };

componentWillReceiveProps(nextProps, nextContext) {
    this.setState({emp:nextProps.emp,checked:false});

};

    handleCheck=()=>{
      this.setState({checked:!this.state.checked});
      this.handleAddAct();
    };

    handleAddAct=()=>{

           let act={
                call:this.state.call,
                employee:this.state.emp,
            };

            this.props.addPActs(act);
    };


    render(){


        const {call,classes}=this.props;
        return(

            <div className={classes.main}>
                <Checkbox
                    checked={this.state.checked}
                    onChange={this.handleCheck}
                    value="checked"
                    classes={{
                        root: classes.checkBox,
                        checked: classes.checked,
                    }}

                />
                <ExpansionPanel style={{textAlign:'right'}}>

                    <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon/> }>
                        <span  >  {call.call_name} </span>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{textAlign:'right'}}>
                        <Typography variant="h7" gutterBottom  >
                            <p >
                                <span> תיאור הקריאה :{call.call_description} </span>
                            </p>
                            <p>
                                <span>  עדיפות לטיפול קריאה :{call.call_priority}  </span>

                            </p>
                            <p>
                                <span> שם העובד המטפל :{ <EmpAttach calls={call}>f</EmpAttach> } </span>
                            </p>
                        </Typography>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>




                    );





    }




}



PairComponentAddAct.propTypes={
    addNewActivity:PropTypes.func.isRequired,
    emp:PropTypes.object,
    call:PropTypes.object.isRequired,
    addPActs:PropTypes.func,
    act:PropTypes.object,
};


const mapStateToProps = state => ({
    //errors: state.errors,
    //auth: state.auth,
    calls:state.calls,

});



export default connect(mapStateToProps, { addNewActivity},null,{forwardRef:true})(withStyles(styles)(withRouter(PairComponentAddAct)));