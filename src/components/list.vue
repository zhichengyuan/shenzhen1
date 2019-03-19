<template>
<div id="list">
    <!-- 搜索框开始 -->
    <div class="search_box">
        <ul class="search clearfix">
            <li style="width:30%">
                <span>批次简称</span>
                <div>
                    <el-input v-model="batchName" placeholder="请输入内容"></el-input>
                </div>
            </li>
            <li style="width:30%">
                <span>选房日期</span>
                <div >
                    <template>
                        <div class="block">
                            <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </template>
                </div>
            </li>
            <li style="width:25%">
                <span>选房状态</span>
                <div style="width:60%;">
                    <template>
                        <el-select v-model="value" placeholder="请选择选房状态">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </div>
            </li>
            <li style="width:10%">
                <button id="find">查询</button>
            </li>
        </ul>
    </div>
    <!-- 搜索框结束 -->
    <!-- 列表 -->
    <div class="order_list">
        <p><button class="add" @click="addGames">新增场次</button></p>
        <div class="list_content">
           <ul>
                <li>
                    <ol class="clearfix">
                        <li class="frist">批次代码</li>
                        <li class="senced">批次简称</li>
                        <li class="three">队列</li>
                        <li class="four">选房日期</li>
                        <li class="five">选房时间</li>
                        <li class="six">场次号</li>
                        <li>状态</li>
                    </ol>
                </li>
                <li v-for="(item,index)  in orderList" :key="index">
                    <ol class="clearfix">
                        <li class="frist">{{item.batchCode}}</li>
                        <li class="senced">{{item.batchName}}</li>
                        <li class="three">{{item.queueName}}</li>
                        <li class="four">{{item.chooseDate}}</li>
                        <li class="five">{{item.endTime}}</li>
                        <li class="six">{{item.sceneNo}}</li>
                        <li class="green" v-if="item.status == '0'">待选房</li>
                        <li class="orange" v-else-if="item.status == '1'">结束选房</li>
                        <li class="blue" v-else>正在选房</li>
                    </ol>
                </li>
            </ul>
        </div>
    </div>
    <!-- 列表结束 -->
</div>
</template>
 
<script>
 export default {
    data() {
      return {
        name: 'List',
        batchName:'',
        value: '',
        value1: '',
        orderList:'',
        class:['green','orange','blue'],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        options: [{
          value: '选项1',
          label: '待选房'
        }, {
          value: '选项2',
          label: '正在选房'
        }, {
          value: '选项3',
          label: '结束选房'
        }],
      };
    },
    mounted:function (){
        this.show();
    },
    methods: {
        //请求场次列表
        
        show() {
            var that = this;
            this.$axios({
                method: 'get',
                url: 'http://193.112.22.34:8480/phbip_mock/choose_house/list?pageIndex=1&pageSize=10',
                data: {},
            })
            .then(function (response) {
                console.log(response);
                that.orderList = response.data.data.content;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        //点击增加场次
        addGames(){
            //订阅消息
            // PubSub.subscribe("delTodo",(msg,index) => {
            //     this.delTodo(index);
            // })
        }
    }
    
  };
</script>
 
<style lang="scss" scoped>
#list{
    width: 96%;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
    // 搜索框样式
    .search_box {
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        padding: 0 50px;
        border-bottom: 1px solid #eeeeee;
        background: #fff;
        .search {
            width: 100%;
            height: 80px;
            li {
                float: left;
                width: 25%;
                height: 80px;
                line-height: 80px;
                span {
                    display: inline-block;
                    float: left;
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                    margin-right: 5%;
                }
                div{
                    float: left;
                    .el-input .el-input__inner{
                        height: 26px;
                        line-height: 26px;
                    }
                    input{
                        border: 1px solid #dbdbdb;
                        height: 26px;
                        border-radius: 3px;
                        padding-left: 5px;
                        width: 80%;
                    }
                    select {
                        border: 1px solid #dbdbdb;
                        height: 26px;
                        width: 125%;
                        border-radius: 3px;
                        font-size: 12px;
                        color: #999999;
                    }
                    .homePage /deep/ .el-date-picker {
                        padding: 0;
                        background: red;
                    }
                }
                #find {
                    background: #057ff8;
                    height: 26px;
                    width: 66px;
                    line-height: 26px;
                    text-align: center;
                    border-radius: 2px;
                    color: #fff;
                }
            }
        }
    }
    //搜索框样式结束
    //列表样式
    .order_list{
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 22px 20px;
            background: #fff;
            height: 550px;
            p{
                height: 34px;
                margin-bottom: 15px;
                .add {
                    width: 90px;
                    height: 34px;
                    line-height: 34px;
                    color: #fff;
                    background: #057ff8;
                    border-radius: 2px;
                }
            }
            .list_content {
                width: 100%;
                height: auto;
                ul {
                    border-left: 1px solid #e9e9e9;
                }
                ul>li:first-child {
                    background: #f2f2f2;
                }
                ul>li>ol{
                    height: 40px;
                    line-height: 40px;
                    li{
                           float: left;
                            box-sizing: border-box;
                            padding-left: 20px;
                            border-right: 1px solid #e9e9e9;
                            border-bottom: 1px solid #e9e9e9;
                    }
                }
                ul>li>ol>li.frist {
                    width: 16%;
                }
                ul>li>ol>li.senced {
                    width: 22%;
                }
                ul>li>ol>li.three {
                    width: 13%;
                }
                ul>li>ol>li.four {
                    width: 13%;
                }
                ul>li>ol>li.five {
                    width: 13%;
                }
                ul>li>ol>li.six {
                    width: 12%;
                }
                ul>li>ol>li:last-child {
                    width: 11%;
                }
            }
    }
    //列表样式结束
}
.green {
    color: #009966;
}
.orange {
    color: #ff6600;
}
.blue {
    color: #0471dd;
}
</style>
<style>
    .el-input .el-input__inner{
                        height: 26px;
                        line-height: 26px;
                    }
    .el-input .el-input__inner:focus{
        outline:none;
    }
    .el-select-dropdown {
        top:104px!important;
    }
</style>