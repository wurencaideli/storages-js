/*jshint esversion: 6 */
import {getModels} from "./common/Tools";
import BaseData from "./common/BaseData";

/**
 * 创建一个实例
 * @param  {String} key    存储键
 * @param  {[type]} value  初始值
 * @param  {Object} option 配置
 */
export function create(value,key='',option={}){
    if(!key) throw `key不能为空`;
    let {modelName} = option;
    let model = getModels()[modelName];
    if(!model) throw `没有 ${modelName} 此模式。已有模式local,session,uni,wx`;
    let dataOrigin = new BaseData( //源数据
        key,
        value,
        {
            model,
        },
    );
    //初始化
    let hasData = model.get(key);
    if(!hasData){  //表示并未初始化
        dataOrigin.setData();
    }else{
        dataOrigin.value = dataOrigin.getData();
    }
    const stateKey = Symbol('StateKey');  //状态键
    let data = {
        value:dataOrigin.value,
        [stateKey]:'active',
        save(){  //强制保存
            checkState();
            dataOrigin.setData();
        },
        refresh(){  //刷新实例，重新从缓存中获取数据
            checkState();
            dataOrigin.value = dataOrigin.getData();
        },
        destroy(){  //销毁，清空
            data[stateKey] = 'destroy';
            model.remove(key);
        },
        keys(){  //获取所有keys
            return model.keys();
        },
    };
    function checkState(){  //检查状态
        if(data[stateKey] != 'active'){
            throw `该实例已被销毁`;
        }
    }
    Object.defineProperty(data, 'value', {
        set(newValue){
            checkState();
            dataOrigin.value = newValue;
            dataOrigin.setData();
        },
        get(){
            checkState();
            return dataOrigin.value;
        },
    });
    return data;
}
/**
 * test
 * @type {String}
 */
// create('test',undefined,{modelName:'local'});