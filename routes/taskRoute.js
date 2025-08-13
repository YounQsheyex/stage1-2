const router = require("express").Router();
const {
  allTasks,
  createTask,
  update,
  deleteTask,
  singleTask,
} = require("../controllers/taskController.js");

const {
  verifytoken,
  authorizedRoles,
} = require("../middlewares/authMiddleware.js");

router.post("/newTask", verifytoken, authorizedRoles("admin"), createTask);
router.get("/allTask", verifytoken, authorizedRoles("admin", "user"), allTasks);
router.get(
  "/singleTask/:id",
  verifytoken,
  authorizedRoles("admin"),
  singleTask
);
router.patch("/editTask/:id", verifytoken, authorizedRoles("admin"), update);
router.delete(
  "/deleteTask/:id",
  verifytoken,
  authorizedRoles("admin"),
  deleteTask
);
module.exports = router;
