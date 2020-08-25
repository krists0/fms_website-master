import React, {Component} from 'react';
import LoginBox from './login'
import RegisterBox from './register'
import './show_login_reg.scss'







class showLoginReg extends Component{



    constructor(props){
        super(props);

        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false
        };

    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }



  render()
    {
        return(

        <div className="root-container"
             style={{
                 marginTop: 'auto',
                 width: "100%",
                 height: "100%",
                 backgroundImage: "url(" + "https://i0.wp.com/www.jsecjmsb.ca/wp-content/uploads/2015/10/wallpaper-high-rise-buildings-1-1600x1200-a-ibackgroundz.com_.jpg?w=1600" + ")",
             }}
        >
        <div className="box-controller">
            <div
                className={"controller " + (this.state.isLoginOpen
                    ? "selected-controller"
                    : "")}
                onClick={this
                    .showLoginBox
                    .bind(this)}>
                Login
            </div>
            <div
                className={"controller " + (this.state.isRegisterOpen
                    ? "selected-controller"
                    : "")}
                onClick={this
                    .showRegisterBox
                    .bind(this)}>
                Register
            </div>
        </div>
            <div className="box-container">
                {this.state.isLoginOpen && <LoginBox/>}
                {this.state.isRegisterOpen && <RegisterBox/>}
            </div>

        </div>


    );
    }

}


export default showLoginReg;