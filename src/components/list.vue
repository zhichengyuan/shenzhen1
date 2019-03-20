<template>
<div id="list">
    <!-- 搜索框开始 -->
     价格：{{price}}--{{noPop}}
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
        <p><button class="add" @click="dialogFormVisible = true">新增场次</button></p>
        <div class="list_content">
          <el-table
                            :data="tableData"
                            border
                            :header-cell-style="{background:'(233, 233, 233)'}"
                            style="width: 100%;">
                            <el-table-column
                            prop="batchCode"
                            label="批次代码"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="batchName"
                            label="批次名称"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="chooseDate"
                            label="队列">
                            </el-table-column>
                            <el-table-column
                            prop="endTime"
                            label="选定日期">
                            </el-table-column>
                            <el-table-column
                            prop="queueName"
                            label="选房日期">
                            </el-table-column>
                            <el-table-column
                            prop="sceneNo"
                            label="场次号">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            label="状态">
                            <template slot-scope="scope">
                                <span class="green" v-if="scope.row.status == 0">待选房</span>
                                <span class="blue" v-else-if= "scope.row.status == 1">正在选房</span>
                                <span class="red" v-else style="color:red;">结束选房</span>
                            </template>
                            </el-table-column>
                        </el-table>
        </div>
    </div>
    <!-- 列表结束 -->
        <el-dialog title="新建场次" :visible.sync="dialogFormVisible" width="50%">
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            ></el-autocomplete>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="queding">确 定</el-button>
        </div>
        </el-dialog>
</div>
</template>
 
<script>
import {mapState,mapGetters,mapActions}	from 'vuex'
 export default {
    data() {
      return {
        restaurants: [],
        state4: '',
        timeout:  null,
        name: 'List',
        batchName:'',
        value: '',
        value1: '',
        tableData:'',
        batchList:[],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }],
        
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      
      };
    },
    computed:{
		...mapState({
             price:state => state.price,
             noPop:state => state.noPop
		})
	},
    methods: {
        //请求场次列表
        
        show() {
            var that = this;
            this.$axios({
                method: 'get',
                url: 'http://193.112.22.34:8480/phbip_mock/choose_house/list?pageIndex=1&pageSize=10',
            })
            .then(function (response) {
                console.log(response);
                that.tableData = response.data.data.content;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
         //请求批次列表
        batchGet() {
            var that = this;
            this.$axios({
                method: 'get',
                url: "http://193.112.22.34:8480/phbip_mock/choose_house/batch/list",
                data: {},
            })
            .then(function (response) {
                console.log(response);
                this.batchList = response.data.data
                
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        //点击增加场次
        sendMsgIoParent(){
            this.$emit('listenToChildEvent','this message is from child');
            //订阅消息
            // PubSub.subscribe("delTodo",(msg,index) => {
            //     this.delTodo(index);
            // })
        },
        //点击确定
        queding(){
            this.dialogFormVisible = false;
            this.count();
        },
         loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
        createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      count() {
			this.$store.commit('is_pop');
		}
    },
    mounted() {
        this.show();
        this.batchGet(); 
        this.restaurants = this.loadAll();
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
                    .el-select /deep/ .el-input{
                            height: 50px;
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
            .el-table /deep/ .cell{
                line-height: 20px;
            }
            .el-table /deep/ td{
                padding:5px 0;
            }
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
                    background-color: #f2f2f2;
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
