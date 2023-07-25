const express = require("express");
const rootPath = require("app-root-path");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

const orgMiddleware = require(rootPath + "/middleware/middleware.js");
const auth = orgMiddleware.auth;

// });

// router.get("/", (req, res) => {
//     res.render("home");
// });

// メニュー一覧表示
router.get("/", auth, async (req, res) => {
  res.render("paid_vacation/index");
});

// 新規作成
router.get("/register", auth, (req, res) => {
  const pageType = "input";
  res.render("paid_vacation/register", { user: req.query, pageType: pageType });
});

router.post("/register", async (req, res) => {
  const { applicationDays, reason } = req.body;
  const applicantId = req.session.userId;
  console.log(req.session.userId);
  const createPaidVacation = await prisma.paidVacation.create({
    data: {
      applicantId: applicantId,
      applicationDays: new Date(applicationDays),
      applicationReason: reason,
    },
  });
  console.log("申請完了");
  res.redirect("/paid-vacation");
});

//取得処理
router.get("/list", auth, async (req, res) => {
  id = req.session.userId;
  orderType = req.query.orderType === "asc" ? "asc" : "desc";
  console.log(orderType);
  userName = req.session.userName;
  const allLists = await prisma.paidVacation.findMany({
    where: {
      applicantId: id,
    },
    select: {
      applicationDays: true,
      applicationReason: true,
    },
    orderBy: {
      applicationDays: orderType,
    },
  });
  res.render("paid_vacation/list", { lists: allLists, userName: userName, orderType: orderType });
});

// router.post('/edit/', async (req, res) => {
//     const { id, title, body } = req.body;
//     const editItem = await prisma.post.update({
//         /**更新レコードを指定 */
//         where: {
//             id: Number(id),
//         },
//         /**更新内容 */
//         data: {
//             title: title,
//             body: body,
//         },
//     })
//     console.log(editItem);
//     res.redirect('/posts');
// });

// //削除
// router.post('/delete', async (req, res) => {
//     const { id, } = req.body;
//     const editItem = await prisma.post.delete({
//         /**更新レコードを指定 */
//         where: {
//             id: Number(id),
//         },
//     });
//     res.redirect('/posts');
// });

module.exports = router;
