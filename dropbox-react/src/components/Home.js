import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import * as API from '../api/API';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
    }

    componentWillMount(){
        API.doListFiles()
            .then((res) => {
                if (res.status === 200) {
                    this.setState({...this.state,
                        results: res.results
                    });
                } else if (res.status === 400) {
                    this.setState({...this.state,
                        results: []
                    });
                }
            })
            .catch ((err) =>{
                console.log(err);
            })
        console.log('state of files' + this.state.results);
    }

    handleSubmitLogout(event) {

        console.log(this.state);

        this.props.handleSubmitLogout();
    }

    handleChange(event) {

        var form = new FormData();
        var fileArr = Array.from(event.target.files);
        console.log("file array: "+ fileArr);
        fileArr.map((file,index) => {
                form.append('file-upload'+index , file);
            }
        );
        console.log(form);
        this.props.handleSubmitUpload(form);
    }
    render(){
        return(
            <div className="container-fluid">
                <div className ="row">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <div className="panel panel-default">
                            <div className="panel panel-body">
                                <ul id="dTab" className="nav nav-tabs">
                                    <li><button className="btn btn-primary" onClick={() => this.handleSubmitLogout()}><span className="glyphicon glyphicon-circle-arrow-right"></span>Logout</button></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-offset-2 col-sm-3 col-md-3 col-lg-8">
                        <div className="panel panel-default">
                            <div className="panel panel-body">
                                <div id="pane1" className="tab-pane">
                                    <input type="file"
                                           className="file file-upload"
                                           id="file-upload"
                                           name="file-upload"
                                           onChange={ (e) => this.handleChange(e)}
                                           multiple
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-fluid">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <div className="panel panel-default">
                            {/*<table>*/}
                                {/*<tr>*/}
                                {/*<thead>File/Folder </thead>*/}
                                {/*<thead>Type</thead>*/}
                                {/*<thead>Actions</thead>*/}
                                {/*</tr>*/}

                                {/*<tr></tr>*/}
                            {/*</table>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;