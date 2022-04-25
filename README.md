> **storages-js 0.0.2**

## 介绍

一款简单，轻量的前端储存工具

#### 使用方式

```javascript
import {create} form 'storages-js';
let storages = create('test',undefined,{modelName:'local'});
console.log(storages.value);  //undefined
storages.value = {a:1}; 
console.log(storages.value);  //{a:1}
```

