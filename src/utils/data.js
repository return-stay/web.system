
import { getAjax, postAjax } from "@/utils/ajax"


const getSearchList = (url) => {
  return getAjax({
    url,
  })
}
const postSearchList = (url) => {
  return postAjax({
    url
  })
}

// 通过传的接口，获取相关列表
const getList = async (url) => {
  let req = await getSearchList(url)
  let list = req.data || []
  return list
}

const postList = async (url) => {
  let req = await postSearchList(url)
  let list = req.data || []
  return list
}
export {
  getList,
  postList,
}