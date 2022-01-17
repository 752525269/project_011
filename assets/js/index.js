$(function(){
    // 调用 getUserInfo获取用户基本信息
    getUserInfo()
      
      
    // 退出按钮绑定点击事件
     var layer = layui.layer
    $('#btnLogout').on('click',function(){
        // 提示用户是否退出
        layer.confirm('确认退出登录吗 ？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'

            layer.close(index);
          });
    })

    
})

// 获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvater 渲染用户头像
            renderAvater(res.data)
        },

       
    })
}

// 渲染用户头像
function renderAvater(user){
    // 获取用户昵称
    var name = user.nickname || user.username
    $('#veicome').html('欢迎&nbsp;&nbsp ' +name)
    
    // 按需渲染用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}