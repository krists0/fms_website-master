import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {connect} from "react-redux";

import {withRouter} from "react-router-dom";

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "Awesomeness",
            message: "Awesome Notifications!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            <div className="app-content">
                <ReactNotification ref={this.notificationDOMRef} />
                <button onClick={this.addNotification} className="btn btn-primary">
                    Add Awesome Notification
                </button>
            </div>
        );
    }
}

export default connect(withRouter(Notification));
