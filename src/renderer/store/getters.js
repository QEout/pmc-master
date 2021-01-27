import { formatDate } from "@/utils/common";

const getters = {
  token: state => state.app.token,
  bucketList: state => state.app.bucketList,
  allTags:state => state.app.allTags,
  currentBucket: state => state.app.currentBucket,
  url: state => state.app.url,
  list: state =>
    state.app.list.map(it => {
      it.timeFN = formatDate(it.updatedAt);
      // it.labels=it.labels.map(label =>{
      //   return label.title
      // } )
      return it;
    })
    // list:state =>state.app.list
};
export default getters;
