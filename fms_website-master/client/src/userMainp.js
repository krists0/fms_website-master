import React, {Component} from 'react';
//import {BrowserRouter} from "react-router-dom"
import PaperBase from './template/PaperBase'
import { connect } from 'react-redux';

class userMainp extends Component{


render(){

  return (

      <div>
        <PaperBase />

      </div>

      
  );

};


}


const mapStateToProps = state => ({
   // profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps)(userMainp);