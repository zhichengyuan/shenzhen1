<template>
<div id="pop">
    <!-- 弹窗开始 -->
    <div class="pop_wrapper" style="display:block;">
        <div class="pop" style="position: relative;">
            <h2>新增场次 <img src="../../static/images/close_w.png" alt="" id="pop_close" v-on:click="popUp"></h2>
            <div class="pop_content">
                <form action="">
                    <div style="position: relative;">
                        <span>选择批次</span>
                        <div class="pc">
                            <input type="text" id="search" bachid="" placeholder="请输入批次关键词，例：龙悦居">
                        </div>
                        <div class="pc_list" style="display:none">
                            <ul class="pc_list_content">
                                <li>龙悦居（一期）</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <span>选择队列</span>
                        <div style="position: relative;">
                            <template class="select">
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                    </div>
                    <div class="time">
                        <span>选择日期</span>
                        <div style="margin-right: 12px;position: relative;width:158px;">
                            <template class="select">
                                <el-select v-model="date" placeholder="请选择">
                                    <el-option
                                    v-for="item in dateObj"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                            
                        </div>
                        <span>选择时间</span>
                        <div style="position: relative;width:158px;">
                            <template class="select">
                                <el-select v-model="time" placeholder="请选择">
                                    <el-option
                                    v-for="item in timeObj"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>

                    </div>
                    <div class="btn">
                        <button type="button" id="queren">确认</button>
                        <button type="button" id="esc">取消</button>
                    </div>
                </form>
            </div>
            <div class="tip" style="display:none;z-index: 2;">
                <div class="tip_wrapper">
                    <img src="" alt="">
                    <span>请输入批次信息</span>
                </div>
            </div>

        </div>

    </div>
    <!-- 弹窗结束 -->
</div>
</template>
 
<script>
 export default {
     props:'message',
     data() {
      return {
        date:'',
        value: '',
        time:'',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        dateObj:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        timeObj:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
      }
    },
    mounted:function (){
        
    },
    methods: {
        popUp() {
            console.log(1111);
        }
    }
    
  };
</script>
 
<style lang="scss" scoped>
#pop{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 22;
        background: rgba(0, 0, 0, 0.5);
        .pop_wrapper{
            width: 100%;
            height: 100%;
            .pop{
                width: 552px;
                height: 328px;
                position: absolute;
                box-sizing: border-box;
                left: 50%;
                right: 50%;
                margin-left: -276px;
                margin-top: 164px;
                background: #fff;
                z-index: 23;
                h2{
                    width: 100%;
                    height: 46px;
                    line-height: 46px;
                    box-sizing: border-box;
                    padding: 0 26px;
                    font-size: 16px;
                    font-weight: 700;
                    color: #fff;
                    background: #057ff8;
                    img {
                        float: right;
                        margin-top: 15px;
                    }
                }
                .pop_content {
                    width: 100%;
                    height: auto;
                    box-sizing: border-box;
                    padding: 38px 26px 0px;
                    form>div {
                        width: 100%;
                        height: 34px;
                        margin-bottom: 25px;
                        &>span {
                            display: inline-block;
                            float: left;
                            height: 34px;
                            line-height: 34px;
                            margin-right: 26px;
                        }
                        &>div {
                            float: left;
                            height: 34px;
                            line-height: 34px;
                            
                        }
                        &>div.pc_list {
                            position: absolute;
                            width: 418px;
                            left: 82px;
                            top: 38px;
                            height: 114px;
                            background: #fff;
                            border: 1px solid #dbdbdb;
                            border-radius: 3px;
                            box-sizing: border-box;
                            padding: 5px 0px;
                            overflow-y: auto;
                            z-index: 2;
                            .pc_list_content {
                                width: 100%;
                            }
                            li {
                                height: 34px;
                                line-height: 34px;
                                cursor: pointer;
                                box-sizing: border-box;
                                padding-left: 20px;
                            }
                        }
                        .pc input {
                            border: 1px solid #dbdbdb;
                            height: 34px;
                            border-radius: 3px;
                            padding-left: 10px;
                            width: 418px;
                        }
                        
                        .el-select /deep/ .el-input__inner {
                            height: 34px;
                            line-height: 34px;
                        }
                        .el-select /deep/ .el-input__icon{
                            height: 34px;
                            line-height: 34px;
                        }
                        .el-select /deep/ .el-select-dropdown {
                            top:336px!important;
                        }
                    }
                    form .btn {
                        width: 170px;
                        margin: 0 auto;
                        button {
                            width: 75px;
                            height: 34px;
                            line-height: 34px;
                            text-align: center;
                            color: #fff;
                            background: #057ff8;
                            font-weight: 400;
                            border-radius: 2px;
                        }
                        #esc {
                            float: right;
                            border: 1px solid #057ff8;
                            background: #fff;
                            color: #057ff8;
                        }
                    }
                }
                .tip {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                }
            }
        }
}

</style>
