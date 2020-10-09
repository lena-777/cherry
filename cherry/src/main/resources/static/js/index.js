new Vue({
   el:"#app",
   data(){
       return {
           activeName: '1',
           //日期：最近一周、最近一月的处理
           pickerOptions2: {
               shortcuts: [{
                   text: '最近一周',
                   onClick(picker) {
                       const end = new Date();
                       const start = new Date();
                       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                       picker.$emit('pick', [start, end]);
                   }
               }, {
                   text: '最近一个月',
                   onClick(picker) {
                       const end = new Date();
                       const start = new Date();
                       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                       picker.$emit('pick', [start, end]);
                   }
               }, {
                   text: '最近三个月',
                   onClick(picker) {
                       const end = new Date();
                       const start = new Date();
                       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                       picker.$emit('pick', [start, end]);
                   }
               }]
           },           //*固定值，用于日期选取。
           currentPage:1,   //当前页
           size:8,     //每页显示条数
           total:20,    //总数据数
           radio:'',    //存放datasearch选择农药的model
           value7:'',       //arrary数组 value7[0]表示起始日期，value7[1]表示终止日期
           value1:[],       //存放最近七天的日期
           startDate:'',    //开始日期
           endDate:'',      //截止日期
           isAnalyze:false, //是否传照片了
           searchLogId:'',   //日志查询的ID
           echartData:{
               text:"害虫数据分析表",
               date:[],
               xData:[],
               pest:[{
                   name:''
               }],
               //获取数据库中危害等级表
               myMarkLine: {
                   silent: true,
                   mydata: [{
                       yAxis: 500,
                       label: {
                           formatter: '危害等级E'
                       }
                   }, {
                       yAxis: 1000,
                       label: {
                           formatter: '危害等级D'
                       }
                   }, {
                       yAxis: 1500,
                       label: {
                           formatter: '危害等级C'
                       }
                   }, {
                       yAxis: 2000,
                       label: {
                           formatter: '危害等级B'
                       }
                   }, {
                       yAxis: 2500,
                       label: {
                           formatter: '危害等级A'
                       }
                   }],
                   lineStyle: {
                       normal: {
                           type: 'solid',
                       },
                   },
               },
               pictureMessage:[{
                   x:15,
                   y:20,
               },{
                   x:30,
                   y:90,
               },{
                   x:100,
                   y:200,
               },{
                   x:300,
                   y:100,
               }],
            /*   data:[]*/
               data:[
                   {
                       name: '害虫a',
                       type: 'line',
                       stack: '总量',
                       smooth:true,  //这个是把线变成曲线
                       data: [1,3,8,5,1,2,1,4,1,0,1,2,1,10,2,0,5,1,3,1,9,11,5,12,2,1,0,1,0,1,6,2]
                   },
                   {
                       name:'',
                       data:'',
                       type:'line',
                       markLine: {
                           silent: true,
                           data: [{
                               yAxis: 30,
                               label:{
                                   formatter:'危害等级C'
                               }
                           }, {
                               yAxis: 20,
                               label:{
                                   formatter:'危害等级B'
                               }
                           }, {
                               yAxis: 10,
                               label:{
                                   formatter:'危害等级A'
                               }
                           }],
                           lineStyle: {
                               normal: {
                                   type: 'solid',
                               },
                           },
                       }

                   },
               ]
           },   //图表模拟数据
           pestData:[],         //所有害虫信息
           nowPest:  {
               "id": "01",
               "name": "桃红颈天牛",
               "describe": "桃红颈天牛属鞘翅目，天牛科。体黑色，有光亮；前胸背板红色，背面有4个光滑疣突，具角状侧枝刺；鞘翅翅面光滑，基部比前胸宽，端部渐狭；雄虫触角超过体长4～5节，雌虫超过1～2节。它体长28～37mm。主要分布于北京、东北、河北、河南、江苏、浙江等地。",
               "brief": "成虫：体黑色，有光亮；前胸背板红色，背面有4个光滑疣突，具角状侧枝刺；鞘翅翅面光滑，基部比前胸宽，端部渐狭；雄虫触角成虫　有两种色型：一种是身体黑色发亮和前胸棕红色的“红颈型”，另一种是全体黑色发亮的“黑颈”型。据初步了解，福建、湖北有“红颈”和“黑颈”两型的个体，而长江以北如山西、河北等地只见有“红颈”个体。成虫体长约28-37毫米，体黑色发亮，前胸背面大部分为光亮的棕红色或完全黑色。头黑色，腹面有许多横皱，头顶部两眼间有深凹。触角蓝紫色，基部两侧\r\n各有一叶状突起。前胸两侧各有刺突一个，背面有4个瘤突。鞘翅表面光滑，基部较前胸为宽，后端较狭。雄虫身体比雌虫小，前胸腹面密布刻点，触角超过虫体5节；雌虫前胸腹面有许多横皱，触角超过虫体两节。\r\n卵：卵圆形，乳白色，长约6-7毫米。\r\n幼虫：老熟幼虫体长约42-52毫米，乳白色，前胸较宽广。身体前半部各节略呈扁长方形，后半部稍呈圆筒形，体两侧密生黄棕色细毛。前胸背板前半部横列4个黄褐色斑块，背面的两个各呈横长方形，前缘中央有凹缺，后半部背面谈色，有纵皱纹；位于两侧的黄褐色斑块略呈三角形。胸部各节的背面和腹面都稍微隆起，并有横皱纹。\r\n蛹：体长35毫米左右，初为乳白色，后渐变为黄褐色。前胸两侧各有一刺突",
               "picture": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1601214869&di=c196c4d1b6a022ab8028b9fcb9c8103a&src=http://www.linye.sh.cn/Images/Upload/2012_6_27/%E6%A1%83%E7%BA%A2%E9%A2%88%E5%A4%A9%E7%89%9B.JPG",
               "appearlaw": "成虫羽化后在树干蛀道中停留3-5天后外出活动。雌成虫遇惊扰即行飞逃，雄成虫则多走避或自树上坠下，落入草中。成虫外出活动2-3天后开始交尾产卵。常见成虫于午间在枝条上栖息或交尾。卵产在枝干树皮缝隙中。幼壮树仅主干上有裂缝，老树主干和主枝基部都有裂缝可以产卵。一般近土面35厘米以内树干产卵最多，产卵期5-7天。产卵后不久成虫便死去。",
               "enemy": "管氏肿腿蜂寄生于幼虫",
               "live": "此虫一般二年，少数三年，发生1代，以幼龄幼虫第1年和老熟幼虫第2年越冬。成虫于5-8月间出现；各地成虫出现期自南至北依次推迟。福建和南方各省于5月下旬成虫盛见；湖北于6月上中旬成虫出现最多；成虫终见期在7月上旬。河北成虫于7月上中旬盛见；山东成虫于7月上旬至8月中旬出现；北京7月中旬至8月中旬为成虫出现盛期。",
               "damage": "主要危害核果类，如桃、杏、樱桃、郁李、梅等，也危害柳、杨、栎、柿、核桃、花椒等。幼虫蛀入木质部危害，造成枝干中空，树势衰弱，严重时可使植株枯死",
               "solve": "（1）人工防治：幼虫孵化期，人工刮除老树皮，集中烧毁。成虫羽化期，人工捕捉，主要利用成虫中午至下午2～3时静栖在枝条上，特别是下到树干基部的习性，进行捕捉。由于成虫羽化期比较集中，一般在10天左右。在此期间坚持人工捕捉，效果显著。成虫产卵期，经常检查树干，发现有方形产卵伤痕，及时刮除或以木槌击死卵粒（2）药剂防治：对有新鲜虫粪排出的蛀孔，可用小棉球蘸敌敌畏煤油合剂（煤油1000克加入80%敌敌畏乳油50克）塞入虫孔内，然后再用泥土封闭虫孔，或注射80%敌敌畏原液少许，洞口敷以泥土，可熏杀幼虫。",
               "createTime": null,
               "createBy": null,
               "pesticides": [
                   {
                       "id": "01",
                       "name": "50%辛硫磷乳油",
                       "method": " 防治卫生害虫 用50%乳油500-1000倍液喷洒家畜厩舍，防治卫生害虫效果好，对家畜安全",
                       "water_ratio": 20,
                       "picture": null,
                       "createBy": null,
                       "createTime": null,
                       "isDelete": null,
                       "warning": " 1.不能与碱性物质混合使用。\r\n2．黄瓜、菜豆对辛硫磷敏感，易产生药害。\r\n3．辛硫磷见光易分解，所以田间使用最好在夜晚或傍晚使用。\r\n4．高粱对辛硫磷敏感，不宜喷撒使用。玉米田只能用颗粒剂防治玉米螟，不要喷雾防治蚜虫、粘虫等。\r\n5．中毒症状，急救措施与其他有机磷相同。",
                       "byeffect": "本品为低毒有机磷杀虫剂。能抑制胆碱酯酶活性。中毒症状有头痛、头昏、恶心、多汗、流涎、瞳孔缩小、腹痛等症状。",
                       "brief": " 辛硫磷是一种有机磷杀虫剂，化学式为C12H15N2O3PS，以触杀和胃毒作用为主，无内吸作用，对鳞翅目幼虫很有效。辛硫磷杀虫谱广，击倒力强，在田间因对光不稳定，很快分解，所以残留期短，残留危险小，但该药施入土中，残留期很长，适合于防治地下害虫， 剂型 50%，45%辛硫磷乳油，5%颗粒剂。",
                       "suiteffect": " 适合于防治地下害虫。对危害花生、小麦、水稻、棉花、玉米、果树、蔬菜、桑、茶等作物的多种鳞翅目害虫的幼虫有良好的作用效果，对虫卵也有一定的杀伤作用。也适于防治仓库和卫生害虫。"
                   }
               ]
           },   //当前查询的害虫
           fileList: [{name: '', url: ''}],
           logData:[],      //所有日志
           show: true,      //index轮播图使用效果
           timer:'',    //定时器
           nowWarnData:{pestName:'',id:''},  //当前查询的日志信息
           equipment:[],        //当前用户的所有监控设备
           nowEquipment:{equipmentName:'',}, //当前用户查看的监控设备
           value2:'',       //存放warning页面选择的起始日期和结束日期
           warningWarnDate:[],      //存放warning页面选择起始日期和结束日期查询到的数据
           harmLevel:[],    //危害等级
           formatHarmLevel:[],      //格式化的危害等级
           datasearchPest:{},       //datasearch当前查询的害虫信息
           echarts2:{xData:[0,0,0,0,0,0,0],data:[0,0,0,0,0,0,0]}, //图表2所需要的数据 xData=>横坐标需要的数据，data=>实际数据
           nowPesticides:{name:"80%敌敌畏乳油",brief:"本品为中等毒性的有机磷杀bai虫剂，具有杀虫广谱，作用迅du速，残效期短等特点zhi。对害虫有胃毒、触杀及强大的熏蒸杀虫效果，适用于防治棉花、小麦、茶、青菜、苹果树等作物及粮仓、卫生等多种害虫。持效期7天左右.",method:"利用其熏蒸作用防治多种不宜防治的隐蔽性害虫。",suiteffect:"纯品为无色至琥珀色液体，微带芳香味。制剂为浅黄色至黄棕色油状液体，在水溶液中缓慢分解，遇碱分解加快，对热稳定，对铁有腐蚀性。对人畜中毒，对鱼类毒性较高，对蜜蜂剧毒。对害虫作用迅速，残效期短，可有效防治水稻、棉花、小麦、茶树、蔬菜、桑树、果树等植物上的多种害虫及粮仓、卫生害虫，如稻飞虱、蚜虫、黏虫、卷叶蛾、刺蛾、菜青虫、造桥虫、尺蠖、白粉虱、松毛虫、多种储藏害虫、苍蝇、蚊子等。",byeffect:"无",warning:"具有强烈的胃毒、触杀和熏蒸作用",waterRatio:"1200"},    //当前点击的农药。默认为pestPesticides第一个数据
       }
   },
    methods:{
        //t获取日期范围1
        getDate:function(){
            this.echartData.xData=getAllDate(this.value2[0], this.value2[1]);
           // this.loadEcharts();
            this.getDataByDate();
        },
        //t获取日志数据2
        getDataByDate:function() {
            this.echartData.data=[];    //清空原来的数据
            //console.log("clean")
            //console.log(this.echartData.data);
            axios.post(`http://47.112.214.76:9010/warnData/findOredrByPestName`,{startTime:this.value2[0]+" 00:00:00",endTime:this.value2[1]+" 23:59:59"}).then(response=>{
                var map=new Map();
                map=response.data.data;
                let currentData=new Array();
                let i=0;let j=0;let d;let result;
                for(let m in map){      //m为key的值

                    let save=new Array();
                    currentData=map[m];
                    j=this.echartData.xData.length-1;
                    i=0;
                    while (j>-1){
                        if (i>=currentData.length) {
                            save.unshift(0);
                            j--;
                        }else{
                            d=new Date(currentData[i].colletionTime).format("yyyy-MM-dd"); //格式化日期
                            //console.log(this.echartData.xData[j]+"---"+d);
                            result=compareDate(this.echartData.xData[j],d);
                            //判断该日期是否存在害虫.(当参数1＜参数2时，返回-1；当参数1=参数2时，返回0；当参数1＞参数2时，返回1)
                            //
                            if (result == 0){
                                save.unshift(currentData[i].number);
                                i++;
                                j--;
                            }else if (result == 1){
                                save.unshift(0);
                                j--;
                            }else{

                                i++;    //不会出现这种情况
                            }
                        }
                    }
                    console.log(save);
                    this.echartData.data.push({
                        name:m,
                        type:'line',
                        stack:'总量',
                        smooth:true,
                        data:save,
                    })
                }
                this.loadEcharts();
                //this.searchHarmLevel();
            }).catch(function (error) {
                console.log(error);
            });
           console.log(this.echartData.data)
        },
        //查询危害等级3
        searchHarmLevel:function () {
            axios.get(`http://47.112.214.76:9010/harmLevel`).then(response=>{
                this.harmLevel=response.data.data[0];
            }).catch(function (error) {
                console.log(error);
            });
            this.changeLevelFormat(); //格式化等级数据
        },
        //将危害等级的数据修改为图表显示所需的格式(在查询完当前图表显示的害虫日志后再将数据push进去)4
        changeLevelFormat:function () {
            for (var i=0;i<this.harmLevel.length;i++){
                this.formatHarmLevel.push({
                    yAxis:this.harmLevel[i].minV,
                    label:{
                        formatter:this.harmLevel[i].level
                    }
                });
            }
            //添加必要信息
            this.formatHarmLevel={
                name:'',
                data:'',
                type:'line',
                markLine:{
                    silent:true,
                    data:this.formatHarmLevel
                }
            };
            this.echartData.data.push(this.formatHarmLevel);
            //console.log(this.echartData.data);
            this.loadEcharts();     //加载图表
        },
        //t加载warning图表数据5
        loadEcharts(){
            var option={
                title: {
                    text:this.echartData.text,          //固定表名
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:this.echartData.pest.name,         //害虫名
                },
                grid:{
                    x: 100,//x的值可以空值y轴与label标签的距离
                    x2: 100,
                    y2: 50,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.echartData.xData,         //查询的日期范围
                },
                yAxis: {
                    splitLine: {
                        show: false
                    }
                },
                series: this.echartData.data,           //查询出的害虫数据
            };
            var mycharts=echarts.init(document.getElementById("mycharts"));
            mycharts.setOption(option,true);
        },
        //上传图片到服务器,并查看分析结果
        submitUpload() {
            this.isAnalyze=true;
            //触发上传图片的方法，接收返回的图片

            //在图片上画圈
           // this.addCircle(100,100);
        },
        //删除图片
        handleRemove(file, fileList) {
            console.log("删除"+file, fileList);
        },
        //点击文件时获取文件数据   （打开图片？）
        handlePreview(file) {
            console.log("查看"+file.url);
        },
        //t数据分析按钮跳转页面
        toDataSearch:function (id) {
            //console.log("当前id是："+id);
            window.location.href="datasearch.html?id="+id;     //页面跳转
            searchWarnDataById1(id);
        },
        //t加载datasearch图标数据
        loadDataEcharts(){
            var options2= {
                xAxis: {
                    type: 'category',
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    data:this.echarts2.xData,
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    // data: [820, 932, 901, 934, 1290, 1330, 1320],
                    data:this.echarts2.data,
                    type: 'line',
                    smooth: true
                }]
            };
            var mycharts2=echarts.init(document.getElementById("mycharts2"));
            mycharts2.setOption(options2);
        },
        //t根据日志id查询数据
        searchWarnDataById:function (id) {
            axios.get(`http://47.112.214.76:9010/warnData/${id}`).then(response=>{
               this.nowWarnData=response.data.data;                  //怎么区分是直接跳转到页面的，还是通过查询数据跳转的？
                console.log("执行第一个方法："+this.nowWarnData.pestName);
                console.log("传入第二个方法："+this.nowWarnData.pestName);
                this.searchPest(this.nowWarnData.pestName);     //查询当前害虫信息
            }).catch(function (error) {
                console.log(error);
            });
        },
        //t根据日志id查询数据 连续的方法1
        searchWarnDataById1:function (id) {
            axios.get(`http://47.112.214.76:9010/warnData/${id}`).then(response=>{
                this.nowWarnData=response.data.data;                  //怎么区分是直接跳转到页面的，还是通过查询数据跳转的？
               // console.log("执行第一个方法："+this.nowWarnData.pestName);
               // console.log("传入第二个方法："+this.nowWarnData.pestName);
                this.searchPest1(this.nowWarnData.pestName);     //查询当前害虫信息
            }).catch(function (error) {
                console.log(error);
            });
        },
        //t查询某个害虫 根据害虫名 连续的方法2
        searchPest1:function (pestName) {
            //传入害虫id（pest.id），获取数据库的数据添加到nowPest数据中，会显示在页面。
            //axios根据害虫名字查询某个害虫所有信息，存入nowPest中
            axios.post(`http://47.112.214.76:9010/pest/search`,{name:pestName}).then(response=>{
                this.nowPest=response.data.data[0];
                this.nowPesticides=response.data.data[0].pesticides[0];
                this.searchLogToEcharts(this.nowWarnData.pestName);    //查询图表数据
            }).catch(function (error) {
                console.log(error);
            });
        },
        //t将查询到日志的害虫值存入(在点击查询按钮的时候同时触发该方法)
        searchLogToEcharts:function(pestName){
            //console.log("时间"+this.value1[0]+"--"+this.value1[1]);
            axios.post(`http://47.112.214.76:9010/warnData/search`,{pestName:pestName,startTime:this.value1[0]+" 00:00:00",endTime:this.value1[1]+" 23:59:59"}).then(response=>{
                //遍历获取到的数据 (判断数据存在再继续进行)
                let all=new Array();
                all=response.data.data;
                let j=6;let i=0;
                let result=0;let d;
                if (all.length==0){         //若该日志对应的害虫在近7天内没有出现害虫，则数量都为0
                    this.echarts2.data=[0,0,0,0,0,0,0];
                }
                while(i<all.length&&j>-1){
                    d=new Date(all[i].colletionTime).format("yyyy-MM-dd");      //因为后台返回的数据带HH:mm:ss，因此要格式化将日期变成不带时间的形式，才可以进行比较
                    //判断该日期是否存在害虫.(当参数1＜参数2时，返回-1；当参数1=参数2时，返回0；当参数1＞参数2时，返回1)
                    result=compareDate(this.echarts2.xData[j],d);
                    if (result == 0){
                        this.echarts2.data[j]=all[i].number;
                        i++;
                        j--;
                    }else if (result == 1){
                        j--;
                    }else{
                        i++;
                    }
                }
                this.loadDataEcharts();         //重新加载图表，更新数据
            }).catch(function (error) {
                console.log(error);
            })
        },
        //t获取datasearch图表的横坐标
        getxData:function () {
            //获取日期范围
            let end=new Date().format("yyyy-MM-dd");
            let start=new Date();
            start.setTime(start.getTime()-3600 * 1000 * 24 * 6);        //求起始日期，即一周前的日期。
            let s=new Date(start).format("yyyy-MM-dd");
            this.echarts2.xData=getAllDate(s, end);
            //存值，方便后面获取数据
            this.value1.push(s);
            this.value1.push(end);
            //console.log("初始化"+this.value1[0]+"---"+this.value1[1]);
        },
        //t根据农药名称查询农药全部信息
        changePesticides:function (id) {
            axios.get(`http://47.112.214.76:9010/pesticides/${id}`).then(response=>{
                this.nowPesticides=response.data.data;
                console.log(this.nowPesticides);
            }).catch(function (error) {
                console.log(error);
            })
        },
        //element需要的方法
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        //t判断当前数据是否达到危险，控制表格的输出
        tableRowClassName({row, rowIndex}) {
            //判断当前危险等级
            if (row.harmLevel > 1) {
                return 'warning-row';
            }
            return '';
        },
        //t查询某个害虫 根据害虫名
        searchPest:function (pestName) {
            //传入害虫id（pest.id），获取数据库的数据添加到nowPest数据中，会显示在页面。
            //axios根据害虫名字查询某个害虫所有信息，存入nowPest中
            axios.post(`http://47.112.214.76:9010/pest/search`,{name:pestName}).then(response=>{
                this.nowPest=response.data.data[0];
                this.nowPesticides=response.data.data[0].pesticides[0];
            }).catch(function (error) {
                console.log(error);
            });
        },
        //t选择数据日期范围之后进行数据查询(datareport)
        searchdata:function () {
            //根据日期查询数据 value7[0]表示起始日期，value7[1]表示终止日期
            axios.post(`http://47.112.214.76:9010/warnData/search/${this.currentPage}/${this.size}`,{startTime:this.value7[0]+" 00:00:00",endTime:this.value7[1]+" 00:00:00"}).then(response=>{
                // console.log(response.data.data);
                this.logData=response.data.data.rows;
                this.total=response.data.data.total;
                 //console.log(this.logData);
            }).catch(function (error) {
                console.log(error);
            })
        },
        //选择数据日期范围之后进行数据查询(warning)
        searchdata2:function () {
            //根据日期查询数据 value2[0]表示起始日期，value2[1]表示终止日期
            axios.post(`http://47.112.214.76:9010/warnData/search`,{startTime:this.value2[0]+" 00:00:00",endTime:this.value2[1]+" 00:00:00"}).then(response=>{
                // console.log(response.data.data);
                this.warningWarnDate=response.data.data.rows;
            }).catch(function (error) {
                console.log(error);
            })
        },
        //t查询当前页日志信息
        findAllLog:function () {
            //axios.post(`http://47.112.214.76:9010/warnData/search`,{page:this.currentPage,size:this.size}).then(response=>{
            axios.post(`http://47.112.214.76:9010/warnData/search/${this.currentPage}/${this.size}`,{}).then(response=>{
                //console.log(response.data.data);
                this.logData=response.data.data.rows;
               // console.log( this.logData);
                this.total=response.data.data.total;
                //console.log( this.total);
            }).catch(function (error) {
                console.log(error);
            })
        },
        //t根据监控设备名获取设备
        seachEquipmentByName:function () {
            //console.log("ichange");
            axios.post(`http://47.112.214.76:9010/equipment/search`,this.nowEquipment).then(response=>{
                this.nowEquipment=response.data.data[0];
            }).catch(function (error) {
                console.log(error);
            })
        },
        //t获取当前用户的全部监控设备=============用户！
        searchEquip:function () {
            //还没写用户表，登录功能，所以userID先写死
            axios.post(`http://47.112.214.76:9010/equipment/search`,{userId:"敏新"}).then(response=>{
                this.equipment=response.data.data;
            }).catch(function (error) {
                console.log(error);
            })
        },
        //t轮播图文字动态效果
        change:function () {
            this.show=false;
            this.timer =setTimeout(this.tochange,300);
        },
        tochange:function () {
            this.show=true;
        },

/*        //t图片画圈
        drawPicture:function () {
            //遍历画圈
            var x;
            var y;
            for(var i=0;i<this.pictureMessage.length;i++){
                x=this.pictureMessage[i].x;
                y=this.pictureMessage[i].y;
                this.cir(x,y);
            }
        },
        //t画圈单个
        cir:function(x,y) {
            //圆1
            ctx.beginPath();
            ctx.arc(x,y,35,0,Math.PI*2,false);
            ctx.fillStyle="rgba(192,80,77,0.7)";//半透明的红色
            ctx.fill();
            ctx.strokeStyle="rgba(192,80,77,1)";//红色
            ctx.stroke();
        },*/
        //登录
        submit:function () {
            
        }

    },
    created() {

    },
    mounted(){
        //将方法赋值给window，这样外部的js文件就可以使用该方法
        window.loadEcharts=this.loadEcharts;
        window.drawPicture=this.drawPicture;
        window.findAllLog=this.findAllLog;
        window.searchEquip=this.searchEquip;
        window.searchHarmLevel=this.searchHarmLevel;
        window.loadDataEcharts=this.loadDataEcharts;
        window.getxData=this.getxData;
        window.searchWarnDataById1=this.searchWarnDataById1;
    },
    //关闭前执行的方法
    beforeDestroy(){
       //销毁计时器
        clearInterval(this.timer);
    }
});