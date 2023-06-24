//환경설정 정보 읽어오기
const fs = require('fs');

const express =require('express');
const bodyParser = require('body-parser');
const app =express();
const port = process.env.port || 5000;

app.use(bodyParser.json());//기본적으로 REST API 에서는 데이터 주고받을때 json 데이터 형식으로 주고받음
app.use(bodyParser.urlencoded({extended:true}));



 
//디비연동 코드
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});
connection.connect();

//이미지파일처리를 위해서 라이브러리 추가 해야함
const multer = require('multer');
const upload = multer({dest: './upload'})




//실제로 고객데이터삽입요청 처리해아한다. 
app.get('/api/customers', (req,res) => {
    //디비 접근하기
    connection.query(
      //쿼리 날리기
      "select * from CUSTOMER where isDeleted =0",
      (err, rows, fields)=>{
        res.send(rows);
      }
       
    );
});


//이미지 파일 처리하는 부분
app.use('/image', express.static('./upload'));//'./image' 말고 '/image'하니까 이미지 잘 출력된다......
app.post('/api/customers', upload.single('image'), (req, res) =>{ // var대신 let을 사용한다. 
  let sql ='insert into CUSTOMER values (null,?,?,?,?,?,now(),0)';
  //let image ='/image/' + req.file.filename; //이렇게 하니까 사진은 디비에 올라가긴 하는데 깨져서 올라감...
  let image ='http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;


  //디버깅
  // console.log(name);
  // console.log(image);
  // console.log(birthday);
  // console.log(gender);
  // console.log(job);


  let params=[image, name, birthday, gender, job];
  connection.query(sql, params, 
    (err, rows, field) => {
        res.send(rows);
        //디버깅용
        console.log(image);
    }
  );
});


//고객데이터 삭제 모듈 추가하기
app.delete('/api/customers/:id', (req,res)=>{
  let sql ='UPDATE CUSTOMER SET isDeleted =1 WHERE id =?';//삭제 완료 알려주는것
  let params =[req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
        res.send(rows);
    } 
  )
});

app.listen(port, ()=> console.log(`listening on port ${port}`));
