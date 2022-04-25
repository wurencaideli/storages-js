(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["storages-js"] = factory();
	else
		root["storages-js"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var _common_Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _common_BaseData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/*jshint esversion: 6 */



/**
 * 创建一个实例
 * @param  {String} key    存储键
 * @param  {[type]} value  初始值
 * @param  {Object} option 配置
 */
function create(value,key='',option={}){
    if(!key) throw `key不能为空`;
    let {modelName} = option;
    let model = (0,_common_Tools__WEBPACK_IMPORTED_MODULE_0__.getModels)()[modelName];
    if(!model) throw `没有 ${modelName} 此模式。已有模式local,session,uni,wx`;
    let dataOrigin = new _common_BaseData__WEBPACK_IMPORTED_MODULE_1__["default"]( //源数据
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
create('test',undefined,{modelName:'local'});

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getModels": () => (/* binding */ getModels)
/* harmony export */ });
/*jshint esversion: 6 */
/**
 * 模式列表
 */
function getModels(){
    return {
        local:{  //localStorage缓存
            name:'local',
            get(key){
                return localStorage.getItem(key);
            },
            set(key,value){
                localStorage.setItem(key,value);
            },
            remove(key){
                localStorage.removeItem(key);
            },
            kes(){
                return Object.keys(localStorage);
            },
        },
        session:{  //sessionStorage缓存
            name:'session',
            get(key){
                return sessionStorage.getItem(key);
            },
            set(key,value){
                sessionStorage.setItem(key,value);
            },
            remove(key){
                sessionStorage.removeItem(key);
            },
            kes(){
                return Object.keys(sessionStorage);
            },
        },
        uni:{  //uniapp缓存
            name:'uni',
            get(key){
                return uni.getStorageSync(key);
            },
            set(key,value){
                uni.setStorageSync(key,value);
            },
            remove(key){
                uni.removeStorageSync(key);
            },
            kes(){
                return uni.getStorageInfoSync().keys;
            },
        },
        wx:{  //wx 微信小程序缓存
            name:'wx',
            get(key){
                return wx.getStorageInfoSync.getItem(key);
            },
            set(key,value){
                wx.setStorageInfoSync.setItem(key,value);
            },
            remove(key){
                wx.removeStorageSync.removeItem(key);
            },
            kes(){
                return wx.getStorageInfoSync().keys;
            },
        },
    };
}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseData)
/* harmony export */ });
/*jshint esversion: 6 */
/**
 * 基础缓存数据
 */
class BaseData {
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
            name:'StorageS-container',
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
        return data.value;
    }
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* reexport safe */ _src_StorageS__WEBPACK_IMPORTED_MODULE_0__.create),
/* harmony export */   "getModels": () => (/* reexport safe */ _src_common_Tools__WEBPACK_IMPORTED_MODULE_1__.getModels)
/* harmony export */ });
/* harmony import */ var _src_StorageS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_common_Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/*jshint esversion: 6 */
/*
    storages-js storage储存小工具
    不支持function的储存
    支持的储存模式 local(默认) session uni(uniapp) wx(微信小程序)
*/


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});