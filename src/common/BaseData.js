/*jshint esversion: 6 */
/**
 * 基础缓存数据
 */
export default class BaseData {
    constructor(key,value,option={}){
        this.key = key;
        this.value = value;
        this.model = option.model;
    }
    /**
     * 写入数据,保存自身(实时)
     */
    setData(){
        const {key,model,value} = this;
        let data = {
            value:value,
            type:typeof value,
            name:'storages-js',
        };
        model.set(key,JSON.stringify(data));
        return data.value;
    }
    /**
     * 获取数据(实时)
     * @return {[type]} [description]
     */
    getData(){  
        const {key,model} = this;
        const data = JSON.parse(model.get(key));
        if(!data) throw '找不到数据';
        return data.value;
    }
}