> **storages-js**

## 介绍

一款简单，轻量的前端储存工具，压缩后不超过 3kb。

#### 安装

```javascript
npm install storages-js
```

#### 使用方式

```javascript
import StorageS form 'storages-js';
let storages = new StorageS('test',undefined,{modelName:'local'});
console.log(storages.value);  //undefined
storages.value = {a:1};  //相应的保存在缓存中
console.log(storages.value);  //{a:1}
```

#### 使用例子

```javascript
import StorageS form 'storages-js';
let storages = new StorageS('test',0,{
    modelName:'local',
    beforSet(newValue){
        return newValue + 1;
    },
    beforGet(newValue){
        return newValue - 1;
    },
});
```
