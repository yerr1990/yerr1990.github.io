/**
 * @author  谢国亮
 * 定义对平台数据处理方法
 */

/**
 *
 * author 谢国亮
 * @constructor
 */

function ProgressArray (){
    this.progressMap=new Map();                  //进度点点对象集合
    this.rate=0;                                 //array中所有isPass为true的rate之和
    this.progressStr=[];                         //array中所有isPass为true的id
    this.isUpdate=false;                         //是否更新
};

/**
 *
 * 定义进度基本数据对象
 * @param id
 * @param rate
 * @constructor
 */
function ProgressObject(id,rate){
    this.id=id;                                     //进度点编号
    this.rate=rate;                                 //所占比例
    this.isPass=false;                              //该进度点是否通过
    this.handleArray=[];                            //关联动作项集合
};

/**
 *
 * 更新progressStr
 */
ProgressArray.prototype.sumProgressStr=function(){
    var progressArray=[];
    if(this.isUpdate) {
        var progressObject=function(id){
            this.id=id;
        };
        this.progressMap.eachMap(function (key, value) {
            if(value.isPass){
                progressArray.push(new progressObject(value.id));
            }
        });
        if(progressArray!=[]){
            this.progressStr=progressArray;
        }
        this.isUpdate=false;
    }
};

/**
 *
 * 进度点汇总方法
 */
ProgressArray.prototype.sumRate=function(){
    var sum=0;
    this.progressMap.eachMap(function(key,value){
        if(value.isPass){
            sum+=parseFloat(value.rate);
        }
    });
    this.rate=sum;
};

/**
 *
 * 触发进度点
 * @param progressID
 */
ProgressArray.prototype.setProgress=function(progressID){
    if(this.progressMap.find(progressID)){
        this.progressMap.get(progressID).isPass=true;
        this.isUpdate=true;
    }
};

/**
 * 触发动作点
 * @param handleID
 * @param handleObject
 */
//ProgressArray.prototype.setHandle=function(handleID,handleObject){
//    var preIsAction,
//        isActioned,
//        progressObject={};
//    progressObject=this.progressMap.get(handleObject.actionMap.get(handleID).PID);
//    if(typeof progressObject=="object"){
//        for(var i=0;i<progressObject.handleArray.length;i++){
//            if(progressObject.handleArray[i].id==handleID){
//                preIsAction=progressObject.handleArray[i].isAction;
//                progressObject.handleArray[i].isAction=true;
//                isActioned=true;
//            }
//        }
//        if(!preIsAction && isActioned){
//            for(var j=0;j<progressObject.handleArray.length;j++){
//                if(progressObject.handleArray[j].isAction==false){
//                    return;
//                }
//            }
//            progressObject.isPass=true;
//            this.isUpdate=true;
//        }
//    }
//};

/**
 *
 * 定义试题数据对象paper
 * @constructor
 */
function Paper(){
    this.scoreMap=new Map();                        //得分点对象集合
    this.questionArray=[];                          //试题对象集合
    this.exclusiveArray=[];                         //互斥得分项集合
    this.rate=0;                                    //得分
    this.scoresStr=[];                              //scoreArray数组转换的json
    this.isUpdate=true;                            //scoresStr是否已更新
}

/**
 * 定义得分基本数据对象scoreObject
 * @param id
 * @param rate
 * @param questionID
 * @constructor
 */
function ScoreObject(id,rate,questionID){
    this.id=id;                                     //得分点编号
    this.rate=rate;                                 //所占比例
    this.isRight=false;                             //该得分点是否通过
    this.questionID=questionID;                     //该得分点是否通过
    this.optionArray=[];                            //选项数组
    this.handleArray=[];                            //关联动作项集合
}

/**
 *
 * @param id
 * @param rate
 * @param type
 * @param description
 * @param kp
 * @param remark
 * @constructor
 */
function QuestionObject(id,rate,type,description,kp,remark){
    this.id=id;                                         //试题编号
    this.rate=rate;	                                    // 所占比例
    this.type=type;	                                    //题型
    this.description=description;                       //题干
    this.optionArray=[];	                            //选项数组
    this.kp=kp;	                                        //知识点
    this.remark=remark;	                                //备注
    this.questionArray=[];	                            //子试题数组
}

/**
 *
 * 定义互斥得分项对象exclusiveObject
 * @param idArray
 * @param priorityId
 * @constructor
 */
function ExclusiveObject(idArray,priorityId){
    this.idArray=idArray;                           //得分项数组
    this.priorityId=priorityId;                     //
}

/**
 *
 * 定义题干基本数据对象descriptionObject
 * @param tdArray
 * @param optionArray
 * @constructor
 */
function DescriptionObject(tdArray,optionArray){
    this.tdArray = tdArray;                         //数组中每一项表示一个td中的内容
    this.optionArray = optionArray;	                    //数组中每一项表示为一个td；td内显示option
}

/**
 *
 * 定义选项基本数据对象optionObject
 * @param id
 * @param description
 * @param isRight
 * @constructor
 */
function OptionObject(id,description,isRight){
    this.id = id;	                                    //选项编号
    this.description = description;	                    //描述
    this.isRight = isRight;	                            //是否是正确答案
    this.optionArray = [];	                            //子选项集合
}

/**
 *
 * @param linkOptionID
 * @param description
 * @param isSub
 * @constructor
 */
function DesOptionObject(linkOptionID,description,isSub){
    this.linkOptionID=linkOptionID;                         //关联选项ID
    this.description = description;	                        //描述
    this.isSub = isSub;

}


/**
 *  计算rate
 */

Paper.prototype.sumRate=function(){
    var sumRate= 0,score= 0,flag=false;
    this.scoreMap.eachMap(function(key,value){
            if(value.rate!="-5"){
                sumRate+=Number(value.rate);
            }
    });
    this.scoreMap.eachMap(function(key,value){
        if(value.isRight && value.rate!="-5"){

            score+=parseFloat(value.rate/sumRate)*totalScore;
        }
        if(value.isRight && value.rate=="-5"){
            flag=true;
        }else{
            flag=false;
        }

    });
    if(flag){
        score=score.toFixed(2)-5;
    }
    this.rate=score.toFixed(2);
    this.rate=this.rate<0 ? 0: this.rate;
    //计算互斥得分项有没有同时得分,如果有，在rate中扣除优先级较低的得分项比例；
    if(this.exclusiveArray.length){
        var priorityId,flag=true;
        for(var i=0;i<this.exclusiveArray.length;i++){
            for(var j=0;j<this.exclusiveArray[i].idArray.length;j++){
                if(!this.scoreMap.get(this.exclusiveArray[i].idArray[j]).isRight){
                    flag=false;
                }
            }
            if (flag) {
                for(var k=0;k<this.exclusiveArray[i].idArray.length;k++) {
                    this.rate - this.scoreMap.get(this.exclusiveArray[i].idArray[k]).rate;
                }
            }
        }
    }
    this.rate<0?this.rate=0:null;
};

/**
 * 更新scoresStr
 */
Paper.prototype.sumScoresStr=function(){
    var scoreArray=[];
    if(this.isUpdate) {
        var scoreObject=function(id,isRight,questionID,optionArray,handleArray){
            this.id=id;
            this.isRight=Number(isRight);
            this.questionID=questionID;
            this.optionArray=[];
            this.handleArray=[];
            if(optionArray.length){
                for (var i = 0; i < optionArray.length; i++) {
                    var obj={};
                    obj.id = optionArray[i].id;
                    obj.optionArray=[];
                    if(optionArray[i].optionArray.length){
                        for(var k=0;k<optionArray[i].optionArray.length;k++){
                            obj.optionArray.push(optionArray[i].optionArray[k].id) ;
                        }
                    }
                    this.optionArray.push(obj);
                }
            }
            if(handleArray.length){
                for(var j=0;j<handleArray.length;j++){
                    var obj={};
                    obj.id=handleArray[j].id;
                    obj.isAction=Number(handleArray[j].isAction);
                    this.handleArray.push(obj)
                }
            }

        };
        this.scoreMap.eachMap(function (key, value) {
            scoreArray.push(new scoreObject(value.id,value.isRight,value.questionID,value.optionArray,value.handleArray));
        });
        if(scoreArray!=[]){
            this.scoresStr=scoreArray;
        }
        this.isUpdate=false;
    }
};

/**
 *
 * @param questionID
 * @param optionIDs
 */
Paper.prototype.setQuestion=function(questionID,optionIDs) {
    var optionIds = optionIDs.split(",");
    var scoreId, array = [], rightAns = [],rightAnsMap=new Map();
    this.scoreMap.eachMap(function (key, value) {
        if (value.questionID == questionID) {
            scoreId = value.id;
        }
    });
    if (scoreId) {
        var scoreObject = this.scoreMap.get(scoreId);
        var questionArray = this.questionArray;
        var optionMap = new Map();
        ~function findQuestion(questionArray) {
            for (var i = 0; i < questionArray.length; i++) {
                if (questionArray[i].id == questionID) {
                    for (var j = 0; j < questionArray[i].optionArray.length; j++) {
                        if (questionArray[i].optionArray[j].isRight == "1") {
                            rightAnsMap.put(questionArray[i].optionArray[j].id,questionArray[i].optionArray[j].id);
                        }
                    }
                    findOption(questionArray[i].optionArray);

                } else {
                    if (questionArray[i].questionArray.length != "0") {
                        arguments.callee(questionArray[i].questionArray);
                    }
                }
            }
        }(questionArray);
        //function cyclicQuestion(questionArray) {
        //    for (var i = 0; i < questionArray.length; i++) {
        //        for (var j = 0; j < questionArray[i].optionArray.length; j++) {
        //            if (questionArray[i].optionArray[j].isRight == "1") {
        //                rightAnsMap.put(questionArray[i].optionArray[j].id,questionArray[i].optionArray[j].id);
        //            }
        //        }
        //        findOption(questionArray[i].optionArray);
        //        if (questionArray[i].questionArray.length != "0") {
        //            arguments.callee(questionArray[i].questionArray);
        //        }
        //    }
        //}

        function findOption(optionArray) {
            for (var i = 0; i < optionIds.length; i++) {
                for (var j = 0; j < optionArray.length; j++) {
                    if (optionArray[j].id == optionIds[i]) {
                        optionMap.put(optionArray[j].id, optionArray[j]);
                    }
                    if (optionArray[j].optionArray.length != "0") {
                        for(var k=0;k<optionArray[j].optionArray.length;k++){
                            if (optionArray[j].optionArray[k].isRight == "1") {
                                rightAnsMap.put(optionArray[j].optionArray[k].id,optionArray[j].optionArray[k].id);
                            }
                        }
                        arguments.callee(optionArray[j].optionArray);
                    }

                }
            }
        }
        rightAnsMap.eachMap(function(key,value){
            rightAns.push(value);
        });

        optionMap.eachMap(function (key, value) {
            array.push(value);
        });
        scoreObject.optionArray = array.concat();
        //判断用户选择是否正确
        var flag = true;
        for (var i = 0; i < rightAns.length; i++) {
            if (!optionMap.find(rightAns[i])) {
                flag = false;
            }
        }
        if (flag && optionMap.size() == rightAns.length) {
            if (!scoreObject.isRight) {
                scoreObject.isRight = true;
            }
        } else {
            if(scoreObject.isRight){
                scoreObject.isRight = false;
            }
        }
    }
    this.isUpdate = true;
    console.log(scoreObject.id+"-----"+scoreObject.isRight+"%%%%"+scoreObject.rate);
};

/**
 *
 * 定义操作数据对象handleArray
 * @constructor
 */
function HandleArray(){
    this.handleArray=[];                        //操作对象集合，记录用户操作，只进行累加
    this.actionMap=new Map();                   //对应xml中动作表动作
    this.valueMap=new Map();                    //作为条件比对的数值对象集合
    this.handleStr=[];                          //handleArray数组转换的json
    this.isUpdate=false;                        //handleStr是否已更新
}

/**
 *
 * 定义动作基本数据对象handleObject
 * @constructor
 */
function HandleObject(id,score){
    this.id=id;                                         //动作编号
    this.time="";                                        //动作时间
    this.isAction=false;                                //是否触发动作
    this.score=score;                                   //得分
    this.conditionMap=new Map();                        //关联判定条件计划集合
    this.PID="";                                        //
    this.SID="";
}

/**
 *
 * 定义条件数据对象
 * @param id
 * @param linkVID
 * @param cdt
 * @param cdtID
 * @param cdtValue
 * @constructor
 */
function ConditionObject(id,linkVID,cdt,cdtID,cdtValue){
    this.id = id;	                                    //条件编号
    this.linkVID = linkVID;	                            //关联数值对象ID
    this.cdt =cdt;	                                    //条件方式
    this.cdtID = cdtID;	                                //比对数值对象ID
    this.cdtValue = cdtValue;	                        //比对数值
    this.linkHID="";                                    //关联动作handleID
    this.isAction=false;
}


/**
 * 添加动作
 * @param handleID
 * @param progress
 * @param paper
 * @param time
 * @param flag
 * @param sub
 */

HandleArray.prototype.setHandle=function(handleID,progress,paper,time,flag,sub){
    flag=flag||0;
    sub=sub||0;
    var preIsAction, paperFlag=true,progressFlag=true;
    if(handleID=="")return;
    if(this.actionMap.find(handleID)){
        this.actionMap.get(handleID).conditionMap.eachMap(function(key,value){
                value.isAction=false;
        });
        preIsAction=this.actionMap.get(handleID).isAction;
        this.actionMap.get(handleID).isAction=true;
        this.actionMap.get(handleID).time=time;
         if(sub!='1'){
             this.handleArray.push(this.actionMap.get(handleID));
         }
        this.isUpdate=true;
        if(flag=='0'){
            if(paper.scoreMap.find(this.actionMap.get(handleID).SID)){
                if(!preIsAction){
                    var handleArray=paper.scoreMap.get(this.actionMap.get(handleID).SID).handleArray;
                    for(var i=0;i<handleArray.length;i++){
                        if(!handleArray[i].isAction){
                            paperFlag=false;
                        }
                    }
                    if(paperFlag){
                        paper.scoreMap.get(this.actionMap.get(handleID).SID).isRight=true;

                        //this.actionMap.get(handleID).score=paper.scoreMap.get(this.actionMap.get(handleID).SID).score;
                        paper.isUpdate=true;
                    }
                }
            }
        }
        if(sub=='1'){
            if(paper.scoreMap.find(this.actionMap.get(handleID).SID)){
                this.actionMap.get(handleID).isAction=false;
                paper.scoreMap.get(this.actionMap.get(handleID).SID).isRight=false;
                paper.isUpdate=true;
            }
        }


        if(progress.progressMap){
            if(progress.progressMap.find(this.actionMap.get(handleID).PID)){
                if(!preIsAction){
                    var prehandleArray=progress.progressMap.get(this.actionMap.get(handleID).PID).handleArray;
                    for(var i=0;i<prehandleArray.length;i++){
                        if(!prehandleArray[i].isAction){
                            progressFlag=false;
                        }
                    }
                    if(progressFlag){
                        progress.setProgress(this.actionMap.get(handleID).PID);
                    }
                }
            }
        }
    }
};

/**
 * 更新handle
 */
HandleArray.prototype.sumHandleStr=function(){
    var handleArray=[];
    if(this.isUpdate) {
        var handleObject=function(id,time,score){
            this.id=id;
            this.time=time;
            this.score=score;
        };
        for(var i=0;i<this.handleArray.length;i++){
            handleArray.push(new handleObject(this.handleArray[i].id,this.handleArray[i].time,this.handleArray[i].score));
        }
        if(handleArray!=[]){
            this.handleStr=handleArray;
        }
        this.isUpdate=false;
    }
};

/**
 *
 * @param id
 * @param description
 * @constructor
 */
function ValueObject(id,description){
    this.id=id;                                         //数值对象编号
    this.description=description;                       //描述
    this.value="";                                   //默认值
    this.cdtMap=new Map();                              //用户条件condition
}

/**
 *
 * 触发数组对象变更数值
 * @param id
 * @param value
 */
HandleArray.prototype.setCondition=function(id,value){
    var arrayHID="",vid="";
    var valueObject=this.valueMap,actionMap=this.actionMap;

    if(valueObject.find(id)){
        valueObject.get(id).value=value;

        valueObject.get(id).cdtMap.eachMap(function(key,value){
            var tFlag=false;
            if('cdtValue' in value){
                var cdtValueArray =[];
                if(value.cdtValue){
                    cdtValueArray=value.cdtValue.split(",");
                }
                for(var i=0;i<cdtValueArray.length;i++){
                    if(cdtValueArray[i]==valueObject.get(id).value){
                        tFlag=true;
                    }
                }
                value.isAction=tFlag;
            }
            var flag=false;

            if(value.isAction){
                actionMap.get(value.linkHID).conditionMap.eachMap(function(ckey,cvalue){
                    if("cdtID" in cvalue){
                        if(valueObject.find(cvalue.cdtID)){
                            if(valueObject.get(cvalue.cdtID).value!=valueObject.get(cvalue.linkVID).value){
                                cvalue.isAction=true;
                            }else{
                                cvalue.isAction=false;
                            }
                        }
                    }
                    if(cvalue.isAction!=true){
                        flag=true;
                    }
                });
                if(!flag){

                        arrayHID=value.linkHID;
                }
            }
        });
    }
   return arrayHID;
};

