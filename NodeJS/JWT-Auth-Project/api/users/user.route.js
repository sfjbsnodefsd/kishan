const {createUser,deleteUser, login} = require("../users/user.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/",createUser)
router.delete("/", checkToken, deleteUser);
router.post("/login", login);


module.exports = router;