import { createPage } from '@mpxjs/core'

createPage({
  data(): {
    [key: string]: unknown
    } {
    return {
      query: null,
      showArrow: false,
      arrowDirection: '', // 可以是 'up' 或 'down'
      lastScrollTop: 0,
      info: {},
      showPop: false,
      arr: [],
      textArr: ['a你好好呢哈哈哈哈哈', '10', '发誓非你砥砺奋进范德萨', '10%', '的撒反对', '10', '而且我reds范德萨发达', '10', '的安抚v撒反对', '10', '非梵蒂冈梵蒂冈']
    }
  },
  onLoad() {
    this.setData({
      query: wx.createSelectorQuery().select
    })
    this.arr = this.textArr.map((item: string) => {
      if (/^\d+%|^\d+$/.test(item)) {
        return {
          text: item,
          type: 'num'
        }
      } else {
        return {
          text: item,
          type: 'text'
        }
      }
    })
  },
  onReady: function() {
    this.scrollView = this.selectComponent('#myScrollView');
    debugger
  },
  scrollToTop: function() {
    if (this.scrollView) {
      this.scrollView.scrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  },
  methods: {
    closePop() {
      this.setData({ showPop: false });
    },
    async scroll(e) {
      const { scrollTop } = e.detail;
      const { showArrow, lastScrollTop } = this.data;

      // const query = wx.createSelectorQuery();

      // const fn = () => new Promise((resolve, reject) => {
      //   this.selectComponent('#myPage').boundingClientRect(data => {
      //     resolve(data)
      //   }).exec()
      // })

      // const data = await fn()
      // debugger

      console.log('this.selectComponent#myPage)', this.selectComponent, this.selectComponent('#myPage'), scrollTop, lastScrollTop);
      const scrollViewHeight = this.selectComponent('#myPage').offsetHeight; // 获取scroll-view的高度
      debugger
      const contentHeight = this.selectComponent('#myPage').scrollHeight; // 获取内容的总高度

      // 判断是否滚动到顶部或底部附近，以及是否应该显示箭头
      if ((scrollTop > 0 && scrollTop < 50) || (scrollTop > contentHeight - scrollViewHeight - 50)) {
        // 接近顶部或底部时不显示箭头
        this.setData({ showArrow: false });
      } else if (scrollTop > lastScrollTop && scrollTop < contentHeight - scrollViewHeight) {
        // 向下滚动且未到底部
        this.setData({ showArrow: true, arrowDirection: 'down' });
      } else if (scrollTop < lastScrollTop && scrollTop > 0) {
        // 向上滚动且未到顶部
        this.setData({ showArrow: true, arrowDirection: 'up' });
      }

      this.setData({ lastScrollTop: scrollTop });
    },
    onArrowTap() {
      const { lastScrollTop, arrowDirection } = this.data;
      const query = wx.createSelectorQuery();
      const scrollView = this.selectComponent('#myPage');
      if (arrowDirection === 'down' && lastScrollTop < scrollView.scrollHeight - scrollView.offsetHeight) {
        // 滚动到底部（这里可能需要一个动画效果，但scroll-view没有提供直接的滚动到底部的方法）
        // 可以使用setTimeout和逐步增加scrollTop的方式来实现滚动动画
        let targetScrollTop = scrollView.scrollHeight - scrollView.offsetHeight;
        let step = 10; // 每次滚动的步长
        let interval = setInterval(() => {
          if (scrollView.scrollTop() < targetScrollTop) {
            scrollView.scrollTop(scrollView.scrollTop() + step);
          } else {
            clearInterval(interval);
          }
        }, 16); // 大约每秒60帧
      } else if (arrowDirection === 'up' && lastScrollTop > 0) {
        // 滚动到顶部
        scrollView.scrollTop(0);
      }
    }
  }
})
