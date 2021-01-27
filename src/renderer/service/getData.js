import Bmob from "hydrogen-js-sdk";

// 获取 Bucket 列表
export const getBucketList = (company) => {
  console.log(company)
  let query = Bmob.Query("bucketList");
  query.equalTo("company","==", company);
  query.order("sort");
  return query.find();
};

// http.get(getBucketListUrl, {
//   headers: {
//     Authorization: qiniu.util.generateAccessToken(data, getBucketListUrl)
//   }
// });
//登录账号
export const getAccount = (username, password) =>
  Bmob.User.login(username, password);
//updateToken
export const updateToken = (data) => {
  let query = Bmob.Query("_User");
  query.set("id", data.objectId);
  query.set("username", data.username);
  query.set("password", data.password);
  query.set("call", data.call);
  return query.save();
};
// 创建 Bucket
export const createBucket = (mac, data) => {
  let query = Bmob.Query("bucketList");
  query.set("title", data.title);
  query.set("description", data.description);
  if (mac.company) query.set("company", mac.company);
  if (data.sort) query.set("sort", data.sort);
  query.set("author", Bmob.Pointer("_User").set(mac.objectId));
  return query.save();
};
//修改bucket
export const updateBucket = (mac, bucket) => {
  let query = Bmob.Query("bucketList");
  query.set("id", bucket.objectId);
  query.set("title", bucket.title);
  query.set("description", bucket.description);
  if (bucket.sort) query.set("sort", bucket.sort);
  query.set("author", Bmob.Pointer("_User").set(mac.objectId));
  return query.save();
};
// 上传物料信息
export const createMaterial = (material) => {
  let query = Bmob.Query("materialList");
  query.set("title", material.title);
  query.set("description", material.description);
  query.set("code", material.code);
  // if ( material.author.company) query.set("company", material.author.company);
  query.set("author", Bmob.Pointer("_User").set(material.author.objectId));
  query.set("authorInfo", {
    name: material.author.username,
    call: material.author.call,
    objectId: material.author.objectId,
  });
  query.set("bucket", Bmob.Pointer("bucketList").set(material.bucket));
  query.set("labels", material.labels);
  query.set("lastSort", material.lastSort);
  return query.save();
};
//修改物料信息
export const updateMaterial = (material) => {
  let query = Bmob.Query("materialList");
  query.set("id", material.objectId);
  query.set("title", material.title);
  query.set("description", material.description);
  query.set("code", material.code);
  query.set("authorInfo", {
    name: material.author.username,
    call: material.author.call,
    objectId: material.author.objectId,
  });
  query.set("labels", material.labels);
  query.set("lastSort", material.lastSort);
  return query.save();
};
// 删除数据
export const deleteResource = (tableName, objectId) => {
  let query = Bmob.Query(tableName);
  return query.destroy(objectId);
};

// 查询物料信息
export const getList = (mac, data) => {
  let query = Bmob.Query("materialList");
  query.equalTo("bucket", "==", data.objectId);
  // if (mac.company) query.equalTo("company", "==", mac.company);
  query.order("-updatedAt");
  return query.find();
};
//获取sortList数据
export const getTags = (company, num) => {
  let query = Bmob.Query("sortList");
  query.equalTo("sort", "==", num);
  if (company) query.equalTo("company", "==", company);
  query.order("code");
  return query.find();
};
//设置sortList数据
export const setTag = (company, tag, parent = false) => {
  let query = Bmob.Query("sortList");
  query.set("title", tag.title);
  query.set("code", tag.code);
  if (company) query.set("company", company);
  if (parent) query.set("parentCode", tag.parentCode);
  if (tag.description) query.set("description", tag.description);
  query.set("sort", tag.sort);
  return query.save();
};
// // 获取 Bucket 空间域名
// export const getBucketDomain = (mac, data) =>
//   http.get(getBucketDomainUrl, {
//     params: {
//       tbl: data,
//     },
//     headers: {
//       Authorization: qiniu.util.generateAccessToken(
//         mac,
//         getBucketDomainUrl + "?tbl=" + data
//       ),
//     },
//   });
