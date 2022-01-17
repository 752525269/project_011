$.ajaxPrefilter(function(optinos){
    optinos.url='http://www.liulongbin.top:3007'+optinos.url

    if (optinos.url.indexOf('/my/') !== -1){
        optinos.headers={
            Authorization: localStorage.getItem('token') || ''
        } 
    }
    

    optinos.complete = function(res){
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    
})