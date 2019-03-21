<template>
<div id="list">
    <!-- 搜索框开始 -->
     <!-- 价格：{{price}}--{{noPop}} -->
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
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
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
          <el-table :data="tableData" border :header-cell-style="{background:'(233, 233, 233)'}" style="width: 100%;">
                <el-table-column prop="batchCode" label="批次代码" width="180"></el-table-column>
                <el-table-column prop="batchName" label="批次名称" width="180"></el-table-column>
                <el-table-column prop="chooseDate" label="队列"></el-table-column>
                <el-table-column prop="endTime" label="选定日期"></el-table-column>
                <el-table-column prop="queueName" label="选房日期"></el-table-column>
                <el-table-column prop="sceneNo" label="场次号"> </el-table-column>
                <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span class="green" v-if="scope.row.status == 0">待选房</span>
                    <span class="blue" v-else-if= "scope.row.status == 1">正在选房</span>
                    <span class="red" v-else style="color:#ff6600;">结束选房</span>
                </template>
                </el-table-column>
         </el-table>
        </div>
    </div>
    <!-- 列表结束 -->
        <el-dialog title="新建场次" :visible.sync="dialogFormVisible" width="50%">
        <el-form :model="form">
            <el-form-item label="选择批次" :label-width="formLabelWidth">
            <el-autocomplete v-model="queue" :fetch-suggestions="querySearchAsync" placeholder="请输入批次关键词，例：伟业博越湾" @select="handleSelect"></el-autocomplete></el-form-item>
            <el-form-item label="选择队列" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择队列">
                <el-option label="A房队" value="shanghai"></el-option>
                <el-option label="B房队" value="beijing"></el-option>
                <el-option label="C房队" value="beijing"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="选择日期" :label-width="formLabelWidth">
            <el-select v-model="form.date1" placeholder="请选择日期">
                <el-option label="2019/03/21" value="2019/03/21"></el-option>
                <el-option label="2019/03/22" value="2019/03/22"></el-option>
                <el-option label="2019/03/23" value="2019/03/23"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="选择时间" :label-width="formLabelWidth">
            <el-select v-model="form.date2" placeholder="请选择时间">
                <el-option label="09:00" value="09:00"></el-option>
                <el-option label="10:00" value="10:00"></el-option>
                <el-option label="14:00" value="14:00"></el-option>
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
     name:'list',
    data() {
      return {
        
        restaurants: [],//查询之后的数组
        queue:'',
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
        //获取公共状态值
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
                this.batchList = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        
        //点击确定
        queding(){
            this.dialogFormVisible = false;
            //调整公共状态
            this.$store.commit('is_pop');
            //重定向页面
            console.log(this.form.region,this.batchName,this.form.date1,this.form.date2);
            this.$router.push({name: 'Games',params:{queueName: this.form.region,batchName:this.batchName,date1:this.form.date1,date2:this.form.date2}})
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
                { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" }
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
      //input搜索之后下拉框选中的对象
      handleSelect(item) {
        console.log(item);
        this.batchName = item.value;
        console.log(this.batchName);
      }
    },
    mounted() {
        this.show();
        this.batchGet(); 
        this.restaurants = this.loadAll();
        //  this.shuchu();
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
            }
    }
    //列表样式结束
    .el-form-item__content /deep/ .el-autocomplete{
        width:90%;
    }
}

    .el-autocomplete /deep/ .el-autocomplete-suggestion{
        width: 455px;
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
