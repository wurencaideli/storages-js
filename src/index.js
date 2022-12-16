import {allModel} from "./common/Tools";
import Storage from "./common/Storage";

/**
 * 创建一个实例
 * @param  {String} key    存储键
 * @param  {[type]} value  初始值
 * @param  {Object} option 配置
 * option部分参数
 * model：自定义存储模式
 * modelName：存储模式名
 * isRealTime：实时性的
 */
const stateKey = Symbol('StateKey');  //状态键
export default class StorageS{
    constructor(key,value,option={}){
        let {
            model,
            modelName,
            isRealTime=false,
            beforSet,  //写入之前调用
            beforGet,  //获取之前调用
        } = option;
        {
            //参数验证
            if(!key) throw `key不能为空`;
            if(!model){  //优先使用自定义的mode
                model = allModel[modelName];
            }
            if(!model) throw `没有 ${modelName} 此模式。已有模式local,session,uni,wx`;
            if(typeof model !== 'object') throw `没有找到储存模式对象`;
        }
        this._value_ = undefined;  //用作数据转换
        this.key = key;
        this.beforSet = beforSet;
        this.beforGet = beforGet;
        this.model = model;
        this[stateKey] = 'active';
        this.isRealTime = isRealTime;
        this.storage = new Storage( //源数据
            key,
            value,
            model,
        );
        {
            //数据初始化
            const isInit = model.get(key);
            if(!!isInit){  //表示已经初始化过了
                this.take();
            }else{
                this.setValue(value);
            }
        }
    }
    /**
     * 强制保存
     * return void
     */
    save(){
        this.checkState();
        this.storage.value = this._value_;
        this.storage.save();
    }
    /**
     * 拿取数据，保证数据的映射关系
     * return void
     */
    take(){
        this.checkState();
        this.storage.take();
        this._value_ = this.storage.value;
    }
    /**
     * 刷新实例，重新从缓存中获取数据
     * return void
     */
    refresh(){
        this.checkState();
        this.take();
    }
    /**
     * 销毁，清空
     * 该操作是清空该键所对应的数据
     * 如果该键有多个实例对象的话不建议使用
     * return void
     */
    destroy(){
        this[stateKey] = 'destroy';
        this.model.remove(this.key);
    }
    /**
     * 获取所有keys
     */
    keys(){ 
        return this.model.keys();
    }
    /**
     * 检查状态
     * return void
     */
    checkState(){  
        if(this[stateKey] !== 'active'){
            throw `该实例已销毁，数据已被清空`;
        }
    }
    /**
     * 写入数据
     * return void
     */
    setValue(newValue){
        this.checkState();
        if(typeof this.beforSet === 'function'){
            newValue = this.beforSet(newValue);
        }
        this._value_ = newValue;
        this.save();
    }
    /**
     * 获取数据
     */
    getValue(){
        this.checkState();
        if(this.isRealTime){  //是实时性的话每次访问就刷新一次，性能不是很好
            this.take();
        }
        let value = this._value_;
        if(typeof this.beforGet === 'function'){
            value = this.beforGet(value);
        }
        return value;
    }
    set value(newValue){
        this.setValue(newValue);
    }
    get value(){
        return this.getValue();
    }
}
/**
 * 测试例子
 * @type {String}
 */
// new StorageS('test',undefined,{modelName:'local'});
// new StorageS('test',0,{
//     modelName:'local',
//     beforSet(newValue){
//         return newValue + 1;
//     },
//     beforGet(newValue){
//         return newValue - 1;
//     },
// });