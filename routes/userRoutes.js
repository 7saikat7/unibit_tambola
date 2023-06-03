const { Router } = require("express");
const router = Router();
const controller = require("../controllers/userController");
const ticketController = require("../controllers/ticket")
const validateToken = require("../middlewares/validateToken");

router.post("/register", controller.registerHandler);
router.post("/login", controller.loginHandler);

router.get("/allUser",controller.allUserHandler);
router.post("/ticket",validateToken,ticketController.createTicket);
router.get("/ticket",validateToken,ticketController.getAllTicket);

module.exports = router;
