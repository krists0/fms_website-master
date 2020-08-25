
import React, { Component } from 'react';
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";



class EmpAttach extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calls:null,
            activity:null,
            emp_details:"",
        };

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            activity: nextProps.activity.activity
        })
    };

    componentDidMount() {
      this.setState({activity:this.props.activity.activity})

    };

    componentWillMount(){
        this.getEmpName();
    }


    getEmpName=()=>{

        if(this.props.activity.activity){

            this.props.activity.activity.forEach((activity) =>
            {
                if(activity.call._id === this.props.calls._id){
                 let emp_details=activity.employee.emp_name + " " + activity.employee.emp_last_name + " ";
                   this.setState({emp_details:emp_details});
                }
                else
                    return "אין עובדים"
            })}
        else
            return "אין עובדים"
    };




    render() {
        const { emp_details} = this.state;


        return (

            <div >
                    {emp_details}
            </div>
        );

    }
}

EmpAttach.propTypes = {

    getActivity:PropTypes.func.isRequired,
};



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    activity: state.activity,

});


export default connect(mapStateToProps)(withRouter(EmpAttach));