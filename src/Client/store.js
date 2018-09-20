import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    catagoryShow: false,
    dialogShow: false,
    isLoading: false,
    isLogin: false,
    componentId: '',
    username: '',
    avator: '',
    tag: 'Latest',
    pageCount: null,
    articleList: [],
    curPage: 1,
    noArticle: false,
  },
  mutations: {
    hideCatagory(state, e) {
      if (e.target.className !== 'more') {
        if (state.catagoryShow) {
          state.catagoryShow = !state.catagoryShow;
        }
      }
    },

    switchStatus(state) {
      state.catagoryShow = !state.catagoryShow;
    },
    openDialog(state) {
      state.dialogShow = true;
    },
    hideDialog(state, e) {
      if (e === 'isLogin' || ['dialog', 'close'].includes(e.target.className)) {
        state.dialogShow = false;
      }
    },
    switchLoading(state) {
      state.isLoading = !state.isLoading
    },
    login(state) {
      state.isLogin = true;
    },
    getUsername(state, name) {
      state.username = name;
    },
    getAvator(state, url) {
      state.avator = url;
    },
    componentName(state, name) {
      console.log(name);
      state.componentId = name;

    },
    getArticle(state, data) {

      if (data.length === 0) {
        state.noArticle = true;
        state.curPage --;
        setTimeout(() => {
          state.noArticle = false;
        }, 1000)
      }
      if (!data.key) {
        state.articleList = state.articleList.concat(data.arr);
      } else {
        state.articleList = data.arr;
      }
      
    },
    getPageCount(state, count){
        state.pageCount = count;
    },
    changeTag(state, tag) {
        state.articleList = [];
        state.tag = tag;
        state.curPage = 1;
    },
    nextPage(state){
      state.curPage ++;
    }
  },
  actions: {
    async getArticle({
      commit,
      state
    }, option) {
      const vm = option.vm;
      try {
        const res = await vm.$request({
          path: `article?page=${option.page}&tag=${state.tag}&keyWord=${option.keyWord || ""}`,
          data: {},
          method: "GET"
        });
        commit('getArticle', {
          arr: res.data,
          key: option.keyWord
        });
        commit('getPageCount', res.count)
      } catch (msg) {
        console.log(msg);
        commit('getPageCount', 0);
        commit('getArticle', {
          arr: [],
          key: option.keyWord
        });
      }
    },
  }
})
export default store;
