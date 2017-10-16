import React, { Component } from 'react';
import ButtonSet from "./components/op_button_set";
import InputSet from "./components/input_set";
import DisplayResult from "./components/displayResult";
import './App.css';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux"
import {pushInput1, pushInput2} from "./actions/index";

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Calculator</h1>
                </header>
                <div className="row">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-offset-4 col-md-offset-5 col-lg-offset-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="row-fluid">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="row">
                                                <InputSet pushIn1 = {this.props.pushIn1} pushIn2 = {this.props.pushIn2}/>
                                            </div>
                                            <div className="row">
                                                <ButtonSet/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        state,
        result : state.result
    }
}


function mapDispatchToProps(dispatch) {
    return {
        pushIn1 : (event) => {
            dispatch(pushInput1(event.target.value));
        },
        pushIn2 : (event) => {
            dispatch(pushInput2(event.target.value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
