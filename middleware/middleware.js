const originalMiddleware = {
  getLoginUserName: (req, res, next) => {
    // ユーザーがログインしていれば、ユーザー名を取得
    loginUserName =
      typeof req.session.userName !== "undefined" ? req.session.userName : null;
    next();
  },
  auth: (req, res, next) => {
    // ユーザーがログインしていなければ、ホームにリダイレクト
    if (typeof req.session.userId === "undefined") {
      console.log(req.session.userId);
      res.redirect("/");
    } else {
      next();
    }
  },
};

module.exports = originalMiddleware;
