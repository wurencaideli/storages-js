/*jshint esversion: 6 */
/* eslint-disable */
/**
 * 模式列表
 */
export const allModel = {
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
        keys(){
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
        keys(){
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
        keys(){
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
        keys(){
            return wx.getStorageInfoSync().keys;
        },
    },
};