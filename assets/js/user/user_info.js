$(function () {
  const form = layui.form;
  const layer = layui.layer;
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });
  初始化用户的基本信息;
  const initUserinfo = function () {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) return layer.msg("获取用户信息失败");
        layer.msg("获取用户数据成功");
        //为表单快速赋值
        form.val("formUserInfo", res.data);
      },
    });
  };
  initUserinfo();

  //?实现重置功能
  $("#btnReast").click(function (e) {
    //   阻止默认时间  防止清空所有的内容
    e.preventDefault();
    // 恢复为初始化状态
    initUserinfo();
  });
  //更新用户信息
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("更新用户信息失败！");
        layer.msg("更新用户信息成功！");
        //这里的window指的是iframe页面，其父页面是index
        window.parent.getUserInfo();
      },
    });
  });
});
