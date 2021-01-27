import { getToken, setToken, removeToken } from "@/utils/common";

import {
  getBucketList,
  getList,
  deleteResource,
  createBucket,
  updateBucket,
  updateToken,
  getTags,
} from "@/service/getData";

const app = {
  state: {
    token: getToken(),
    bucketList: [],
    allTags: [],
    list: [],
    currentBucket: {},
    url: [],
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    },
    REMOVE_TOKEN: (state, data) => {
      state.token = data;
    },
    SET_BUCKET: (state, data) => {
      state.bucketList = data;
    },
    SET_LIST: (state, data) => {
      state.list = data;
    },
    SET_TAGS: (state, data) => {
      state.allTags = data;
    },
    SWITCH_BUCKET: (state, data) => {
      state.currentBucket = data;
    },
    // SET_BUCKET_DOMAIN: (state, data) => {
    //   state.url = data;
    // },
  },
  actions: {
    SetToken: ({ commit }, data) => {
      return new Promise((resolve) => {
        setToken(data);
        commit("SET_TOKEN", data);
        resolve();
      });
    },
    RemoveToken: ({ commit }) => {
      removeToken();
      commit("REMOVE_TOKEN", "");
    },
    UpdateToken: ({dispatch },data) => {
      // console.log('sdfds')
      return new Promise((resolve, reject) => {
        updateToken(data)
          .then((it) => {
            // console.log('sdjd')
            // if (it) {
              dispatch("SetToken", data);
            // }
            resolve(it);
          })
          .catch((error) => {
            console.log(error)
            reject(error);
          });
      });
    },
    GetBucket: ({ commit, state, dispatch }, data) => {
      console.log(state.token);
      return new Promise((resolve, reject) => {
        getBucketList(state.token.company)
          .then((it) => {
            console.log(it);
            if (it) {
              commit("SET_BUCKET", it);
              if (data) {
                dispatch("GetList", data);
                // dispatch("GetBucketDomain");
              } else {
                if (it.length) {
                  dispatch("GetList", it[0]);
                  // dispatch("GetBucketDomain");
                  commit("SWITCH_BUCKET", it[0]);
                }
              }
            }
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetList: ({ commit, state }, data) => {
      return new Promise((resolve, reject) => {
        getList(state.token, data)
          .then((it) => {
            console.log(it);
            if (it) {
              commit("SET_LIST", it);
            }
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    UpdateBucket: ({ state, dispatch },data) => {
      console.log('sdfds')
      return new Promise((resolve, reject) => {
        updateBucket(state.token, data)
          .then((it) => {
            console.log(it)
            // if (it) {
              dispatch("GetBucket", state.currentBucket);
            // }
            resolve(it);
          })
          .catch((error) => {
            console.log(error)
            reject(error);
          });
      });
    },
    DeleteBucket: ({ state, dispatch },objectId) => {
      return new Promise((resolve, reject) => {
        deleteResource("bucketList", objectId)
          .then((it) => {
            if (it) {
              dispatch("GetBucket", state.currentBucket);
            }
            resolve(it);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    DeleteBucketListItem: ({ state, dispatch }, objectId) => {
      return new Promise((resolve, reject) => {
        deleteResource("materialList", objectId)
          .then((it) => {
            console.log(it);
            if (it.msg == "ok") {
              dispatch("GetList", state.currentBucket);
            }
            resolve(it);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    SwitchBucket: ({ commit, dispatch }, data) => {
      commit("SWITCH_BUCKET", data);
      dispatch("GetBucket", data);
    },
    CreateBucket: ({ state, dispatch }, data) => {
      return new Promise((resolve, reject) => {
        createBucket(state.token, data)
          .then((it) => {
            if (it) {
              dispatch("GetBucket");
            }
            resolve(it);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetTags: ({ commit }) => {
      return new Promise((resolve, reject) => {
        let a = [];
        for (let i = 0; i < 4; i++) {
         getTags(i)
            .then((it) => {
              console.log(it);
              a.push(it);
            })
            .catch((error) => {
              reject(error);
            });
         
        }
        console.log(a) 
        commit("SET_TAGS", a);
          resolve();
      });
    },
    // GetBucketDomain: ({ commit, state }) => {
    //   return new Promise((resolve, reject) => {
    //     getBucketDomain(state.token, state.currentBucket)
    //       .then((it) => {
    //         if (it.status === 200) {
    //           commit("SET_BUCKET_DOMAIN", it.data);
    //         }
    //         resolve(it);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
  },
};

export default app;
