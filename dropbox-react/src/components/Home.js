import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import * as API from '../api/API';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            results: [{}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
    }

    componentWillMount(){
        //let payload = {'path' : this.state.path};
        let payload = {"path" : this.props.path};
        API.doListFiles(payload)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then( data => {
                            this.setState({...this.state,
                                results: data
                            });
                        }
                    )
                } else if (res.status === 400) {
                    this.setState({...this.state,
                        results: []
                    });
                }
            })
            .catch ((err) =>{
                console.log(err);
            });
    }

    handleSubmitLogout(event) {

        console.log(this.state);

        this.props.handleSubmitLogout();
    }

    handleMakeDirectory() {
        let dir = prompt("Directory name: ");
        console.log("dir name: " + dir);
        let payload = {"dir" : dir, "path" : this.props.path};
        this.props.handleCreateDirectory(payload);
    }

    setPath(path, type, name) {
        this.props.handleSetPath(path,type,name);
    }

    handleChange(event) {
        let uploadPath = {"path": this.props.path};
        let form = new FormData();
        let fileArr = Array.from(event.target.files);
        console.log("file array: "+ fileArr);
        API.doSetUploadPath(uploadPath)
            .then( res => {
                if(res.status === 200){
                    fileArr.map((file,index) => {
                            form.append('file-upload'+index , file);
                        }
                    )
                    this.props.handleSubmitUpload(form);
                }else{
                    console.log("path fail");
                }
            })
            .catch(err => {
                console.log(err);
            });

        // let form = new FormData();
        // let fileArr = Array.from(event.target.files);
        // console.log("file array: "+ fileArr);
        // fileArr.map((file,index) => {
        //         form.append('file-upload'+index , file);
        //     }
        // );
        // console.log("path to upload file: "+ this.state.path);
        // form.append("path", this.props.path);
        // this.props.handleSubmitUpload(form);
    }


    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className="panel panel-white">
                            <div className="panel-heading">
                                <h4 className="panel-title">DropBox</h4>
                            </div>
                            <div className="panel panel-body">
                                <div className="col-md-6">

                                    <div id="pane1" className="tab-pane">
                                        <div className ="row">
                                            <div className="col-md-4">

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
                                    <div className="col-md-4">
                                        <ul id="dTab" className="nav nav-tabs">
                                            <li><button className="btn btn-primary" onClick={() => this.handleSubmitLogout()}>Logout</button></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4">
                                        <ul id="dTab" className="nav nav-tabs">
                                            <li><button className="btn btn-success" onClick={() => this.handleMakeDirectory()}>Make a Directory</button></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row-fluid">
                                    <div className="col-sm-3 col-md-6 col-lg-6 col-md-offset-2">
                                        <div className="panel panel-default">
                                            {/*<table>*/}
                                            {/*<tr>*/}
                                            {/*<thead>File/Folder </thead>*/}
                                            {/*<thead>Type</thead>*/}
                                            {/*<thead>Actions</thead>*/}
                                            {/*</tr>*/}

                                            {/*<tr></tr>*/}
                                            {/*</table>*/}
                                            <table className="table table-striped table-hover" id="sample-table-2">
                                                <thead>
                                                <tr>

                                                    <th className="hidden-xs">File</th>
                                                    <th className="hidden-xs">Created Date</th>
                                                    <th className="hidden-xs">id</th>

                                                </tr>
                                                </thead>

                                                <tbody>

                                                {

                                                    this.state.results.map( (file, index) =>{
                                                        if(file !== undefined && file !== null) return(
                                                            <tr key={index}>
                                                                <td><a onClick={() => this.setPath(file.path,file.type,file.name)}> {file.name}</a></td>
                                                                <td> {file.createDt}</td>
                                                                <td> {file.id}</td>
                                                            </tr>
                                                        )}
                                                    )}


                                                </tbody>
                                            </table>
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

export default Home;