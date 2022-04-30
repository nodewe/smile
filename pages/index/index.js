// index.js

// 获取应用实例
const app = getApp()
Page({
  async onLoad({imageid}){
    wx.showLoading({
      title:'加载请求中...',
      mask:true
    })
    await this.doAuthUser();
    const ret = await this.getActive();
    if(ret.errcode===0 && ret.status==0){
      this.setData({
        isActive:false
      })
     
   }
   //获取信息
   await this.getInfo();
  //  获取规则
   await this.getRule()
   //有imageid就带进来
  if(imageid){
    wx.reLaunch({
      url: '/pages/subPackages1/viewPhotos/viewPhotos?imageid='+imageid,
    })
  }
   wx.hideLoading({
     success: (res) => {},
   })
  },
  //获取活动状态
  getActive(){
    return wx.$http({
      url:'/api/activity_status.php',
      method:'post',
      data:{
        openid:wx.getUser().openId
      }
    })
  },
  async getInfo(){
   const res = await wx.$http({
      url:'/api/user_info.php',
      method:'post',
      data:{
        searchkey:wx.getUser().openId,
        openid:wx.getUser().openId,
      }
    });
    if(res.imageid!=0){
      this.setData({
        isCompose:false
      })
    }
  },
 doAuthUser(){
   return new Promise(async(rs,rj)=>{
    let userInfo = wx.getStorageSync('userInfo');
    //没有userInfo;
    if(!userInfo){
      // 先拿到jscode 
      let jscode ='',user={},data={};
      jscode= await this.getCode();
      data.jscode = jscode;
     
      const res = await wx.$http({
        url:'/api/get_usertoken.php',
        method:'post',
        data
      })
      if(res.errcode==0){
       user.openId = res.openid;
       wx.setStorageSync('userInfo', user);
       
      }
     
    }
    rs()
   })
  },
  data:{
    statusBarHeight:app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    isShowRule:false,
    nodes:'',
    //活动是否截止
    isActive:true,
    //是否已经合成图片了
    isCompose:true,
  },
  async getRule(){
    const res = await wx.$http({
      url:'/api/home_info.php',
      method:'post',
      data:{
        openid:wx.getUser().openId
      }
    })
    let node = res.rulltext.replace(/&lt;/g,'<');
    node = node.replace(/&gt;/g,'>');
    node = node.replace(/\\\\&quot;/g,'"')
     this.setData({
       nodes:node
     })
  },
  showRule:async function() {
    
    this.setData({
      isShowRule:true
    })
  },
  hideRule:function() {
    this.setData({
      isShowRule:false
    })
  },
  //获取jscode
  getCode(){
    return new Promise((resolve,reject)=>{
      wx.login({
        success(res){
          resolve(res.code)
        },
        fail(err){
          console.log(err);
        }
      })
    })
   
  },
  //用户信息
  userAuth(){
    return new Promise((resolve,reject)=>{
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (result) => {
          resolve(result)
        },
        fail: (res) => {
          reject(res)
        },
        complete: (res) => {},
      })
    })
  },
  //查看参与者
  async showView(){
    if(!this.data.isActive){
      wx.showModal({
        title:'提示',
        content:'活动已结束',
        showCancel:false
      });
      return
   }
    wx.navigateTo({
      url: '/pages/subPackages1/viewPhotos/viewPhotos'
    })
  },
  imageSize(src){
    return new Promise((rs,rj)=>{
      wx.getImageInfo({
        src,
        success (res) {
          rs(res)
        }
      })
    })
  },
  join:async function(){
   
   if(!this.data.isActive){
      wx.showModal({
        title:'提示',
        content:'活动已结束',
        showCancel:false
      });
      return
   }
    // 已经合成过图片了
    // if(!this.data.isCompose){
    //   wx.showModal({
    //     title:'提示',
    //     content:'你已参与活动，不要重复参与',
    //     showCancel:false
    //   });
    //   return
    // }
    wx.showActionSheet({
      itemList: ['拍照', '从相册中选择'],
      success:(res)=>{
        let sourceType = 'camera'
        if (res.tapIndex == 0) {
          sourceType = 'camera'
        } else if (res.tapIndex == 1) {
          sourceType = 'album'
        }
        wx.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType: [sourceType],
          success: async (res)=> {
             const info = await this.imageSize(res.tempFilePaths[0]);
             let {width,height} = info
            //  console.log(info,'info')
            //  1080  1920
            //  info.width
              if(width< 1080 || height<1920){
                wx.showModal({
                  title:'提示!',
                  content:'图片宽度或高度小于指定要求,图片要求1080*1920',
                  showCancel:false
                })
                return
              }
              let scale = 1;
              //如果图片的宽度和高度大于标准的宽度 我就要缩小处理
              if(width>1080 && height>1920){
                //去除
                width = (width / 1080);
                height = (height / 1920);

                scale = 1 / Math.min(width,height)
              }
            //  return
              //res.tempFilePaths[0] 这个是图片
              wx.navigateTo({
                url:'/pages/subPackages/choosePhotoFrame/choosePhotoFrame?imgSrc=' + res.tempFilePaths[0]+'&scale='+scale
              })
          },
        })
      },
    })
  }
})
