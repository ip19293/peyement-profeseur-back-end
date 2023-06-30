const Professeur = require("../models/professeur");
const Cours = require("../models/matiere");
const getProfesseurs = async (req, res) => {
  try {
    const professeur = await Professeur.find();
    res.status(200).json({
      status: "success",
      data: {
        professeur,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const addProfesseur = async (req, res) => {
  const data = req.body;
  try {
    const professeur = await Professeur.create(data);
    res.status(201).json({
      status: "success",
      data: {
        professeur: professeur,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const updateProfesseur = async (req, res, next) => {
  const id = req.params.id;
  const { nom, email, prenom, phoneNumber } = req.body;
  if (
    !nom &&
    nom.trim() == "" &&
    !email &&
    email.trim() == "" &&
    !prenom &&
    prenom.trim() == "" &&
    !phoneNumber &&
    phoneNumber.trim() == ""
  ) {
    return res.status(422).json({ message: "invalid data" });
  }
  let professeur;
  let professeur1;
  try {
    professeur = await Professeur.findByIdAndUpdate(id, {
      nom,
      email,
      prenom,
      phoneNumber,
    });
    professeur1 = await Professeur.findById(id);
  } catch (error) {
    return next(error);
  }
  if (!professeur) {
    return res.status(5000).json({ message: "inable to save professeur" });
  }
  return res.status(200).json({ professeur1 });
};

const deleteProfesseur = async (req, res) => {
  let professeur;
  try {
    const professeur = await Professeur.findById(req.params.id);
    // console.log("---------------" + professeur);
    // await professeur.remove();
    await Professeur.findByIdAndDelete(req.params.id);
    // await Cours.findByIdAndDelete(professeur.matiere);

    res.status(200).json({
      status: "success",
      message: "professeur ssucceffily delete",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
const addMatiereToProfesseur = async (req, res, next) => {
  const id = req.params.id;
  let professeur;
  let professeur1;
  let matieres1 = [];
  let matiere1;
  const { matieres } = req.body;

  try {
    professeur1 = await Professeur.findById(id);
    matieres1 = professeur1.matieres;
    matieres1.add(matieres);
    professeur = await Professeur.findByIdAndUpdate(id, {
      matieres,
    });
  } catch (error) {
    return next(error);
  }
  if (!professeur) {
    return res.status(5000).json({ message: "inable to find professeur" });
  }
  return res.status(200).json({ professeur });
};
const getProfesseurById = async (req, res, next) => {
  const id = req.params.id;
  let professeur;
  try {
    professeur = await Professeur.findById(id);
    return res.status(202).json({ message: "success", data: professeur });
  } catch (error) {
    return res.status(404).json({ message: "not found professeur" });
  }
};
exports.getProfesseeurCours = async (req, res) => {};
exports.getProfesseurById = getProfesseurById;
exports.getProfesseurs = getProfesseurs;
exports.addProfesseur = addProfesseur;
exports.updateprofesseur = updateProfesseur;
exports.deleteProfesseur = deleteProfesseur;
exports.addMatiereToProfesseur = addMatiereToProfesseur;
