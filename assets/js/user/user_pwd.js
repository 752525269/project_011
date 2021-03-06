$(function(){
    var form = layui.form

    form.verify({
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

          samepass:function(value){
              if(value === $('[name=oldPwd]').val()){
                  return '新旧密码不能相同'
              }
          },
           repass:function(value){
               if(value!==$('[name=newPwd]').val()){
                   return '两次密码不同'
               }
           }
    })

    // 重置密码表单绑定事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        // 发ajax请求
        $.ajax({
            method:'POST',
            url :'/my/updatepwd',
            data :$(this).serialize(),
            success :function(res){
                if(res.status !== 0){
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                // 清空表单
                $('.layui-form')[0].reset()
            }
        })
    })

})