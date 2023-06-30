const express = require("express");

const professeurController = require("../controller/professeur-controller");
const coursController = require("../controller/cours-controller");
const router = express.Router();

router
  .route("/")
  .get(professeurController.getProfesseurs)
  .post(professeurController.addProfesseur);
router.param("id", (req, res, next, val) => {
  console.log(`id de professeur est ${val}`);
  next();
});
router
  .route("/:id")
  .post(professeurController.addMatiereToProfesseur)
  .get(professeurController.getProfesseurById);
router.get("/:id", professeurController.addMatiereToProfesseur);
router.delete("/:id", professeurController.deleteProfesseur);
router.route("/:id/cours").get(coursController.getCours);
module.exports = router;
