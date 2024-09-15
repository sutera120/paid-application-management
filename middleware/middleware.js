const originalMiddleware = {
  getLoginUserInfo: (req, res, next) => {
    // ユーザーがログインしていればユーザー情報を取得
    loginUserName =
      typeof req.session.userName !== "undefined" ? req.session.userName : null;
    loginUserRole =
      req.session.userRole === "ADMIN" ? req.session.userRole : "USER";
    next();
  },
  checkRole: (req, res, next) => {
    // ユーザーのroleがadminが確認
    isAdmin = req.session.userRole === "ADMIN" ? true : false;
    next();
  },
  auth: (req, res, next) => {
    // ユーザーがログインしていなければ、ホームにリダイレクト
    if (typeof req.session.userId === "undefined") {
      res.redirect("/");
    } else {
      next();
    }
  },
};

module.exports = originalMiddleware;
