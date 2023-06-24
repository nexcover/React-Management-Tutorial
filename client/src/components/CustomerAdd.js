//고객추가 양식 만들기
//서버와의 통신 목적의 라이브러리 설치하기
import React from 'react';
import axios from 'axios';
//dialog 모달 팝업창
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        //모든 변수 초기화해주기
        this.state={
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        }
    }
    //함수 만들어야한다. 총 3가지
    handleFormSubmit = (e) =>{
        e.preventDefault()
        this.addCustomer()
            .then ((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        })
        //window.location.reload();//화면 전체를 새로고침 하는것
        
    }

    handleFileChange =(e) =>{//file[0]이게 아니라 files[0] 이거임@@@
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
        })
    }

    handleValueChange=(e)=>{
        let nextState ={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    
    addCustomer =() =>{
        const url ='/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config ={
            headers:{
                'content-type': 'multipart/form-data'
            }
        }

        return axios.post(url, formData, config);//환경설정 :  config ---> 이렇게 3개의 요소를 headers에 맞추어서 실제 서버로 데이터 보내도록 하는 기능
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    <br />
                    <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                    <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                    <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);
