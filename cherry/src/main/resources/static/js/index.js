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
           },
           currentPage:1,   //当前页
           size:8,     //每页显示条数
           total:20,    //总数据数
           value7:'',       //arrary数组 value7[0]表示起始日期，value7[1]表示终止日期
           startDate:'',    //开始日期
           endDate:'',      //截止日期
           isAnalyze:false, //是否传照片了
           searchLogId:'',   //日志查询的ID
           echartData:{
               text:"害虫数据分析表",
               date:['2020-09-16','2020-09-16','2020-09-16','2020-09-16','2020-09-16','2020-09-17','2020-09-17','2020-09-17','2020-09-17','2020-09-18','2020-09-18','2020-09-17','2020-09-19','2020-09-20','2020-09-21'],
               pest:[{
                   name:'害虫a',
                   data:[820, 932, 901, 934,120, 132,  210,100,410,120, 132, 101, 134, 90, 230, 210,100, 1290, 1330, 1320,101, 134, 90, 230, 2]
               }],
               startDate:'2019-09-16',
               endDate:'2019-09-21',
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
               data:        [
                   {
                       name: '害虫a',
                       type: 'line',
                       stack: '总量',
                       markLine:{
                           data:''
                       },
                       smooth:true,  //这个是把线变成曲线
                       data: [120, 132, 101, 134, 90, 230, 210,100,410,120, 132, 101, 134, 90, 230, 210,100,20,304,20,40,1021,302,2423]
                   },
                   {
                       name: '害虫b',
                       type: 'line',
                       stack: '总量',
                       smooth:true,  //这个是把线变成曲线
                       data: [220, 182, 191, 234,120, 132, 101, 134, 90, 230, 210,100,410, 290, 330, 310,120, 132, 101, 134, 90, 230, 210,100]
                   },
                   {
                       name: '害虫c',
                       type: 'line',
                       stack: '总量',
                       smooth:true,  //这个是把线变成曲线
                       data: [150, 232, 201, 154, 190, 330, 120, 132, 101, 134, 90, 230, 210,100,410,120, 132, 101, 134, 90, 230, 210,100,410]
                   },
                   {
                       name: '害虫d',
                       type: 'line',
                       stack: '总量',
                       smooth:true,  //这个是把线变成曲线
                       data: [320,120, 132, 120, 132, 101, 134, 90, 230, 210,100,410,101, 134, 90, 230, 210,100, 332, 301, 334, 390, 330, 320]
                   },
                   {
                       name:'',
                       data:'',
                       type:'line',
                       markLine: {
                           silent: true,
                           data: [{
                               yAxis: 500,
                               label:{
                                   formatter:'危害等级E'
                               }
                           }, {
                               yAxis: 1000,
                               label:{
                                   formatter:'危害等级D'
                               }
                           }, {
                               yAxis: 1500,
                               label:{
                                   formatter:'危害等级C'
                               }
                           }, {
                               yAxis: 2000,
                               label:{
                                   formatter:'危害等级B'
                               }
                           }, {
                               yAxis: 2500,
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
           pestData:[{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。",
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               brief:"桑白蚧属同翅目，盾蚧科。雌成虫橙黄或橙红色，体扁平卵圆形，长约1毫米，腹部分节明显。雌介壳圆形，直径2-2.5毫米，略隆起，有螺旋纹，灰白至灰褐色，壳点黄褐色，在介壳中央偏旁。雄成虫橙黄至橙红色，体长 桑白蚧体长0.6-0.7毫米，仅有翅1对。雄介壳细长，白色，长约1毫米，背面有3条纵脊，壳点橙黄色，位于介壳的前端。卵椭圆形，长径仅0.25-0.3毫米。初产时淡粉红色，渐变淡黄褐色，孵化前橙红色。初孵若虫淡黄褐色，扁椭圆形、体长0.3毫米左右，可见触角、复眼和足，能爬行，腹末端具尾毛两根，体表有绵毛状物遮盖。脱皮之后眼、触角、足、尾毛均退化或消失，开始分泌蜡质介壳。",
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },{
               id:1,
               name:"嘉志",
               picture:"../static/img/pestPicture",      //存图片
               describe:"雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic:"在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve:"农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
                   "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。"
           },],
           nowPest: {
               id: 1,
               name: "嘉志",
               brief: "桑白蚧属同翅目，盾蚧科。雌成虫橙黄或橙红色，体扁平卵圆形，长约1毫米，腹部分节明显。雌介壳圆形，直径2-2.5毫米，略隆起，有螺旋纹，灰白至灰褐色，壳点黄褐色，在介壳中央偏旁。雄成虫橙黄至橙红色，体长 桑白蚧体长0.6-0.7毫米，仅有翅1对。雄介壳细长，白色，长约1毫米，背面有3条纵脊，壳点橙黄色，位于介壳的前端。卵椭圆形，长径仅0.25-0.3毫米。初产时淡粉红色，渐变淡黄褐色，孵化前橙红色。初孵若虫淡黄褐色，扁椭圆形、体长0.3毫米左右，可见触角、复眼和足，能爬行，腹末端具尾毛两根，体表有绵毛状物遮盖。脱皮之后眼、触角、足、尾毛均退化或消失，开始分泌蜡质介壳。",
               enemy: "桑白蚧的天敌种类较多，桑白蚧褐黄蚜小蜂（Prospaltella beriosei How）是寄生性天敌中的优势种，红点唇瓢虫（Chilocorus kuwanae Silvestri）和日本方头甲（Cybocophalus nipponicus Endr&Ouml;dy-Younga）则是捕食性天敌中的优势种，它们是在自然界中控制桑白蚧的有效天敌。",
               picture: "../static/img/pestPicture.jpg",      //存图片
               describe: "雌成虫体长0.9-1.2毫米，淡黄至橙黄色。介壳灰白至黄褐色，有螺旋形纹，两点黄褐色，偏生。雄体0.6-0.7毫米长，翅展1.8毫米，触角10节，念珠状。前翅卵形，被细毛，灰白色；后翅退化为平衡棒。初孵若虫淡黄褐色，偏椭圆形，0.3毫米，眼、触角、足俱全，腹末有2根尾毛；至2龄，眼、触角、足皆退化，两眼间具2腺孔，分泌绵毛状蜡丝覆盖虫体。",     //害虫介绍
               characteristic: "在北方地区年生2代，以第2代受精雌虫于枝条上越冬，寄主萌动时开始吸食危害。5月中旬为卵孵始盛期，分散在2-5年生枝条上固着取食。分叉处和阴面居多，6-7天后开始分泌苗毛状蜡丝，形成介壳。第一代若虫期长达40-50天，第二代若虫期30-40天，发生期长，跨度大。",
               solve: "农业防治：果树休眠期用硬毛刷，清除枝条上的越冬雌虫，剪除受害枝条。\n" +
               "药剂防治：清除越冬雌虫后，用5%矿物油乳剂喷洒杀虫；生长期、越冬虫分散转移期，大约7天，连续喷2次药。用20%灭扫利乳油4000倍液或20%速灭杀丁乳油3000倍液，或50%久效磷乳油1500-2000倍液。药液中混入0.3%-0.5%机油乳剂，可提高效果。",  //当前显示的害虫
               appearlaw: "我国各地的发生代数不同，在华北地区一年发生2代，在山东省一年发生2-3代，在浙江省一年发生3代，在广东省一年发生5代。均以受精雌成虫在二年生以上的枝条上群集越冬。翌春果树萌芽时，越冬成虫开始吸食汁液，虫体随之膨大。在北方果产区，越冬成虫从4月下旬开始产卵，5月中旬为产卵盛期，每头雌虫产卵250-300粒。卵于5月上旬开始孵化，孵化盛期在5月中、下旬。初孵若虫分散爬行到2-5年生枝条上取食，以枝条分权处和阴面较多。7-10天后，便固定在枝条上，分泌绵毛状蜡丝，逐渐形成介壳。第1代若虫期为40-50天，但爬行期很短。从6月下旬开始羽化第1代成虫，盛期在7月上、中旬。成虫继续产卵于介壳下，卵期10天左右。第2代若虫发生在8月份，若虫期为30-40天。9月份出现雄成虫，雌雄交尾后，雄虫死亡，雌虫继续为害至9月下旬。此后，停止取食，开始越冬 [1]  。",
           },
           fileList: [{name: '', url: ''}],
           logData:[{
               id:0,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:8,
               confidence:100,
               updateTime:"2018-12-19",
           },{
               id:0,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:3,
               confidence:100,
               updateTime:"2018-12-19",
           },{
               id:0,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:0,
               confidence:100,
               updateTime:"2018-12-19",
           },{
               id:0,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:5,
               confidence:100,
               updateTime:"2018-12-19",
           },{
               id:7,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:1,
               confidence:100,
               updateTime:"2018-12-19",
           },{
               id:0,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:5,
               confidence:100,
               updateTime:"2018-12-19",
           },{
               id:2,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:2,
               confidence:100,
               updateTime:"2018-12-19",
           },{
               id:0,
               collectionTime:"2018-12-07",
               pestName:"嘉志",
               harmLevel:1,
               confidence:100,
               updateTime:"2018-12-19",
           }],
           show: true,
           timer:'',    //定时器
           //loading: true,
           nowWarnData:{},  //当前查询的日志信息
       }
   },
    methods:{
       //t加载图表数据
        loadEcharts(){
            var option={
                title: {
                    text:this.echartData.text,
                    //  text:'hello'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    data:this.echartData.pest.name,
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
                    data: this.echartData.date,
                    //data:[100,200,300,400,500]
                },
                yAxis: {
                    splitLine: {
                        show: false
                    }
                },
                series: this.echartData.data,
            };
            var mycharts=echarts.init(document.getElementById("mycharts"));
            mycharts.setOption(option);
        },
       //t查询某个害虫
        searchPest:function (pestName) {
            //传入害虫id（pest.id），获取数据库的数据添加到nowPest数据中，会显示在页面。
            this.nowPest={};  //清空原先的数据
            this.nowPest.pestName=pestName;
            //axios根据害虫名字查询某个害虫所有信息，存入nowPest中
            axios.post(`http://47.112.214.76:9010/pest/search`,this.nowPest).then(response=>{
                this.nowPest=response.data.data[0];
            }).catch(function (error) {
                console.log(error);
            })
        },
        //根据日志id查询数据
        searchWarnDataById:function (id) {
          axios.get(`http://47.112.214.76:9010/warnData/${id}`).then(response=>{
              this.nowWarnData=response.data.data;                  //怎么区分是直接跳转到页面的，还是通过查询数据跳转的？
          }).catch(function (error) {
              console.log(error);
          })
        },
        //选择数据日期范围之后进行数据查询
        searchdata:function () {
            //根据日期查询数据 value7[0]表示起始日期，value7[1]表示终止日期
            console.log(this.value7)
        },
        //查询所有害虫
        findAllPest:function () {

        },
        //t查询当前页日志信息
        findAllLog:function () {
            axios.post(`http://47.112.214.76:9010/warnData/search/${this.currentPage}/${this.size}`,{}).then(response=>{
               // console.log(response.data.data);
                this.logData=response.data.data.rows;
                this.total=response.data.data.total;
            }).catch(function (error) {
                console.log(error);
            })
        },
        //查询特定日志信息
        findLogByDate:function (t) {
            this.startDate=t[0];
            this.endDate=t[1];
            //通过日期获取数据返回到logData中

        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        //t判断当前数据是否达到危险，控制表格的输出
        tableRowClassName({row, rowIndex}) {
            //判断当前危险等级
            if (row.harmLevel > 3) {
                return 'warning-row';
            }
            return '';
        },
        //更改图片触发的方法,修改show的值，使图片弹出
        changePicture:function () {
            this.show=!this.show;
            console.log(this.show);
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
        //t轮播图文字动态效果
        change:function () {
            this.show=false;
            this.timer =setTimeout(this.tochange,300);
        },
        tochange:function () {
            this.show=true;
        },
        //t图片画圈
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
        },
        //登录
        submit:function () {
            
        }

    },
    created() {
      //  this.loadEcharts();
    },
    mounted(){
        //将方法赋值给window，这样外部的js文件就可以使用该方法
        window.loadEcharts=this.loadEcharts;
        window.drawPicture=this.drawPicture;
        window.findAllLog=this.findAllLog;
    },
    //关闭前执行的方法
    beforeDestroy(){
       //销毁计时器
        clearInterval(this.timer);
    }
});