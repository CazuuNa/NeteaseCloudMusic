import axios from '../utils/axios';
import qs from 'qs';
import baseApi from './base';

//手机登录--可选择验证码登录或加密
export function LoginCellphone(){
  return axios.get(`${baseApi.common}login/cellphone`)
}

//首页轮播图
export function getBannerList(){
  return axios.get(`${baseApi.common}/banner?type=0`)
}

//推荐歌单 -- 不需要登录
export function getPersonalizedList(){
  return axios.get(`${baseApi.common}/personalized?limit=19`)
}

//歌单详情
export function playListDetail(data:object){
  console.log(data,'data--')
  return axios.get(`${baseApi.common}/playlist/detail`,{params:data})
}