/**
 * 基础本地缓存数据类
 * 处理本都数据的映射
 * 只关心数据的本地储存和取出
 * 都是实时的
 */
export default class Storage {
    constructor(key,value,model={}){
        this.key = key;
        this.value = value;
        this.model = model || {};
    }
    /**
     * 写入数据,保存自身(实时)
     * return void
     */
    save(){
        const {key,model,value} = this;
        const data = {
            value:value,
            type:typeof value,
            name:'storages-js',
        };
        try {
            model.set(key,JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * 拿取数据(实时)
     * return void
     */
    take(){  
        const {key,model} = this;
        let value = undefined;
        try {
            const data = JSON.parse(model.get(key));
            if(!data) throw '数据转换失败，或者数据已丢失';
            value = data.value;
        } catch (error) {
            console.error(error);
        }
        this.value = value;
    }
}