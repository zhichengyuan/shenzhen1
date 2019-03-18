<template>
    <div class="home">
        <div class="header">
            <div class="title">
                上海数慧基础信息平台
            </div>
            <div class="menu">
                <ul>
                    <a :href="item.link" target="showHere" @click="showIframe(item.name)" :class="{active: active == item.name}" v-for="(item, index) in webAddress" :key="index">
                        <li>{{item.name}}</li>
                    </a>
                </ul>
            </div>
            <div class="user">
                <div class="user-login">
                    <div class="img"></div>
                    <div class="name">用户名</div>
                </div>
                <span>|</span>
                <div class="user-out">
                    退出
                </div>
            </div>
        </div>
        <div class="container">
            <iframe v-show="iframeState" id="show-iframe" name="showHere" src="" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            iframeState:false,
            active:'',
            webAddress:[
                {
                    name:'首页',
                    link:'http://localhost:8081'
                },
                {
                    name:'规划计划',
                    link:'http://vuex.vuejs.org/'
                },
                {
                    name:'房源管理',
                    link:'http://www.yyyweb.com/377.html'
                },
                {
                    name:'需求管理',
                    link:'http://www.yyyweb.com/377.html'
                },
                {
                    name:'分配管理',
                    link:'http://localhost:8080'
                },
                {
                    name:'后续管理',
                    link:'http://www.yyyweb.com/377.html'
                },
                {
                    name:'运维管理',
                    link:'http://www.yyyweb.com/377.html'
                },
                {
                    name:'监督监管',
                    link:'http://www.yyyweb.com/377.html'
                },
            ],
        }
    },
    mounted(){
        const oIframe = document.getElementById('show-iframe');
        const deviceWidth = document.documentElement.clientWidth - document.documentElement.clientWidth*0.02;//iframe宽度
        const deviceHeight = document.documentElement.clientHeight - 74;//iframe高度
        oIframe.style.width = deviceWidth + 'px';
        oIframe.style.height = deviceHeight + 'px';
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
        }
    }
}
</script>

<style lang="scss" scoped>
.home{
    width: 100%;
    background: #f3f3f3;
    .header{
        background: #0475F2;
        color:#fff;
        height: 100px;
        line-height: 70px;
        font-size: 20px;
        padding: 0;
        display: flex;
        justify-content: space-around;
        .title{
            width: 200px;
            line-height: 70px;
        }
        .menu{
            width: auto;
            ul{
                padding: 0 20px;
                margin-top:22px;
                display: flex;
                justify-content: space-between;
                background: rgba(255,255,255,.2);
                border-radius: 20px;
                a{
                    color: #fff;
                    li{
                        height: 30px;
                        line-height: 30px !important;
                        padding:0 20px;
                        line-height: 70px;
                        border-radius: 3px;
                        font-size: 14px;
                    }
                }
                a.active{
                    color: #0475F2;
                    li{
                        background: #fff;
                        font-weight: bolder;
                    }
                }
            }
        }
        .user{
            width: 160px;
            margin-left: 1rem;
            div,span{
                float: left;
                font-size: 10px;
            }
            span{
                margin:0 0.5rem;
            }
            .user-login{
                .img{
                    width: 30px;
                    height: 30px;
                    background: #000;
                    margin: 20px 0.5rem 0 0;
                    border-radius: 100%;
                    border:1px solid #fff;
                }
            }
        }
    }
    .container{
        width: 98%;
        margin:-30px 1% 0 1%;
        background: #fff;
        border-radius: 5px;
        iframe{
            margin:0;
            overflow: hidden;
            border-radius: 5px;
        }
        iframe::-webkit-scrollbar{
            display: none !important;
        }
    }
}
</style>
