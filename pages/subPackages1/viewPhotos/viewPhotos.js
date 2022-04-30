// pages/viewPhotos/viewPhotos.js
const app = getApp()
const {
  Node,
  Canvas
} = require("./node.js");
// console.log(Canvas)
function creatHtml(image1, image2 = 'https://ecgs-qjgs.gygshkj.com/img/simp.jpg') {
  return `<div style="background-color:white;border-radius:10px;padding-bottom:10px;">
      <div style="width:270px;height:480px;margin:10px auto;">
      <img style="width:270px;height:480px;" src="${image1}" alt="" srcset="">
      </div>
  <div style="margin-left:10px;width:270px;">
      <div style="display:inline-block;margin-top:10px;font-size:16px;">
          <div>启明大学<span style="color:red;">100</span>周年</div>
          <div>校庆微笑接力活动</div>
          <div>等你来参与!</div>
      </div>
      <div style="margin-left:80px;display:inline-block;width:60px;font-size:14px;">
          <img  style="width:50px;height:50px;" src="${image2}" alt="">
          <div>长按识别</div>
      </div>
  </div>
  </div>`
}
let time = null;
//防抖搜索
let timer = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //切换轮播是否事发请求
    isChangeReq:true,
    //进入详情的时候惰性加载
    isTask:false,
    //向上请求节流
    upReq: true,
    //向下请求请求节流
    downReq: true,
    //系统信息
    systemInfo: null,
    //浏览页图片宽度
    imageWidth: 0,
    //维护一个图片是否已经加载的Map 加载过的图片id都存进来
    imageLoadMap: null,

    //展现搜索页的列表的延迟加载boolean
    isShowList: true,
    //浏览页触摸是记录current
    touchCurrent: 0,
    //是否上滑发送请求
    isTopReq: true,
    //下滑发送请求
    isBottomReq: true,
    //0表示向前查找 例如  5=>4=>3=>2=>1
    //非0 表示向后查找
    forward: 1,
    //保存 从分享或者 小程序码进来的imageid
    imageid: '',
    width: 0,
    height: 0,
    //轮播的current
    current: 0,

    //显示排行榜的数量
    ranklimit: '',
    //0 表示关闭其他值开
    rankon: '', //排行版
    commenton: '', //评论
    likeon: '', //点赞
    viewon: '', //浏览
    //小程序二维码
    QRCodePath: '',
    //胶囊的位置
    barHeight: wx.buttonTop,
    // 轮播的数据
    background: [],
    //排行版数据
    listArray: [],

    //搜索的编号
    serial: '',
    //搜索的页码
    searchPage: 1,
    //搜索页的数据
    photoArray: [],
    //搜索页的每页数据量
    searchPageSize: 20,
    //搜索页存储总页数
    pagecount: 1,
    isShowShare: false,
    //排行版的节流
    isRanking: true,
    //是否隐藏
    isShowRankingList: true,
    isShowMoreRelay: true,
    isShowPlaceholder: true,
    //双击点赞的效果
    top: -10,
    left: -10,
    starTime: 0,
    ClickNum: 0,
    opacity: 0,

    // 浏览量的定位位置
    eyePosition: 0,
    //保存一个搜索页操作点赞的映射 方便关闭的时候快速查询
    searchLikes: null
  },
  /**
   * 搜索页图片加载的事件处理函数
   * @param {Event} e 图片加载完之后的事件处理函数
   */
  imageLoad({
    currentTarget
  }) {
    // 拿到 imageid index datasource
    const {
      imageid,
      index,
      datasource
    } = currentTarget.dataset
    const list = this.data[datasource]
    //已经加载完毕后就将isLoaded设置为true
    list[index].isLoaded = true
    //一旦加载完毕就将该 imageid 存入Map 下次方便查找
    this.data.imageLoadMap.set(imageid, true)
    const obj = {
      //键 由事件动态传回
      [datasource]: list
    }
    this.setData(obj);
  },
  /**
   * 点击搜索页的搜索时触发的事件
   */
  search() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(async () => {
      // 搜索
      // wx.showLoading({
      //   title: '加载中...',
      // })
      this.data.photoArray = [];
      this.data.searchPage = 1
      await this.reqSearchSerial();
      // wx.hideLoading()
      clearTimeout(timer)
    }, 500)
  },
  //搜索页编号搜索事件
  searchInput({
    detail: {
      value
    }
  }) {
    this.data.serial = value;
    this.setData();
  },
  //搜索页的点赞功能
  async addClickLike({
    currentTarget
  }) {
    const current = currentTarget.dataset.current;
    const imageid = currentTarget.dataset.imageId;
    let photoArray = this.data.photoArray
    //如果当前的likeData的length 0 证明没有点过 反之就是点过在
    const len = photoArray[current].likeData.length;

    if (!len) {
      wx.showLoading({
        title: '点赞中...',
        mask: true
      })
      //没点过
      const res = await this.addLike(imageid);
      photoArray[current].likeData.push(res.added);
      ++photoArray[current].likeCount
    } else {
      wx.showLoading({
        title: '取消点赞中...',
        mask: true
      })
      //已经点过赞 再点击就把likeData的数据删除
      const like = photoArray[current].likeData.pop();
      // 取消点赞
      await this.cancelLike(like.id)
        --photoArray[current].likeCount
    }
    wx.hideLoading()
    let searchLikes = this.data.searchLikes;
    //保存映射的关系
    searchLikes.set(imageid, photoArray[current])
    this.setData({
      photoArray,
      searchLikes
    })
  },
  //生成海报
  /**
   * 
   * @param {String} html 传递给插件的html代码
   */
  createPoster(html) {
    return new Promise((rs, rj) => {
      const ctx = wx.createCanvasContext('poster', this);
      const canvas = new Canvas(ctx);
      const tree = Node.fromHtml(html);
      tree.setStyle('width', `${this.data.width}px`)
      tree.layout(ctx).then(() => {
        this.setData({
          canvasStyle: `width: ${this.data.width}px; height: ${tree.boxHeight().value()}px;`
        })
        canvas.draw(tree);
        ctx.draw(false, () => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: tree.boxWidth().value(),
            height: tree.boxHeight().value(),
            canvasId: 'poster',
            // destWidth:
            success(res) {
              rs(res)
            },
            fail(err) {
              rj(err)
            }
          })
        })
      });
    })
  },
  /**
   * 点击浏览页分享图标时事件处理函数
   * 1.获取图片的分享小程序码
   * 2.打开模态框
   */
  showShare: async function () {
    //
    try {
      const path = await wx.getQRcode(this.data.background[this.data.current].imageid);
      // console.log(path)
      this.setData({
        QRCodePath: path.QRCode.replace('http', 'https')
      })
    } catch (error) {
      console.log(error)
    }
    this.setData({
      isShowShare: true,
    })
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      complete() {

      }
    })
  },

  //搜索页根据编号查询
  serialSearch() {
    const count = 5 - this.data.serial.length;
    // console.log();
    if (count > 0 && this.data.serial) {
      this.data.serial = Array(count).fill(0).join("") + this.data.serial
    }
    return wx.$http({
      url: '/api/serial_search.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId,
        searchkey: this.data.serial,
        pagesize: 20,
        page: this.data.searchPage
      }
    })
  },
  /**
   * 点击排行榜的面板时,显示
   */
  showList() {
    this.setData({
      isShowRankingList: false
    })
  },
  /**
   * 点击排行榜显示或隐藏 
   * 显示的时候加载数据
   */
  showRankingList: async function () {
    const {
      isRanking
    } = this.data;
    if (!isRanking) return;
    this.setData({
      isShowRankingList: !this.data.isShowRankingList
    })
    const isShow = this.data.isShowRankingList;
    if (!isShow) {
      this.setData({
        isRanking: false
      })
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      const images = ['./images/rankingFirst.png', './images/rankingSecond.png', './images/rankingThird.png']
      const list = await this.reqRankTop(this.data.ranklimit);
      wx.hideLoading()
      const listArray = list.tops.map((ele, index) => {
        ele.imgSrc = "";
        if (index < 3) {
          ele.imgSrc = images[index]
        }
        ele.img = ele.thumbnail ? (wx.$url + '/' + ele.thumbnail) : ele.src;
        return ele
      })
      this.setData({
        listArray,
        isRanking: true
      })
    }


  },
  //点击更多接力的模态框显示的函数
  show() {
    this.setData({
      isShowMoreRelay: false
    });
  },
  /**
   * 搜索页下拉分页的事件处理函数
   */
  limitData() {
    let page = this.data.searchPage
    page++
    this.setData({
      searchPage: page
    })
    if (page <= this.data.pagecount) {
      this.reqSearchSerial()
    } else {
      page--;
      this.setData({
        searchPage: page
      })
      // this.data.searchPage--
    }
  },
  /**
   * 搜索页请求数据的函数
   */
  async reqSearchSerial() {
    // this.setData({
    //   isShowList:true
    // })
    wx.showLoading({
      title: '查询数据中...',
      mask: true
    })
    const list = await this.serialSearch();
    wx.hideLoading()
    if (list.errcode != 0) {
      return
    }
    let {
      photoArray
    } = this.data
    if (list.userlist.length) {
      list.userlist.forEach(ele => {
        ele.isLoaded = this.data.imageLoadMap.has(ele.imageid) ? true : false;
      })
      photoArray.push(...list.userlist)
    }

    this.setData({
      photoArray,
      pagecount: list.pagecount
    })
    // wx.showLoading({
    //   title: '图片加载中...',
    //   mask:true
    // })
    // let timer = setTimeout(()=>{
    //   this.setData({
    //     isShowList:false
    //   })
    //   wx.hideLoading()
    //   clearTimeout(timer)
    // },3000)
  },
  /**
   * 点击"更多接力"按钮或者点击搜索页的模态框时间处理函数
   * @param {Event} e 事件对象
   */
  showMore: async function (e) {
    this.setData({
      isShowMoreRelay: !this.data.isShowMoreRelay
    });
    let {
      isShowMoreRelay
    } = this.data
    //不隐藏 就开始发送请求  更新数据 保持数据的一致性
    if (!isShowMoreRelay) {

      this.data.photoArray = [];
      this.data.searchPage = 1

      try {
        this.reqSearchSerial()
      } catch (error) {
        console.log(error, 'error');
        wx.showToast({
          title: '查询失败',
        })
      }
      // wx.hideLoading()
    } else {
      try {
        // 如果用户在搜索页操作了点赞 关闭的时候就要更新操作过的那些数据
        // 不在我目前的数据数组中的不管
        let searchLikes = this.data.searchLikes,
          background = this.data.background;
        for (let index = 0; index < background.length; index++) {
          let ele = background[index];
          //如果id不在就跳过
          if (!searchLikes.has(ele.imageid)) {
            continue;
          }

          background[index] = searchLikes.get(ele.imageid);
          background[index].isLike = background[index].likeData.length ? true : false;
        }
        this.setData({
          background
        })

      } catch (error) {


      }
    }
  },
  // 单击重置
  resetClick: function () {
    if (this.data.ClickNum === 0) {
      this.setData({
        starTime: 0,
        ClickNum: 0
      })
    }
  },
  //点击事件
  doubleClick: function (e) {
    var that = this
    var curTime = e.timeStamp;
    var starTime = this.data.starTime;
    if (that.data.starTime === 0) {
      this.setData({
        starTime: curTime
      })
      setTimeout(async function () {
        that.resetClick();
        if (that.data.ClickNum === 1) {

          if (that.likeon === 0) {
            return
          }
          //如果当前isLike为false的话 就发送请求
          // let {current,background} = that.data
          let background = that.data.background
          const current = that.data.current
          if (!background[current].isLike) {
            wx.showLoading({
              title: '点赞中...',
              mask: true
            })
            const res = await that.addLike(background[current].imageid);
            that.added(res.added, current)
            wx.hideLoading()
            background = that.data.background
            background[current].likeCount++;
            that.data.searchLikes.set(background[current].imageid, background[current])
          }
          that.setData({
            starTime: 0,
            ClickNum: 0,
            searchLikes: that.data.searchLikes
          })
          if (that.likeon !== 0) {
            that.setData({
              left: e.touches[0].clientX + 5,
              top: e.touches[0].clientY - 105,
              opacity: 1
            }, () => {
              let timer = setTimeout(() => {
                that.setData({
                  opacity: 0
                }, () => {
                  let timer1 = setTimeout(() => {
                    that.setData({
                      left: -100,
                      top: 0
                    })
                    clearTimeout(timer1)
                  }, 300)
                })
                clearTimeout(timer)
              }, 500)
            })
          }
        }
      }, 300)
      // 300为双击的时间间隔
    } else {
      if (curTime - starTime < 300) {
        this.setData({
          ClickNum: 1
        })
      }
    }
  },

  /**
   * 点赞成功的处理
     对应的索引数组中也是一样
   * @param {Object} obj 点赞成功接口返回的图片like的数据
   * @param {Number} current 点赞的图片的索引
   */
  added(obj, current) {
    // console.log(this.data.chooseImage,'111')
    // this.data.chooseImage.likeData = [obj];
    this.data.background[current].likeData = [obj];
    this.data.background[current].isLike = true;
    this.setData({
      background: this.data.background
    })
    // 选择数据
  },
  /**
   * 取消点赞
   * @param {Sting|Number} likeid 点赞的id
   */
  cancelLike(likeid) {
    return wx.$http({
      url: '/api/delete_like.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId,
        likeid
      }
    })
  },
  //点击点赞
  clickLike: function (e) {
    //如果当前like是false 点击之后就新增点赞
    if (time) {
      clearTimeout(time)
    }
    time = setTimeout(async () => {

      let current = this.data.current;
      if (!this.data.background[current].isLike) {
        wx.showLoading({
          title: '点赞中...',
          mask: true
        })
        const res = await this.addLike(this.data.background[current].imageid)
        // console.log(res,'点击点赞')
        this.added(res.added, current)
        let {
          background
        } = this.data;
        background[current].likeCount++;
        this.data.searchLikes.set(background[current].imageid, background[current]);
        this.setData({
          searchLikes: this.data.searchLikes
        })
      } else {
        wx.showLoading({
          title: '取消点赞中...',
          mask: true
        })
        await this.cancelLike(this.data.background[current].likeData[0].id);
        this.data.background[current].isLike = false;
        this.data.background[current].likeData.pop()
        let {
          background
        } = this.data;
        background[current].likeCount--;
        this.data.searchLikes.set(background[current].imageid, background[current])
        this.setData({
          background: this.data.background,
          searchLikes: this.data.searchLikes
        })
      }
      wx.hideLoading()
    }, 300)
  },
  /**
   * 点击分享图片的模态框的"保存图片"按钮时的时间处理函数
   * @param {Event} e 事件对象
   */
  saveImage: function (e) {
    var that = this;
    wx.getSetting({
      success: async (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.openSetting({
            success(res) {}
          })
        } else {
          wx.showLoading({
            title: '生成图片中...',
            mask: true
          })
          let tempFilePath = ''
          try {
            const image1 = this.data.background[this.data.current].imgCompose.replace('http', 'https');

            const ret = await this.createPoster(creatHtml(image1, this.data.QRCodePath));
            tempFilePath = ret.tempFilePath
            console.log(tempFilePath);
            // return
          } catch (error) {
            wx.showToast({
              title: '生成失败',

            })
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(error, 'error')
            return
          }
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(result) {

              //已授权过可直接执行保存图片
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              });
              that.setData({
                isShowShare: false
              })
            },
            fail(err) {
              console.log('err', err)
              wx.showToast({
                title: '保存失败',
                icon: 'error'
              });
            },
            complete() {
              wx.hideLoading({
                success: (res) => {},
              })
            }
          })
        }
      }
    })
  },
  /**
   * 浏览页图片添加浏览量的函数
   * @param {String} imageId 图片id
   */
  addViewCount(imageId) {
    return wx.$http({
      url: '/api/add_view.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId,
        image: imageId
      }
    })
  },
  /**
   * 点击参与接力的图片回到首页
   * @param {Event} e 事件对象
   */
  goHome: function (e) {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  /**
   * 搜索页的input元素获取焦点的事件处理函数
   * @param {Event} e 事件对象
   */
  inputFocus: function (e) {
    this.setData({
      isShowPlaceholder: false
    })
  },
  /**
   * 搜索页的input元素失去焦点的事件处理函数
   * @param {Event} e 事件对象
   */
  inputBlur: function (e) {
    if (!e.detail.value) {
      this.setData({
        isShowPlaceholder: true
      })
    }

  },
  /**
   * 新增点赞
   * @param {String} imageId 图片的id
   */
  addLike(imageId) {
    return wx.$http({
      url: '/api/add_like.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId,
        image: imageId
      }
    })
  },

  /**
   * 评论是否开启
   */
  async isShowCommentStatus() {
    return wx.$http({
      url: '/api/comment_status.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId
      }
    })
  },
  /**
   * 获取浏览量是否开启
   */
  async isShowViewStatus() {
    return wx.$http({
      url: '/api/view_status.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId
      }
    })
  },
  /**
   * 获取点赞量是否开启
   */
  isShowLikeStatus() {
    return wx.$http({
      url: '/api/like_status.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId
      }
    })
  },
  /**
   * 获取排行版信息
   */
  isShowRankInfo() {
    return wx.$http({
      url: '/api/rank_info.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId
      }
    })
  },
  /**
   * 向上 向下预加载
   * @param {String | Number} imageid 图片的id
   * @param {Number} forward 0是向上 3=>2=>1 非0 就是向下查找 1=>2=>3
   * @param {Boolean} loading 是否显示loading
   */
  async upOrDownReq(imageid, forward, loading = true) {
    this.data.imageid = imageid;
    this.data.forward = forward;
    // 判断一下,如果现在是向上找 但是向上请求的状态已经关闭就不需要请求
    if (!forward && !this.data.isTopReq) {
      return
    }
    // 判断一下,如果现在是向下找 但是向下请求的状态已经关闭就不需要请求
    if (forward && !this.data.isBottomReq) {
      return
    }
    await this.reqimage(loading)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function ({
    imageid
  }) {
    // this._watcher();

    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var info = wx.getSystemInfoSync();

    //获取排行榜信息 是否显示排行版
    const rankInfo = await this.isShowRankInfo()
    //获取是否显示评论
    const commentStatus = await this.isShowCommentStatus()
    //获取是否显示点赞
    const likeStatus = await this.isShowLikeStatus()
    //获取是否显示浏览量
    const viewStatus = await this.isShowViewStatus();
    this.setData({
      rankon: rankInfo.rankon,
      ranklimit: rankInfo.ranklimit,
      commenton: commentStatus.commenton,
      likeon: likeStatus.likeon,
      searchLikes: new Map(),
      imageLoadMap: new Map(),
      // likeon:0,
      viewon: viewStatus.viewon,
      windowHeight: info.windowHeight,
      systemInfo: JSON.stringify(info),
      //根据手机屏幕高度算出浏览页的图片的宽度
      imageWidth: info.windowHeight * 1080 / 1920
    });

    if (imageid) {
      //向下加载
      await this.upOrDownReq(imageid, 1);
      //向上预加载
      // await this.upOrDownReq(imageid, 0);
    } else {
      //向下加载
      await this.reqimage()
      //向上预加载
      const imageid = this.data.background[0].imageid
      await this.upOrDownReq(imageid, 0);

    }
    if (!this.data.background.length) {
      wx.showModal({
        title: '提示!',
        content: '暂无数据',
        showCancel: false,
        success() {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })
      return
    }
    //增加浏览量
    await this.doAddViewCount()

    wx.hideLoading()
  },
  /*再次封装新增浏览量的接口 */
  doAddViewCount() {
    return new Promise(async (rs, rj) => {
      await this.addViewCount(this.data.background[this.data.current].imageid);
      this.data.background[this.data.current].viewCount++;
      this.setData({
        background: this.data.background
      })
      rs()
    })
  },
  /**
   * 点击"更多接力"按钮的时候执行该函数重新刷新数据
   * @param {String} imageid 图片的id
   */
  updateImg(imageid) {
    return new Promise(async (rs, rj) => {
      let data = {
        openid: wx.getUser().openId,
        forward: 1,
        pagesize: 1,
        imageid
      }
      const list = await wx.$http({
        url: '/api/image_browser.php',
        method: 'post',
        data
      })
      if (list.errcode) {
        rj('err')
      } else {
        rs(list.userlist[0])
      }
      rs();
    })
  },
  /**
   * 切换图片的事件
   * @param {Event} e 事件对象
   */
  async changePic(e) {
    const current = e.detail.current
    //切换轮播的时候还需要把like赋值
    this.setData({
      isLike: this.data.background[current].isLike,
      current,
      chooseImage: this.data.background[current]
    });
    //切换轮播 浏览增加
    await this.doAddViewCount();
    //碰到不需要发请求的 就不发送
    if(!this.data.isChangeReq)return;
    // 我就 算出 距离上面还有多少张
    let distance = current - 0;
    const {
      upReq,
      downReq
    } = this.data;
    //如果小于等于3我就向上请求
    // if (distance <= 3 && upReq) {
    //   this.setData({
    //     upReq: false
    //   })
    //   const imageId = this.data.background[0].imageid
    //   await this.upOrDownReq(imageId, 0, false);
    //   this.setData({
    //     upReq: true
    //   })
    // }
    // 算出 距离 底部还剩多少张
    distance = this.data.background.length - 1 - current;
    //如果小于等于3我就向下请求
    if (distance <= 3 && downReq) {
      this.setData({
        downReq: false
      })
      const len = this.data.background.length - 1,
        imageId = this.data.background[len].imageid;
      await this.upOrDownReq(imageId, 1, false)
      this.setData({
        downReq: true
      })
    }
  },
  /**
   * 开始触摸的事件
   * @param {Event} e 事件对象
   */
  _start(e) {
    //保存触摸时的current 方便后面的滑动判断
    this.setData({
      touchCurrent: this.data.current
    });
  },
  /**
   * 上下滑动的事件
   * @param {Event} e 事件对象
   */
  async slide(e) {
    //如果已经是最后一张 并且 我还是往上滑 我就请求下一数据
    // dy > 0 就说明上滑 
    // dy < 0 表示下滑
    const dy = e.detail.dy;
    let {
      current,
      touchCurrent,
      background,
      isBottomReq,
      isTopReq
    } = this.data
    //判断是不是最后一张图片
    const isLast = touchCurrent === background.length - 1;
    // 如果下滑 并且手指触摸时的current为0 并且上面没有图片数据了
   
    if(!this.data.isChangeReq)return;
    // 如果下滑 并且手指触摸时的current为数组最后一个索引 并且下面可能还有图片数据
    // 就发送请求
    if (dy > 0 && isLast && isBottomReq) {
      //向下滑证明向后请求  1
      this.data.forward = 1
      this.data.imageid = background[current].imageid
      this.setData({
        isTask:true
      })
      await this.reqimage(true)
      this.setData({
        isTask:false
      })
    }
     // 如果上滑 并且手指触摸时的current为0 并且上面可能还有图片数据
    // 就发送请求
    if (dy < 0 && !touchCurrent && isTopReq) {
      this.data.forward = 0
      this.data.imageid = background[0].imageid;
      this.setData({
        isTask:true
      })
      await this.reqimage(true)
      this.setData({
        isTask:false
      })
    }
  },
  //请求浏览页的图片数据
  reqimage(loading = true) {
    return new Promise((rs, rj) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        if (loading) {
          wx.showLoading({
            title: '加载中...',
            mask: true
          })
        }

        try {
          await this.imageIdLimit()
        } catch (e) {
          console.log('加载失败');
          wx.hideLoading()
          rj()
          return
        }
        rs()
        wx.hideLoading({
          success: (res) => {},
        })
      }, 300)
    })

  },

  // 根据imageid分页请求数据
  imageIdLimit() {
    return new Promise(async (rs, rj) => {
      // this.data.imageid
      let data = {
        openid: wx.getUser().openId,
        forward: this.data.forward,
        pagesize: this.data.searchPageSize
      }
      //如果imageid存在我就添加
      if (this.data.imageid !== '') {
        data.imageid = this.data.imageid
      }
      const list = await wx.$http({
        url: '/api/image_browser.php',
        method: 'post',
        data
      })
      //
      list.userlist.forEach(ele => {
        ele.isLike = false
        if (ele.likeData.length) {
          ele.isLike = true
        };
      })
      //等于零 在这个id之前查找
      list.userlist.sort((a, b) => a.imageid - b.imageid);
      let task,current;
      if (this.data.background.length && !this.data.forward) {
        task = list.userlist.pop()
      }
      if (this.data.background.length && this.data.forward) {
        task = list.userlist.shift()
      }
      //删掉了之后没有length了就说明已经没有数据了上滑没有数据了
      if (!list.userlist.length && !this.data.forward) {
        //关闭开关
        this.data.isTopReq = false
      }
      if (!list.userlist.length && this.data.forward) {
        //关闭开关
        this.data.isBottomReq = false
      }
      //上找
      if (!this.data.forward) {
        this.data.background.unshift(...list.userlist);
       
        // if(list.userlist.length){
        //   current+=list.userlist.length
        //   this.setData({current})
        // }
        
        
      } else {
        this.data.background.push(...list.userlist)
      }
      this.data.background.forEach(ele => {
        ele.isLoaded = this.data.imageLoadMap.has(ele.imageid) ? true : false;
      })
      let DATA = {
        background: this.data.background,
        isTopReq: this.data.isTopReq,
        isBottomReq: this.data.isBottomReq
      }
      if (task && this.data.isTask) {
        this.setData({
          isChangeReq:false
        })
        current = this.data.background.findIndex(ele => ele.imageid == task.imageid);
        if (list.userlist.length > 0 && !this.data.forward) {
          current--;
          DATA.current = current
        }
        if (list.userlist.length > 0 && this.data.forward) {
          current++;
          DATA.current = current
        }
      }
      this.setData(DATA)
      let timer = setTimeout(()=>{
        this.setData({
          isChangeReq:true
        })
        clearTimeout(timer);
        timer = null;
      },1000)
      rs()
    })
  },

  /**
   * 请求排行版
   */
  reqRankTop(topcount) {
    return wx.$http({
      url: '/api/rank_top.php',
      method: 'post',
      data: {
        openid: wx.getUser().openId,
        topcount
      }
    })
  },
  /**
   * 搜索页点击图片去详情页的事件处理函数
   * @param {Event} e 事件对象
   */
  async goDetail(e) {
    const imageid = e.currentTarget.dataset.imageId
    // console.log(e,'ee')
    // 复制给current
    //如果数据在里面有则我直接去
    let index = this.data.background.findIndex(ele => ele.imageid == imageid);
    if (index > -1) {
      this.setData({
        current: index
      })
    } else {
      //否则我请求
      this.data.background = [];
      this.setData({
        isTopReq:true,
        isBottomReq:true,
        isChangeReq:false
      })
      // //先向上请求
      // await this.upOrDownReq(imageid, 0, true)
      //然后向下请求
      await this.upOrDownReq(imageid, 1, true);
      this.setData({
        current:0
      })
     
      //  index = this.data.background.findIndex(ele => ele.imageid == imageid);
      //  //最后锁定到我点击的那张图片
      //  this.setData({
      //    current:index
      //  })
    }
    this.setData({
      isShowMoreRelay: true
    })
  },
  /**
   * 点击分享图片的遮罩层 隐藏模态框
   */
  showHide() {
    this.setData({
      isShowShare: !this.data.isShowShare
    })
  },
  onShareAppMessage(res) {
    return {
      title: '校园微笑接力',
      imageUrl: this.data.background[this.data.current].imgCompose,
      path: '/pages/index/index?imageid=' + this.data.background[this.data.current].imageid,
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    const info = await wx.getNodeInfo('.opacityRectangle');
    this.setData({
      eyePosition: info[0].top + info[0].height,
      width: 290,
      height: 600
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})