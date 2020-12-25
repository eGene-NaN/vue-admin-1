import service from "@/utils/request.js";

/**
 * 一级分类添加
 */
export function AddFirstCategory(requestData) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data: {
      categoryName: requestData.categoryName,
    },
  });
}

/**
 * 获取分类
 */
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data: {},
  });
}

/**
 * 获取分类
 */
export function DeleteCategory(requestData) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: {
      categoryId: requestData.categoryId,
    },
  });
}
