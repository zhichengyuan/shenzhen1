import axios from 'axios';
console.log('开始拦截')
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    var config = error.config;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // console.log("请求未认证，正在尝试认证。");
          var urlAuth = error.response.data;
          //认证完成之后重新请求资源
          authenicate(urlAuth, config.url).then(userLoginName => {
            // console.log("当前登陆用户是：" + userLoginName);
            window.currentLoginUser=userLoginName;
            return axios(config);
          });
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })

/**
 * 对于ajax跨域请求认证方法
 * @param authenticateUrl 授权url
 * @param requestUrl 请求url
 */
function authenicate(authenticateUrl, requestUrl) {
  var promise = new Promise((resolve, reject) => {
    //初始化认证信息对象
    if (window.toAuthenticateFrames == undefined) {
      window.toAuthenticateMetas = [];
    }
    // 认证信息包含三个部分，访问请求url、认证url、用于处理他们关系的defer
    var toAuthenticateMeta = {
      "authenticationUrl": authenticateUrl,
      "requestUrl": requestUrl,
      "resolve":resolve
    };
    toAuthenticateMetas.push(toAuthenticateMeta);
    if (toAuthenticateMetas[0].requestUrl = requestUrl) {
      window.authenicationFrame = createIframe(toAuthenticateMetas[0].authenticationUrl);
      console.log("Authentication Begin " + toAuthenticateMetas[0].requestUrl);
      if (window.closeLoginFrame == null) {
        window.closeLoginFrame = function (e) {
          // e.data存在，并且e.data就是普通的字符串类型才走该逻辑
          if (e.data&&e.data.indexOf) {
            //当收到dasc_authenticated时，表示认证已通过
            if (e.data.indexOf("DASC_CLOSE_IFRAME") === 0) {
              //删除认证窗体
              window.authenicationFrame.remove();
              //重新进行新的认证
              var toAuthenticateMeta = toAuthenticateMetas.shift();
              console.log("Authentication Success ", requestUrl);
              if (toAuthenticateMetas.length > 0) {
                window.authenicationFrame = createIframe(authenicationFrame[0].authenticationUrl);
                console.log("Authentication Begin " + toAuthenticateMetas[0].requestUrl);
              }
              // resolve(e.data.substring("DASC_CLOSE_IFRAME".length + 1));
              toAuthenticateMeta.resolve(e.data.substring("DASC_CLOSE_IFRAME".length + 1));
            };
          };
        }
        //监听iframe使用postMessage发送的message,仅仅在页面没有closeLoginFrame的时候进行监听
        window.addEventListener('message', closeLoginFrame, false);
      }
    }
  });
  return promise;
}

/**
 * 创建认证窗体Iframe，再同一时间仅仅允许创建一个iframe进行认证
 */
const createIframe = url => {
  //添加iframe对象到body中，遮盖整个页面
  //TODO 需要在top中打开
  var iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style = "height: 100%; width: 100%; position: fixed; top: 0; left: 0; z-index:9999";
  document.body.append(iframe);
  return iframe;
}
// console.log('拦截结束')