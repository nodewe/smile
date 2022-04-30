

const APPID = '56965902';
const AppSecret = 'a5bjrnaJphKLUUD1bXKms92tz';
wx.appid = APPID;
wx.secret = AppSecret

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const serverUrl='https://21102689.zhimakaifa.com';

const header ={
  "content-Type":"multipart/form-data"
}
//封装一个业务获取
let getAccessToken = ()=>{
  return new Promise(async(rs,rj)=>{
    const token = wx.getStorageSync('token');
  //   accesstoken
  let accesstoken = '',tokenInfo={},isExpire='';
  if(!token){
    // 没有token 先请求
     tokenInfo = await getToken();
    accesstoken = tokenInfo.accesstoken
  }else{
   isExpire = Date.now()/1000 > token.expiretime;
   //如果过期了重新请求
   if(isExpire){
     tokenInfo = await getToken();
    accesstoken = tokenInfo.accesstoken
   }else{
     //没有过期
    accesstoken = token.accesstoken
   }
  }
  //返回 accesstoken
    rs(accesstoken) 
  })
  
}
//上传文件的公共方法
function upload({
  filePath,
  formData={},
  url='/api/upload_image.php',
  name = 'userimg'
}) {
  return new Promise(async(resolve,rejected)=>{
    const userinfo = wx.getStorageSync('userInfo');
     formData.openid=userinfo.openId;
    formData.accesstoken =await getAccessToken()
    wx.uploadFile({
      url:serverUrl+url,
      filePath,
      header,
      formData,
      name,
      success(uploadFileRes) {
          resolve(JSON.parse(uploadFileRes.data))
      },
      fail(err) {
        console.log(err,'上传失败');
      rejected(err)
      }
    })
  })
}
function http(op) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: serverUrl+op.url,
      header:op.header || {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method:op.method || 'GET',
      data:op.data,
      success(res){
        if(res.data.errcode!=0){
          reject(res.data.errmsg)
        }
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
//请求方法
function request(op) {
  return new Promise(async(resolve,reject)=>{
   
    if(op.data){
      op.data.accesstoken = await getAccessToken()
    }
    wx.request({
      url: serverUrl+op.url,
      header:op.header || {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method:op.method || 'GET',
      data:op.data,
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
//请求AccessToken
function getToken(){
  return new Promise((rs,rj)=>{
    const start = async()=>{
      const token = await http({
        url:'/api/get_token.php',
        method:'POST',
        data:{
          appid:wx.appid,
          secret:wx.secret
        }
      })
      // accesstoken expiretime
      wx.setStorageSync('token', token)
      // console.log(token,'1111');
      rs(token)
    }
   start()
  })
 
}
//封装一个下载图片的函数
function download(url) {
  return new Promise((rs,rj)=>{
    wx.downloadFile({
      url,
      success(res){
        rs(res.tempFilePath)
      },
      fail(err){
        rj(err)
      }
    })
  })
}
//获取缓存userInfo对象的函数
let getUser = ()=>{
  let userInfo = wx.getStorageSync('userInfo');
  return userInfo
}
/**
 * 获取节点信息
 * @param {String} el 选择器
 */
function getNodeInfo(el) {
  return new Promise((rs,rj)=>{
    const query = wx.createSelectorQuery()
    query.select(el).boundingClientRect();
    query.exec(res=>rs(res))
  })
}

/**
 * 获取图片分享二维码
 * @param {String} imageid 图片的id
 * @return {Promise}
 */
 function getQRcode(imageid) {
    return wx.$http({
      url: '/api/get_unlimitedqr.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId,
        page: 'pages/index/index',
        scene: 'imageid=' + imageid,
        imageid
      }
    })
  }

//挂载到微信上
wx.getQRcode = getQRcode;
//封装下载方法
wx.download = download;
//封装上传方法
wx.upload = upload;
//挂载到wx对象
wx.getUser = getUser;
//获取节点信息
wx.getNodeInfo = getNodeInfo;
// 服务器基础路径
wx.$url = serverUrl;
module.exports = {
  formatTime,
  request
}
