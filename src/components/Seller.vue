<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Seller",
    data(){
      return {
        chartInstance:null,
        allData : [],
        currentPage :1,
        totalPage:0,
        timeId:null,
        sendtime:[],
      }
    },
    mounted() {
      //页面打开时就执行
      this.creatsendtime()
      this.initChart()
      this.getData()
      window.addEventListener('resize', this.screenAdapter)
      // 在页面加载完成的时候, 主动进行屏幕的适配
      this.screenAdapter()
    },
    destroyed() {
      clearInterval(this.timeId)
      // 在组件销毁的时候, 需要将监听器取消掉
      window.removeEventListener('resize', this.screenAdapter)
    },
    methods:{
      dateFormat(fmt, date) {
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
        };
        return fmt;
      },

      creatsendtime(){
        var date =new Date();
        date = this.dateFormat("YYYY-mm-dd%20", date);
        for (var i=0;i<25;i++)
        {
          if(i<10)
          {
            this.sendtime[i]=date+"0"+i+"%3A00%3A00";
          }
          else{
            this.sendtime[i]=date+i+"%3A00%3A00";
          }
        }
        console.log(this.sendtime)
      },
      //1.初始化echartInstance对象
      initChart(){
        this.chartInstance=this.$echarts.init(this.$refs.seller_ref,'chalk')
        //对图标初始化配置的控制
        const initOption={
          title:{
            text:'#一段时间内车流量统计',
            left:20,
            top:20,
            grid:{
              top:'20%',
              left:'30%',
              right:'6%',
              bottom :'3%',
              //直角坐标轴的调整不包括xy轴上的文字，如果要，设置下面的属性为true
              containLabel:true
            }
          },
          xAxis:{
            type:'value'
          },
          yAxis:{
            type:'category',
            // data:sellerNames
          },
          //鼠标移动到柱时的文字提示+背景色：透明灰
          tooltip:{
            trigger:'axis',
            axisPointer:{
              type:'line',
              //背景色层级最低
              z:0,
              lineStyle:{
                color:'#203443'
              }
            }
          },
          series:[
            {
              type:'bar',
              //文字的展示
              label:{
                show:true,
                //文字默认在柱内部中间
                position :'right',
                textStyle:{
                  color:'white'
                }
              },
              //柱的展示
              itemStyle:{
                // barBorderRadius:[0,33,33,0],
                //指明颜色渐变的方向（0，0)->(1,0)
                //指明不同百分比之下的颜色值
                color: new this.$echarts.graphic.LinearGradient(0,0,1,0,[
                  //百分之0状态下的颜色值
                  {
                    offset:0,
                    color:'#5052EE'
                  },
                  //  百分之1状态下的颜色值
                  {
                    offset:1,
                    color:'#AB6EE5'
                  }
                ])
              }
            }
          ]
        }
        this.chartInstance.setOption(initOption)
        //对鼠标事件进行监听
        this.chartInstance.on('mouseover' ,()=>{
          clearInterval(this.timeId)
        })
        this.chartInstance.on('mouseout', ()=>{
          this.startInterval()
        })
      },
      async getData(){
        var k = 0
        for (var i =0;i<this.sendtime.length;i++){
          if (i == this.sendtime.length-1){
            console.log('sendtime.length')
            console.log(this.sendtime.length)
            this.totalPage = this.sendtime.length %5 === 0? this.sendtime.length/5 :this.sendtime.length/5 +1
            this.updateChart()
            //  启动定时器
            this.startInterval()
          }else{
            this.$http.get(`city-car/city/getCarByCityId?id=1&start=${this.sendtime[k]}&end=${this.sendtime[i+1]}`).then(res => {
              console.log('返回的数据：')
              console.log(res.data)
              // this.accountList.date = this.accountList.date.substring(1,7)
              this.allData.push(res.data)
              console.log('allData_：')
              console.log(this.allData)
            }).catch(function (err) {
              console.log(err);
            });
            k +=1
          }
        }
      },

      //2。
      updateChart (){
        const start = (this.currentPage - 1)*5
        const end =(this.currentPage)*5
        const showData =this.allData.slice(start, end)
        const sellerNames = showData.map((item) =>{
          return item.data.time
        })
        const sellerValues = showData.map((item) =>{
          return item.data.num
        })
        const dataOption ={
          yAxis:{
            data:sellerNames
          },
          series:[
            {
              data:sellerValues
            }
          ]
        }
        this.chartInstance.setOption(dataOption)
      },
      startInterval (){
        //编程的小技巧
        if(this.timeId){
          clearInterval(this.timeId)
        }
        this.timeId = setInterval (() =>{
          this.currentPage ++
          if(this.currentPage > this.totalPage){
            this.currentPage = 1
          }
          this.updateChart()
        },3000)
        // setInterval(this.getData(), 1000);
      },
      screenAdapter(){
        //数值是老师实验觉得最合适的
        const titleFontSize=this.$refs.seller_ref.offsetWidth /100 *3.6
        const adapterOption ={
          title:{
            textStyle:{
              fontsize:titleFontSize
            }
          },
          //鼠标移动到柱时的文字提示+背景色：透明灰
          tooltip:{
            axisPointer: {
              lineStyle: {
                width: titleFontSize
              }
            }
          },
          series:[
            {
              barWidth:titleFontSize,
              //柱的展示
              itemStyle:{
                barBorderRadius:[0,titleFontSize/2,titleFontSize/2,0],
              }
            }
          ]
        }
        this.chartInstance.setOption(adapterOption)
        this.chartInstance.resize()
      }
    },
  }
</script>

<style scoped>

</style>