import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import TextFieldGroup from '../components/common/TextFieldGroup';
import { withRouter } from 'react-router-dom';




class login extends Component{


    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {}
        };
    }




    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/userMainp');
        }
    }

    componentWillReceiveProps(nextProps,nextState) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/userMainp');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }





    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitLogin=(event)=> {
        event.preventDefault();


        const userData = {
            email: this.state.email,
            password: this.state.password
        };


        this.props.loginUser(userData);



    };






    render() {

        const { errors } = this.state;


        return (
            <div className="inner-container" >
                <div className="header">
                    Login
                </div>
                <div className="box">


                    <TextFieldGroup
                        placeholder="Email"
                        label="Email"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        error={errors.email}
                    />

                    {/*<div className="input-group">*/}
                    {/*    <label htmlFor="username">Email</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        name="email"*/}
                    {/*        className="login-input"*/}
                    {/*        value={this.state.email}*/}
                    {/*        onChange={this.handleInputChange}*/}
                    {/*        required*/}
                    {/*        placeholder="Email"/>*/}
                    {/*</div>*/}


                    <TextFieldGroup
                        placeholder="Password"
                        label="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        error={errors.password}
                    />

                    {/*<div className="input-group">*/}
                    {/*    <label htmlFor="password">Password</label>*/}
                    {/*    <input*/}
                    {/*        type="password"*/}
                    {/*        name="password"*/}
                    {/*        value={this.state.password}*/}
                    {/*        onChange={this.handleInputChange}*/}
                    {/*        required*/}
                    {/*        className="login-input"*/}
                    {/*        placeholder="Password"/>*/}
                    {/*</div>*/}

                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .submitLogin
                            .bind(this)}>Login</button>
                </div>
            </div>
        );
    }

}



login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(login));