import React, {Component} from 'react';
import {connect} from "react-redux";
import Typography from 'material-ui/Typography';
import {submitOp} from "../API/index";

class op_button_set extends Component {

state = {
    result : 0
};
    submitOperation = (op_typ, state = {}) => {

        console.log("api call: -- " + op_typ +" "+ JSON.stringify(state));

        submitOp(op_typ, state.input1, state.input2)
            .then((res) => {

                let tempr = 0;
                if (res !== "error") {
                    tempr = res.result;
                } else {
                    tempr = "Invalid Operation: Divide by zero.";
                }

                this.setState ( {
                    ...state,
                    result : tempr
                });
                console.log("state at the end in set state" + JSON.stringify(state));
            });
    };

    render() {
        return (

                <div className="row-fluid">
                    <div className="form-group">
                        <div className="row-fluid">
                            <button className="btn btn-lg btn-default col-md-6 " onClick={() => this.submitOperation("add", this.props.state)}>Add(+)</button>
                            <button className="btn btn-lg btn-default col-md-6 " onClick={() => this.submitOperation("sub", this.props.state)}>Subtract(-)</button>
                        </div>
                        <div className="row-fluid">
                            <button className="btn btn-lg btn-default col-md-6 " onClick={() => this.submitOperation("mul", this.props.state)}>Multiply(*)</button>
                            <button className="btn btn-lg btn-default col-md-6 " onClick={() => this.submitOperation("div", this.props.state)}>Divide(/)</button>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="text text-info">
                            <Typography type="display1">Result: {this.state.result}</Typography>
                        </div>
                    </div>
                </div>
        );
    }
}
function mapStateToProps(state) {
    return {state}
}

function mapDispatchToProps(dispatch) {
    return {
        submitOp : (op) => {
            console.log("operation = "+op)

            dispatch(submitOp(op));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(op_button_set);
