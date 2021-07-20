import axios from 'axios'
/*用来封装axios数据访问插件*/
const request = axios.create({//通过axios创建了一个request对象
    timeout: 5000
})

// request 拦截器  设置请求头
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器  设置请求结果
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;//返回的数据都存在data里面，需要把data里面的数据取出来放到res里面
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {//如果res是string不是对象，需要转换成对象
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

