<template>
    <div class="distribute clearfix" id="distribute">
       <!-- 左边导航开始 -->
        <div class="left_content">
            <div class="left_content_header">
                <div class="hearder_img">
                    <img src="../../static/images/fenpei.png" alt="">
                    <p>分配管理</p>
                </div>
                <el-col style="width:100%;margin-top:150px;">
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                   >
                    <el-submenu index="1">
                        <template slot="title">
                        <span class=""></span>
                        <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
       </div>
       <!-- 左边导航结束 -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            iframeState:false,
            active:'',
            webAddress:[],
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
    },
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
            el-col {

            }
        }

    }
}
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
</style>
