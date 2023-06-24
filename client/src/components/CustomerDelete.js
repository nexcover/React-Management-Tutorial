import React from 'react';
//dialog 취소 모달 팝업창
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';





class CustomerDelete extends React.Component{
    //취소 모달창
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
    }


    //dialog 모달창
    handelClickOpen = () => {
        this.setState({
            open : true
        });
    }

    handleClose = () => {
        this.setState({
            open:false
        })
    }


    //삭제 기능 api 함수 만들어주기
    deleteCustomer(id){
        // 예시 : /api/customers/7
        const url = `/api/customers/${id}`;
        fetch(url,{
            method: 'DELETE'
        });
        //삭제가 이루어지고 새롭게 바뀐 고객화면을 다시 화면에 출력하게 하기 
        this.props.stateRefresh();
    }

    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handelClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>   
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="contained" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }

}

export default CustomerDelete;
