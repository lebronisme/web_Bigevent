$(function () {
  getUserInfo();
});

const layer = layui.layer;
//获取用户信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) return layer.msg("获取用户信息失败");
      layer.msg("获取用户信息成功");
      renderAvatar(res.data);
    },
  });
  //按需渲染头像
  const renderAvatar = (user) => {
    const name = user.nickname || user.username;
    $("#welcome").html(`欢迎${name}`);
    if (user.user_pic !== null) {
      $(".layui-nav-img").attr("src", user.user_pic).show();
      $(".text-avatar").hide();
    } else {
      $(".layui-nav-img").hide();
      const firstName = name[0].toUpperCase();
      $(".text-avatar").html(firstName).show();
    }
  };
}
