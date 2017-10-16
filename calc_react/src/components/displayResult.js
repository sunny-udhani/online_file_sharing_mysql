import React, {Component} from 'react';

import {connect} from "react-redux"
import Typography from 'material-ui/Typography';

class displayResult extends Component {

    componentWillReceiveProps(props) {
        console.log("props:  ===="+JSON.stringify(props));
    }
    render() {
console.log("inside new block: "+this.props.result1);
        return (

                <div className="row row-fluid">
                    <div className="col-md-offset-2">
                        <Typography type="display1">Result: {this.props.result1}</Typography>
                    </div>
                </div>
        );
    }
}
 export default displayResult