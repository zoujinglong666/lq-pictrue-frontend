/**
 * @description：请求配置
 */
export enum ResultEnum {
    SUCCESS = 200,
    ERROR = 500,
    OVERDUE = 409,
    TOKEN_INVALID = 408,
    TIMEOUT = 60000,
    TYPE = "success"
}

/**
 * @description：请求方法
 */
export enum RequestEnum {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE"
}

/**
 * @description：常用的 contentTyp 类型
 */
export enum ContentTypeEnum {
    // json
    JSON = "application/json;charset=UTF-8",
    // text
    TEXT = "text/plain;charset=UTF-8",
    // form-data 一般配合qs
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
    // form-data 上传
    FORM_DATA = "multipart/form-data;"
}
