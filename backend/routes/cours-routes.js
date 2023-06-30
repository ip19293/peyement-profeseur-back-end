const express = require("express");
const {
  getCours,
  addCours,
  deleteCours,
  getOneCours,
  updateCours,
} = require("../controller/cours-controller");

const CoursRouter = express.Router();
CoursRouter.route("/").get(getCours).post(addCours);

CoursRouter.route("/:id")
  .delete(deleteCours)
  .get(getOneCours)
  .patch(updateCours);

module.exports = CoursRouter;
