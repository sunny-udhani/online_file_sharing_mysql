import React, {Component} from 'react';
import FaShareAlt from 'react-icons/lib/fa/share-alt'
import FaStar from 'react-icons/lib/fa/star-o'
import Dropzone from 'react-dropzone';
import * as API from '../api/API';
import {Modal,Button} from "react-bootstrap"

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fileResults: [],
            shareResults: [],
            modalIsOpen: false,
            sharedTable : false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
    }

    componentWillMount(){
        //let payload = {'path' : this.state.path};
        console.log("filespath : " + this.props.filesPath);
        let payload = {"filesPath" : this.props.filesPath , "sharePath" : this.props.sharePath};
        console.log(payload);
        API.doListFiles(payload)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then( data => {
                            console.log("data received");
                            console.log(data);
                            var st = (data.sharedFileList[0].name === undefined || data.sharedFileList[0].name === null) ? false : true;
                            this.setState({...this.state,
                                fileResults: data.userFileList,
                                shareResults: data.sharedFileList,
                                sharedTable : st
                            });
                        }
                    )
                } else if (res.status === 400) {
                    this.setState({...this.state,
                        fileResults: [],
                        shareResults: []
                    });
                }
            })
            .catch ((err) =>{
                console.log(err);
            });
    }

    handleSubmitLogout() {

        console.log(this.state);

        this.props.handleSubmitLogout();
    }

    handleMakeDirectory() {
        let dir = prompt("Directory name: ");
        console.log("dir name: " + dir);
        let payload = {"dir" : dir, "path" : this.props.path};
        this.props.handleCreateDirectory(payload);
    }

    setFilesPath(path, type, name) {
        this.props.handleSetFilesPath(path,type,name);
    }

    setSharePath(path, type, name) {
        this.props.handleSetSharePath(path,type,name);
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
    }

    openShareDialog(){
        this.setState({
            ...this.state,
            modalIsOpen: true
        })
    }

    promptShare(fileId){
        let emails = prompt("Enter Email ID's you want to share with");
        let payload = {"emails" : emails , "fileId" : fileId};
        this.props.handleShare(payload);
    }

    toggleModal(){
        this.setState({
            ...this.state,
            modalIsOpen: false
        })
    }

    redirectProfile(){
        this.props.redirectProfile();
    }

    render(){
        let shaTable = null;

        if(this.state.sharedTable){

            shaTable = <div className="row-fluid">
                <h4 className="text u-text-default">Files shared with user</h4>
                <table className="table table-striped table-hover" id="sample-table-2">
                    <thead>
                    <tr>
                        <th className="hidden-xs">File</th>
                        <th className="hidden-xs">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.shareResults.map( (file, index) =>{
                            if(file !== undefined && file !== null) return(
                                <tr key={index}>
                                    <td><a onClick={() => this.setSharePath(file.path,file.type,file.name)}> {file.name}</a></td>
                                    <button onClick={() => this.promptShare(file.id)} ><FaStar/></button>
                                </tr>
                            )}
                        )
                    }

                    </tbody>
                </table>
            </div>
        }else{

            shaTable = "";
        }
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br/>
                        <img src = "../../public/logo.png"></img> <h4 align={'justify'}>Home</h4>
                    </div>
                    <div className="col-md-2" align={'justify'}>
                        <div className='row'>
                            <ul id="dTab" className="nav">
                                <li><button className="btn btn-primary" onClick={() => this.handleSubmitLogout()}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row justify-content-between">
                    <div className="col-6 col-md-8" align={'left'}>
                        <div className="panel panel-default">

                            {
                                shaTable
                            }
                            <br/>
                            <br/>
                        </div>
                        <table className="table table-striped table-hover table-bordered table-responsive" id="sample-table-2">
                            <thead>
                            <tr>
                                <th className="span1">File</th>
                                <th className="">Created Date</th>
                                <th className="">Type</th>
                                <th className="">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.fileResults.map( (file, index) =>{
                                    if(file !== undefined && file !== null) return(
                                        <tr key={index}>
                                            <td><a onClick={() => this.setFilesPath(file.path,file.type,file.name)}> {file.name}</a></td>
                                            <td>{file.createDt}</td>
                                            <td>{(file.type===0) ? "file" : "folder"} </td>
                                            <td className="col-3"> <button onClick={() => this.promptShare(file.id)} ><FaShareAlt /></button>
                                                <button onClick={() => this.promptShare(file.id)} ><FaStar /></button>
                                            </td>
                                        </tr>
                                    )}
                                )
                            }

                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-2 offset-md-2">
                        <div className="row">
                            <input type="file"
                                   className="file file-upload"
                                   id="file-upload"
                                   name="file-upload"
                                   onChange={ (e) => this.handleChange(e)}
                                   multiple/>
                        </div>
                        <div className="row">
                            <ul id="dTab" className="nav nav-tabs">
                                <li><button className="btn btn-success" onClick={() => this.handleMakeDirectory()}>Make a Directory</button></li>
                                <li><button className="btn btn-info" onClick={() => this.redirectProfile()}>User Profile</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Home;