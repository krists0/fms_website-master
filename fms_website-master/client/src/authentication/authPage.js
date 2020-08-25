import React,{Component} from 'react';
//import showLoginReg from './show_login_reg.js';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CartIcon from './image/logo.png';



class authPage extends Component{



    render() {
        return (


            <div className="root-container" style={{
                marginTop: 'auto',
                width: "100%",
                height: "100%",
                backgroundImage: "url(" + "https://i0.wp.com/www.jsecjmsb.ca/wp-content/uploads/2015/10/wallpaper-high-rise-buildings-1-1600x1200-a-ibackgroundz.com_.jpg?w=1600" + ")",
            }} >

                <Grid container justify="center" alignItems="center">
                    <Avatar alt="Remy Sharp"
                            img src={CartIcon}
                            style={{

                                width: 90,
                                height: 90,
                            }}
                    />

                </Grid>
                <header >

                    <h1 style={{color:'#0277bd'}}>F.M.S</h1>

                </header>

                <Button  variant="outlined"  color="primary" component={Link} to={"/showLoginReg"}>Log in</Button>

            </div>


        );
    }


}

export default authPage;


