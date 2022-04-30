
// pages/choosePhotoFrame/choosePhotoFrame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //合成节流
    isSynthesis:true,
    _image_top:0,
    scale:1,
    frameHeight:0,
      src:'',
      cut_top:0,
    _img_left:0,
    _img_top:0,
    //相框的url
    frameUrl:'',
    //合成后的图片
    frameArray:[],
    width:wx.getSystemInfoSync().windowWidth,//宽度
    height:wx.getSystemInfoSync().windowHeight,//高度
    // width:250,//宽度
    // height:250,//高度
  },

  chooseFrame:async function(event){
    var index = event.currentTarget.dataset.id;
    var frameArray = this.data.frameArray;
    for (var i = 0;i < frameArray.length;++i){
      if(i == index){
        frameArray[i].choose = true;
        this.setData({
          frameUrl:frameArray[i].src
        })
      }else{
        frameArray[i].choose = false;
      }
    }
    this.setData({
      frameArray:frameArray
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // console.log(options.scale,'scale')
  
    //获取到image-cropper实例
    this.cropper = this.selectComponent("#image-cropper");
    //获取相框列表

    const frame_list = await wx.$http({
      url:'/api/frame_list.php',
      method:'post',
      data:{
        openid:wx.getUser().openId
      }
    })
    if(frame_list.errcode===0){
      frame_list.frames.forEach(ele=>{
        ele.pic = ele.pic.replace('http','https')
        ele.src=ele.pic
      })
    }
    this.setData({
        src : options.imgSrc,
        frameArray:frame_list.frames,
        scale: Number(options.scale)
    });
  },
  cropperload(e){
    // console.log(e)
    // const {_img_left,_img_top} = e.detail.cropper.data;
 
    // //保存最开始的偏移
    // this.setData({
    //   _img_left,
    //   _img_top
    // }) 
   
  },

  //返回首页
  backHome(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  loadimage(e){
    // console.log(e)
    this.cropper = this.selectComponent("#image-cropper");
    
    const {_img_left,_img_top} = this.cropper.data;
    // console.log()
    //保存最开始的偏移
    this.setData({
      _img_left,
      _img_top
    }) 
    // 
      wx.hideLoading();
  },
  //封装一下取裁剪图片的逻辑
  getImg(){
    return new Promise((rs,rj)=>{
      this.cropper.getImg((obj)=>{
        rs(obj)
     })
    })
  },
 
  //合成图片
  async synthesis(){
    const frame = this.data.frameArray.find(ele=>ele.choose)
    if(!this.data.frameUrl){
      wx.showModal({
        title:'提示!',
        content:'请选择一张相框效果',
        showCancel:false,

      })
      return
    }
    let {isSynthesis} = this.data
    if(!isSynthesis)return
    this.setData({
      isSynthesis:false
    })
    let {
      angle,
      scale,
      _img_left,
      _img_top
    } = await this.getImg();
 
    let offset_x = _img_left - this.data._img_left;
    let offset_y = this.data._img_top - _img_top ;
    offset_x*=4;
    offset_y*=4;
    scale = this.data.scale * scale
    wx.showLoading({
      title:"合成图片中...",
      mask:true
    })
    try{
      const res = await wx.upload({filePath:this.data.src});
      const pic = await wx.$http({
        url:'/api/compose_image.php',
        method:"post",
        data:{
          openid:wx.getUser().openId,
          picrel:res.picrel,
          frameid:frame.id,
          angle,
          scale_ratio:scale,
          offset_x,
          offset_y,
          thumb_ratio:0.5
        }
      });
      if(pic.errcode!=0){
        wx.showModal({
          title:'提示！',
          content:pic.errmsg,
          showCancel:false
        })
        wx.hideLoading();
        this.setData({
          isSynthesis:true
        })
        return
      };
      this.setData({
        isSynthesis:true
      })
      //调用一次获取二维码的接口
     wx.getQRcode(pic.imageid)
      wx.hideLoading();
      wx.reLaunch({
        url: '/pages/subPackages1/viewPhotos/viewPhotos?imageid='+pic.imageid,
      })  
    }catch(e){
      console.log(e)
      wx.showToast({
        title:"合成失败..."
      })
      wx.hideLoading()
    }
    wx.hideLoading()
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    // 获取
    const {windowHeight} = wx.getSystemInfoSync();
    //查找相框的大小
    const info = await wx.getNodeInfo('.chooseContainer');
    const {height} = info[0];
    //                屏幕可用      下面相框的 裁剪框
    const cut_top =  (windowHeight - height - 480) / 2;
    const _image_top = (windowHeight - height) /2
    this.setData({
      cut_top,
      _image_top,
      frameHeight:height
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})