import React, {Component} from 'react';

import {connect} from "react-redux"
import Typography from 'material-ui/Typography';
class input_set extends Component {

    render() {

        return (
            <div className="row-fluid">
                <div className="form-group">
                    <label className="lbl col-md-6 ">Number 1: </label>
                    <div className="col-md-6">
                        <input type="number" className="form-control" name="num1" id="num1" onChange={(event) => this.props.pushIn1(event)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-6 ">Number 2:  </label>
                    <div className="col-md-6">
                        <input type="number" className="form-control" name="num2" id="num2" onChange={(event) => this.props.pushIn2(event)}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default input_set;
