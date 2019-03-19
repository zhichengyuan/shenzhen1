<template>
    <div class="distribute clearfix" id="distribute">
       <!-- 左边导航开始 -->
        <div class="left_content">
            <div class="left_content_header">
                <div class="hearder_img">
                    <img src="../../static/images/fenpei.png" alt="">
                    <p>分配管理</p>
                </div>
                <el-col style="width:100%;margin-top:150px;" class="menu_list">
                    <el-menu default-active="2" class="el-menu-vertical-demo">
                    <el-submenu :index="index" v-for="(item,index)  in menus" :key="index">
                        <template slot="title" class="list">
                        <span class=""></span>
                        <span>{{item.menuName}}</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item :index="item.index" v-for="(item,index)  in item.menuList" :key="index"><span class="dian"></span>{{item.name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    
                    <!-- <el-submenu v-for="(item,index)  in menus" :key="index" index="1">
                        <div>{{index}}---{{item.menuName}}</div>
                    </el-submenu> -->
        
                   
                    </el-menu>
                </el-col>
            </div>
       </div>
       <!-- 左边导航结束 -->
       <!-- 右边内区域 -->
       <div class="right_content">
           <!-- 右侧头部tab切换 -->
            <h2>
                <p class="active"><span>选房管理</span><span class="close_tab"></span></p>
                <p class="" style="display:none"><span>场次号</span><span class="close_tab"></span></p>
            </h2>
            <!-- 右侧头部tab切换结束 -->
            <!-- 右侧列表模板 -->
            <List v-on:listenToChildEvent="getValue"></List>
            <!-- 右侧列表模板结束 -->
       </div>
       <!-- 右边内容区域结束 -->
    </div>
</template>

<script>
import List from '@/components/list'
export default {
    data(){
        return{
            iframeState:false,
            active:'',
            webAddress:[],
            menus:[
                {
                  menuName:'配租管理',
                  imgSrc:'',
                  menuList:[
                      {
                          name:'新增批次',
                          index:'1-1',
                      },
                      {
                          name:'批次管理',
                          index:'1-2',
                      },
                      {
                          name:'选房管理',
                          index:'1-3'
                      },
                      {
                          name:'签约管理',
                          index:'1-4'
                      }
                  ],
                },
                {
                  menuName:'配租管理',
                  imgSrc:'',
                  menuList:[
                      {
                          name:'新增批次',
                          index:'2-1',
                      },
                      {
                          name:'批次管理',
                          index:'2-2',
                      },
                      {
                          name:'选房管理',
                          index:'2-3'
                      },
                      {
                          name:'签约管理',
                          index:'2-4'
                      }
                  ],
                },
                
            ]
        }
    },
    mounted(){
        // const oIframe = document.getElementById('show-iframe');
        // const deviceWidth = document.documentElement.clientWidth - document.documentElement.clientWidth*0.02;//iframe宽度
        // const deviceHeight = window.innerHeight - 74;//iframe高度
        // oIframe.style.width = deviceWidth + 'px';
        // oIframe.style.height = deviceHeight + 'px';
        // console.log(oIframe)
        // const oHome = document.getElementById('home')
        // const deviceHeight = window.innerHeight - 5;
        // oHome.style.height = deviceHeight + 'px'
    },
    methods:{
        goBack(){
            this.goBackState = false;
            this.iframeState = false;
        },
        showIframe(name){
            this.goBackState = true;
            this.iframeState = true;
            this.active = name
        },
        //获取子组件的值
        getValue(data) {
            console.log(data);
            // PubSub.subscribe("deleteTodo",(messageName, todosIndex)=>{
            //         console.log(123443);
            //         this.deleteTodo(todosIndex);

            // });
        }
    },
    components:{
                List:List,
        }
}
</script>

<style lang="scss" scoped>
#distribute{
    width: 100%;
    height: auto;
    background: #eeeff5;
    .left_content {
        width: 206px;
        height: 720px;
        background: #fff;
        float: left;
        .left_content_header {
            width: 100%;
            height: 182px;
            position: relative;
            box-sizing: border-box;
            background: #fff;
            .hearder_img {
                width: 132px;
                height: 115px;
                margin: auto;
                position: absolute;
                top: 34px;
                left: 50%;
                margin-left: -66px;
                text-align: center;
                border-bottom: 1px solid #c8e7fd;
                p {
                    font-size: 16px;
                    margin-top: 10px;
                }
            }
            .menu_list {
                .is-opened .el-submenu__title {
                    border:2px solid black!important;
                }
                .el-submenu .el-menu-item {
                    height: 42px;
                    line-height: 42px;
                    padding: 0 45px;
                    min-width: 200px;
                }
                .el-submenu__title{
                    height: 42px;
                    line-height: 42px;
                }
                .el-submenu__title>span:first-child{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    float: left;
                    margin-top: 18px;
                    margin-right: 10px;
                    background: url('../../static/images/fangzi.png') no-repeat left center;
                }
                .el-submenu__title i{
                    color: rgb(49, 193, 248);
                }
                .dian{
                        display: inline-block;
                        float: left;
                        width: 8px;
                        height: 8px;
                        background: #fff;
                        border-radius: 50%;
                        margin-right: 7px;
                        margin-top: 16px;
                }
                .is-active>.dian{
                    background: rgb(49, 193, 248);
                }
            }
            
            .el-submenu__title {
                height: 42px!important;
                line-height: 42px!important;
                position: relative;
                -webkit-box-sizing: border-box;
                white-space: nowrap;
                list-style: none;
            }
            .el-menu-item-group__title{
                padding:0px;
            }
            .el-menu-item:focus, .el-menu-item:hover{
                background-color: #fff;
                color: rgb(49, 193, 248);
            }
        }

    }
    .right_content {
        /* overflow: auto; */
        background-color: #f7f8f8;
        width: calc(100% - 206px);
        float: left;
        h2 {
            width: 100%;
            height: 40px;
            background: #e6f0fc;
            p {
                display: inline-block;
                width: 100px;
                height: 40px;
                cursor: pointer;
                box-sizing: border-box;
                padding: 0 10px;
                span {
                    float: left;
                    display: inline-block;
                    cursor: pointer;
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                    text-align: center;
                    color: #4b7ff8;
                }
                .right_content h2 p span:first-child {
                    width: 60px;
                }
                .close_tab {
                    width: 20px;
                    height: 40px;
                    margin-left:10px;
                    background: url('../../static/images/close2.png') no-repeat center center;
                }
                .close_tab:hover{
                    background: url('../../static/images/close3.png') no-repeat center center;
                }
            }
            p.active {
                background: #d3e4fa;
                border-bottom: 2px solid #0476f2;
            }
        }
        
    
    }
}


</style>
<style lang="scss">
    .clearfix:before,.clearfix:after {
        content: "";
        display: table;
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
    .clearfix:after {
        clear: both;
    }
    .clearfix {
        zoom: 1;
    }
    .el-submenu__title{
        height: 42px;
        line-height: 42px;
    }
    .is-opened .el-submenu__title {
                    border-right:4px solid rgb(49, 193, 248)!important;
                    background-color: #ecf5ff;
                    color: rgb(49, 193, 248);
                    i{
                        color: #ecf5ff;
                    }
                }
    .menu_list .el-submenu .el-menu-item {
        height: 42px;
        line-height: 42px;
        padding: 0 45px;
        min-width: 200px;
    }
    .el-submenu__icon-arrow{
        z-index: -2;
    }
    .el-submenu__title:hover{
        color: rgb(49, 193, 248);
    }
    .el-menu-item-group__title{
        padding:0;
    }
</style>
