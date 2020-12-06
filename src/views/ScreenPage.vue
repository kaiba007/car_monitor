<template>
  <div class="screen-container" >
    <header class="screen-header">
      <div>
<!--        <img :src="headerSrc" alt="">-->
      </div>
      <span class="logo">
<!--        <img :src="logoSrc" alt="" />-->
      </span>
      <span class="title">车流量实时监控系统</span>
      <div class="title-right">
<!--        <img :src="themeSrc" class="qiehuan" >-->
        <span class="datetime">{{todayDate}}</span>
      </div>
    </header>
    <section class="screen-middle">
      <div id="middle-top" >
        <Seller ref="seller"></Seller>
      </div>
    </section>
  </div>
</template>

<script>
  import Seller from '@/components/Seller.vue'
  export default {
    date(){
    },
    computed:{
      todayDate:function () {
        return this.dateFormat("YYYY-mm-dd", new Date())
      }
    },
    components: {
      Seller,
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
      }
    },
  }
</script>
<style lang="less" scoped>
  // 全屏样式的定义
  .fullscreen {
    position: fixed!important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    z-index: 100;
  }

  .screen-container {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background-color: #161522;
    color: #fff;
    box-sizing: border-box;
  }
  .screen-header {
    width: 100%;
    height: 64px;
    font-size: 20px;
    position: relative;
    > div {
      img {
        width: 100%;
      }
    }
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 20px;
      transform: translate(-50%, -50%);
    }
    .title-right {
      display: flex;
      align-items: center;
      position:absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-80%);
    }
    .datetime {
      font-size: 15px;
      margin-left: 10px;
    }
    .logo {
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-80%);
      img {
        height: 35px;
        width: 128px;
      }
    }
  }

  .screen-middle{
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 10px;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 80%;
      /*margin-left: 50%;*/
      position: relative;
    }
  }
</style>
