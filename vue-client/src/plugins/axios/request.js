import axios from 'axios'
import { Loading, Notification } from 'element-ui'
import router from '../../router/index'
const request = axios.create({
    baseURL: 'http://localhost:8090',
    timeout: 5000 // 请求超时时间限制
})

let loading
function startLoadingAnimation() {
    loading = Loading.service({
        text: 'Loading...',
        background: 'rgba(0,0,0,0.1)',
    })
}

function stopLoadingAnimation() {
    loading.close()
}

// request.defaults.headers.common['Authorization'] = AUTH_TOKEN
// 请求拦截器
request.interceptors.request.use(
    config => {
        startLoadingAnimation()
        // 将token设置到每个http请求的请求头
        config.headers.Authorization = localStorage.getItem('userToken')
        return config
    }, err => {
        stopLoadingAnimation()
        Notification({
            title: '似乎出现了些问题',
            message: '请检查网络或刷新网页',
            type: 'error'
        })
        return Promise.reject(err)
    }
)

request.interceptors.response.use(
    config => {
        stopLoadingAnimation()
        return config
    }, err => {
        stopLoadingAnimation()
        Notification({
            title: '似乎出现了些问题',
            message: '请检查网络或刷新网页',
            type: 'error'
        })
        const { status } = err
        if (status === 401) {
            Notification({
                title: 'token失效',
                message: '请重新登陆',
                type: 'error'
            })
            // 清除token,跳转到登陆页面
            localStorage.removeItem('userToken')
            router.push('/login')
        }
        return Promise.reject(err)
    }
)

export default request