const express = require('express')
const app = express()
const mongoose = require('mongoose')
// 解决跨域问题
app.use(require('cors')())
app.use(express.json())

// URI
const uri = "mongodb://localhost:27017/cardb"
// 1.2 连接指定数据库（URL只有数据库是变化的）
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
// 1.3 获取连接对象
const conn = mongoose.connection
// 1.4 绑定连接完成的监听
conn.on('connected', () => { // 连接成功回调
  console.log("数据库连接成功~")
})

const Car = mongoose.model('Car',new mongoose.Schema({
  time:{type:String},
  num:{type:String},
}))

app.get('/',async (req,res)=>{
  res.send('aaa')
})
app.get('/data',function(req,res){
  res.json({name:"小明",age:19})
})

app.listen(3000,()=>{
  console.log('http://localhost:3000/')
})
//显示account列表
app.get('/api/getCarList',async(req,res)=>{
  const cars = await Car.find()
  res.send(cars)
})
app.post('/api/cars',async (req,res)=>{
  const car = await Car.create(req.body)
  res.send(car)
})

