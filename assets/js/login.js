$(function(){
    // 点击去注册按钮
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录按钮
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          repss:function(value){
              var pass = $('.reg-box [name=password]').val()
              if(pass !== value){
                return alert('两次输入密码不一致!')  
            }
          }
    })

    //监听注册表单的提交事件	
$('#form_reg').on('submit', function(e){
    e.preventDefault()
    // 发起aiax请求
    var data = { username:$('#classname').val(), password: $('#classpassword').val()}
    $.post('/api/reguser',data,function(res){ if (res.status !== 0){
    return layer.msg(res.message)
        }   
        layer.msg('注册成功，请登录！')
        $('#link-login').click()
      })
   })
   //监听登录表单的提交事件
   $('#form_login').submit(function(e){
       e.preventDefault()
       $.ajax({
           url:'/api/login',
           method:'POST',
           data:$(this).serialize(),
           success:function(res){
               if(res.status !== 0){
                   return layer.msg('登录失败！')
                   
               }
               layer.msg('登录成功!')
               localStorage.setItem('token',res.token)
            //跳转到后台
               location.href = '/index.html'
           }
       })
   })
})