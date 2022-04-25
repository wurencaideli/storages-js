/*jshint esversion: 6 */
import {allModel} from "./common/Tools";
import BaseData from "./common/BaseData";

/**
 * 创建一个实例
 * @param  {[type]} value  初始值
 * @param  {String} key    存储键
 * @param  {Object} option 配置
 * option部分参数
 * model：自定义存储模式
 * modelName：存储模式名
 * realTime：实时性的
 */
export function create(value,key='',option={}){
    if(!key) throw `key不能为空`;
    let {model,modelName,realTime=false} = option;
    if(!model){  //优先使用自定义的mode
        model = allModel[modelName];
    }
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
        save(){  //强制保存(基本不会用到)
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
            if(realTime){  //是实时性的话每次访问就刷新一次，性能不是很好
                dataOrigin.value = dataOrigin.getData();
                return dataOrigin.value;
            }else{
                return dataOrigin.value;
            }
        },
    });
    return data;
}
/**
 * test
 * @type {String}
 */
// create(undefined,'test',{modelName:'local'});