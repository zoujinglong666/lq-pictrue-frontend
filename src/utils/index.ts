/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @returns {String}
 */
export function localGet(key: string) {
    if (!window.localStorage) {
        return
    }
    const value = window.localStorage.getItem(key);

    if (value === null || value === undefined) {
        return value;
    }
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

export function localRemove(key: string) {
    if (!window.localStorage) {
        return
    }
    window.localStorage.removeItem(key)

}

export function localClear() {
    window.localStorage && window.localStorage.clear()

}

export function sessionClear() {
    window.sessionStorage && window.sessionStorage.clear()

}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {*} value Storage值
 * @returns {void}
 */
export function localSet(key: string, value: any) {
    if (!window.localStorage) {
        return;
    }
    // 如果 value 已经是字符串，直接存储，否则转换为 JSON 字符串
    const storedValue = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, storedValue);
}

export function sessionGet(key: string) {
    const value = window.sessionStorage.getItem(key);
    if (value === null || value === undefined) {
        return '';
    }

    try {
        // 尝试解析为 JSON 对象
        return JSON.parse(value);
    } catch (error) {
        // 如果解析失败，返回原始值
        return value;
    }
}


/**
 * @description 存储sessionStorage
 * @param {String} key Storage名称
 * @param {*} value Storage值
 * @returns {void}
 */
export function sessionSet(key: string, value: any) {
    if (!window.sessionStorage) {
        return
    }
    const storedValue = typeof value === 'string' ? value : JSON.stringify(value);
    window.sessionStorage.setItem(key, storedValue);
    // 将值转换为JSON字符串存储
}

export function getTimeZone() {
    let time = new Date();
    let timeZone = time.toLocaleTimeString('en-us', {timeZoneName: 'short'});  //'1:12:38 PM GMT+8'
    // let timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone; //'Asia/Shanghai'
    return timeZone.split(" ").pop()

}

export function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function invertObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('Please provide a valid object')
    }
    return Object.entries(obj).reduce((acc, [key, value]) => {
        acc[value as string] = key
        return acc
    }, {})
}

export function isChineseLanguage(str: string) {
    if (str.length === 0) {
        return false
    }
    const chinesePattern = /[\u4e00-\u9fff]/g;
    return chinesePattern.test(str)

}

export function isEnglishLanguage(str: string) {
    if (str.length === 0) {
        return false
    }
    const englishPattern = /[A-Za-z]/g;
    return englishPattern.test(str)
}

export function toArray(obj) {
    return Array.isArray(obj) ? obj : [obj]
}

export function getUrlParams(url) {
    if (url.indexOf(`?`)) {
        const str = url.split(`?`)[1];
        const arr = str.split(`&`);
        const res = {}
        arr.forEach(item => {
            const key = item.split('=')[0]
            const value = item.split('=')[1]
            res[key] = decodeURIComponent(value)
        })
        return res
    }
}





