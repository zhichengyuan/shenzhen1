<template>
<div id="games">
    <!-- 场次号开始 -->
            <div class="order_list changci" id="changci" style="">
                <p><button id="keep" type="button">保存</button><button id="start">开始场次</button></p>
                <h2>
                    <p><span class="tab_name">场次信息</span><span class="close_img"></span></p>
                </h2>
                <div class="changci_content">
                    <div class="changci_content_left">
                        <div class="title">
                            <span>基本信息</span>
                            <div class="xian"></div>
                        </div>
                        <!-- 表单 -->
                        <ul class="clearfix">
                            <li style="width:37%">
                                <span style="width:23%">批次全称</span>
                                <div style="width:70%;position:relative" >
                                    <input type="text" name="batchName" id="batchName" v-model="form.batchName" readonly="readonly">
                                    <img src="" alt="" style="position:absolute;top:10px;right:10px;">
                                    <input type="hidden" name="batchCode" id="batchCode" value="" readonly="readonly">
                                </div>
                            </li>
                            <li style="width:30%">
                                <span>队列名称</span>
                                <div style="width:65%;position:relative">
                                    <input type="text" name="queueName" id="queueName" v-model="form.queueName" readonly="readonly">
                                    <img src="" alt="" style="position:absolute;top:10px;right:10px;">
                                </div>
                            </li>
                            <li style="width:33%">
                                <span style="margin-right: 0px">预先机台数<img src="" alt=""></span>
                                <span style="color: red;">*</span>
                                <div style="width:65%">
                                    <input type="number" name="pcCount" id="pcCount" v-model="form.pcCount" placeholder="请填写数字">
                                </div>
                            </li>
                            <li style="width:37%">
                                <span style="width:23%;">选房日期</span>
                                <div style="width:70%;position:relative">
                                    <input type="text" name="chooseDate" id="chooseDate"  v-model="form.chooseDate" readonly="readonly">
                                    <img src="" alt="" style="position:absolute;top:10px;right:10px;">
                                </div>
                            </li>
                            <li style="width:30%">
                                <span>选房时间</span>
                                <div style="width:65%;position:relative">
                                    <input type="text" name="startTime" id="startTime" v-model="form.endTime" readonly="readonly">
                                    <img src="" alt="" style="position:absolute;top:10px;right:10px;">
                                </div>
                            </li>
                            <li style="width:33%">
                                <span style="margin-right: 0px">抽签排序方式<img src="" alt=""></span>
                                <span style="color: red;">*</span>
                                <div style="width:60%">
                                    <input name="drawSort" type="radio" checked="checked" value="0" style="width:14px;" />小号优先
                                    <input name="drawSort" type="radio" style="width:14px;" value="1" />大号优先
                                </div>
                            </li>
                            <li style="width:37%">
                                <span style="width:23%;">场次号</span>
                                <div style="width:70%;position:relative">
                                    <input type="text" name="sceneNo" id="sceneNo" readonly="readonly" style="ime-mode: disabled">
                                    <img src="" alt="" style="position:absolute;top:10px;right:10px;">
                                </div>
                            </li>
                            <li style="width:30%">
                                <span style="margin-right: 0px">预选房最大套数</span>
                                <span style="color: red;">*</span>
                                <div style="width:44%">
                                    <input type="number" name="maxChoosen" id="maxChoosen" v-model="form.maxChoosen" placeholder="请填写数字">
                                </div>
                            </li>
                        </ul>
                        <div class="title">
                            <span>选房签到设置</span>
                            <div class="xian"></div>
                        </div>
                        <!-- 表单 -->
                        <ul class="clearfix">
                            <li style="width:266px">
                                <span style="width:90px;margin-right:0px;">当前签到范围</span>
                                <span style="color:red;margin-right:20px">*</span>
                                <div style="width:150px">
                                    <input type="number" name="signFrom" id="signFrom" v-model="form.signFrom" placeholder="请填写数字">
                                </div>
                            </li>
                            <li style="width:180px">
                                <span style="width:20px;margin:0 10px">至</span>
                                <div style="width:140px">
                                    <input type="number" name="signTo" id="signTo" v-model="form.signTo" placeholder="请填写数字">
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div class="changci_content_right">
                        <h1>导航</h1>
                        <el-col style="width:100%;" class="menu_list">
                            <el-menu default-active="2" class="el-menu-vertical-demo">
                            <el-submenu :index="index" v-for="(item,index)  in menus" :key="index">
                                <template slot="title" class="list">
                                <span class=""></span>
                                <span>{{item.menuName}}</span>
                                </template>
                            </el-submenu>                      
                            </el-menu>
                        </el-col>
                    </div>
                </div>

            </div>
            <!-- 场次号结束 -->
</div>
</template>
 
<script>
 export default {
    name:'Games',
    data() {
      return {
        form:{
            batchCode:'',
            batchName:'',
            chooseDate:'',
            drawSort:'',
            endTime:'',
            maxChoosen:'',
            pcCount:'',
            queueName:'',
            sceneNo:'',
            signFrom:'',
            signTo:'',
            startTime:'',
            status:'',
        },
        menus:[
                {
                  menuName:'场次管理',
                  imgSrc:'',
                },
                {
                  menuName:'签到情况',
                  imgSrc:'',
                },
                {
                  menuName:'选房队列',
                  imgSrc:'',
                },
                {
                  menuName:'过程材料',
                  imgSrc:'',
                },
            ]
      };
    },
    mounted:function (){  
    },
    methods: {
    },
    created(){
         var params = this.$route.params;
         this.form.batchName = params.batchName;
         this.form.chooseDate = params.date1;
         this.form.endTime = params.date2;
         this.form.queueName = params.queueName;
     },
    
  };
</script>
 
<style lang="scss" scoped>
#games{
    width: 96%;
    margin: 0 auto;
    margin-top: 20px;
    .changci{
        &>p {
            margin-bottom: 20px;
            button {
                width: 90px;
                height: 34px;
                line-height: 34px;
                background: #057ff8;
                color: #fff;
                border-radius: 2px;
            }
            button:first-child {
                margin-right: 20px;
            }
        }
        h2 {
            width: 100%;
            height: 35px;
            background: transparent;
            p {
                display: inline-block;
                width: auto;
                padding: 0;
                border-top: 2px solid #0471dd;
                background: #fff;
                height: 35px;
                .tab_name {
                    display: inline-block;
                    box-sizing: border-box;
                    float: left;
                    height: 35px;
                    line-height: 35px;
                    padding: 0 20px;
                    color: #0471dd;
                    font-weight: 400;
                    font-size: 13px;
                    width: auto;
                }
                .close_img {
                    width: 20px;
                    height: 35px;
                    line-height: 35px;
                    display: inline-block;
                    float: left;
                    box-sizing: border-box;
                    background: url('../../static/images/close3.png') no-repeat left center;
                }
            }
        }
        .changci_content {
            width: 100%;
            height: 528px;
            .changci_content_left {
                width: calc(100% - 224px);
                float: left;
                background: #fff;
                box-sizing: border-box;
                padding: 40px 18px;
                .title {
                    width: 100%;
                    height: 20px;
                    box-sizing: border-box;
                    border-left: 4px solid #f5a623;
                    position: relative;
                    margin-bottom: 28px;
                    span {
                        position: absolute;
                        display: inline-block;
                        box-sizing: border-box;
                        padding-left: 10px;
                        padding: 0 20px 0 10px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 20px;
                        z-index: 2;
                        background: #fff;
                    }
                    .xian {
                        position: absolute;
                        top: 18px;
                        width: 100%;
                        height: 1px;
                        background: #ccc;
                    }
                }
                ul {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 22px 15px;
                    padding-bottom: 0px;
                    background: #f7f8f8;
                    margin-bottom: 28px;
                    li {
                        float: left;
                        width: 30%;
                        height: 34px;
                        line-height: 34px;
                        margin-bottom: 20px;
                        span {
                            display: inline-block;
                            float: left;
                            margin-right: 2%;
                        }
                        div {
                            width: 60%;
                            float: left;
                            input {
                                width: 100%;
                                height: 34px;
                                border: 1px solid #dbdbdb;
                                border-radius: 3px;
                                padding-left: 5px;
                            }
                        }
                    }
                }
            }
            .changci_content_right {
                float: right;
                width: 214px;
                height: 491px;
                background: #fff;
                h1 {
                    height: 42px;
                    background: #057ff8;
                    line-height: 42px;
                    box-sizing: border-box;
                    padding: 0 22px;
                    font-size: 14px;
                    color: #fff;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
                ul {
                    width: 100%;
                    box-sizing: border-box;
                }
            }
        }
    }
    
    
}

</style>
