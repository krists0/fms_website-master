import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";




class showEmployees extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        const { employees  } = this.props.employee;

        return (

                <div className="post-form mb-3" style={{display: 'flex', justifyContent: 'center' }}>



                    <Paper  style={{ width: '100%',

                        overflowX: 'auto',
                    }} >
                        <AppBar position="relative">
                            <Toolbar>
                                <Typography variant="h6" color="inherit" noWrap   >
                                  <p align="center">   רשימת עובדים
                                  </p>
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <Table style={{  minWidth:'1020' }} >
                            <TableHead>
                                <TableRow>
                                    <TableCell  align="left">שם העובד</TableCell>
                                    <TableCell align="left">שם משפחה</TableCell>
                                    <TableCell align="left">אימייל</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map(employees=>(
                                    <TableRow key={employees._id}>

                                        <TableCell align="left">{employees.emp_name}</TableCell>
                                        <TableCell align="left">{employees.emp_last_name}</TableCell>
                                        <TableCell align="left">{employees.emp_email} </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>


        );
    }



}


showEmployees.propTypes = {

    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    employee: state.employee,
});


export default connect(mapStateToProps)(withRouter(showEmployees));

