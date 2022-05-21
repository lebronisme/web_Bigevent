$(function () {
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    //密码验证
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (val) => {
      if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
    },
    rePwd: (val) => {
      if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
  });
  //监听form表单提交。发起ajax请求修改密码
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      //将数据进行序列化
      data: $(".layui-form").serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg("更新密码失败！");
        layer.msg("更新密码成功！");
        localStorage.removeItem("token");
        //当前window为iframe的页面顶级，父级为index页面，需要在index页面进行跳转
        window.parent.location.href = "/login.html";
      },
    });
  });
});
