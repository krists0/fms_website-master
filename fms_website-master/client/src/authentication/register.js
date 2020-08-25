import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import TextFieldGroup from '../components/common/TextFieldGroup';





class register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            last_name:'',
            email:'',
            password:'',
            errors: {}
        };
        this.handleInputChange=this.handleInputChange.bind(this);
    }



    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/userMainp');
        }
    }

    componentWillReceiveProps(nextProps,nextState) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }





    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    submitRegister=(event)=> {
        event.preventDefault();


        const newUser = {
            name:this.state.name,
            last_name:this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        };

        console.log(newUser);


        this.props.registerUser(newUser, this.props.history);

    };

    render() {

        const {errors}=this.state;


        return (
            <div className="inner-container">
                <div className="header">
                    Register
                </div>
                <div className="box">

                    {/*<div className="input-group">*/}
                    {/*    <label htmlFor="username">Username</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        name="username"*/}
                    {/*        className="login-input"*/}
                    {/*        placeholder="Username"/>*/}
                    {/*</div>*/}
                    <TextFieldGroup
                        placeholder="Name"
                        label="Name"
                        name="name"
                        type="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        error={errors.name}
                        //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup
                        placeholder="Last Name"
                        label="Last Name"
                        name="last_name"
                        type="last name"
                        value={this.state.last_name}
                        onChange={this.handleInputChange}
                        error={errors.last_name}
                        //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup
                        placeholder="Email"
                        label="Email"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        error={errors.email}
                        //info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    {/*<div className="input-group">*/}
                    {/*    <label htmlFor="email">Email</label>*/}
                    {/*    <input type="email"*/}
                    {/*           name="email"*/}
                    {/*           value={this.state.email}*/}
                    {/*           onChange={this.handleInputChange}*/}
                    {/*           className="login-input"*/}
                    {/*           placeholder="Email"/>*/}
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
                    {/*        className="login-input"*/}
                    {/*        placeholder="Password"/>*/}
                    {/*</div>*/}
                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .submitRegister
                            .bind(this)}>Register</button>
                </div>
            </div>
        );
    }

}


register.propTypes = {
        registerUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
    };

    const mapStateToProps = state => ({
        auth: state.auth,
        errors: state.errors
    });





export default connect(mapStateToProps, { registerUser })(withRouter(register));
