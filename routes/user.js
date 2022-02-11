const express = require("express");
const router = express.Router();
const { userInfoController } = require("../controller/userInfo");
const authorizationMW = require("../middleware/authenticating-handler");
//routes
router.route("/user-info").get(authorizationMW, userInfoController);

module.exports = router;
