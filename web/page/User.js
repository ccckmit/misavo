const User = {}

User.isLogin = function () {
  return Shared.user != null
}

User.getName = function () {
  if (Shared.user == null) return null
  return Shared.user.name
}

User.googleLogin = async function () {
  var gUser = await Fire.googleLogin()
  if (gUser != null) {
    let user = {uid: gUser.uid, name: gUser.displayName, email: gUser.email}
    Ui.id('userName').innerHTML = user.name
    Shared.user = user
    Local.save('User', user)
    Ui.show('<h1>您已登入成功！</h1>')
    return user
  }
}
