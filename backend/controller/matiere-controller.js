const APIFeatures = require("../utils/apiFeatures");
const Matiere = require("../models/matiere");
const Professeur = require("../models/professeur");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.getMatieres = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.id) filter = { cours: req.params.id };
  const features = new APIFeatures(Matiere.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const matieres = await features.query;
  res.status(200).json({
    status: "success",
    data: {
      matieres: matieres,
    },
  });
});
exports.deleteAllMatieres = catchAsync(async (req, res, next) => {
  await Matiere.deleteMany();
  res.status(200).json({
    status: "success",
    message: "all matieres is deleted",
  });
});

exports.addMatiere = catchAsync(async (req, res, next) => {
  const data = req.body;

  const matiere = await Matiere.create(data);

  res.status(200).json({
    status: "success",
    data: {
      matiere: matiere,
    },
  });
});

exports.updateMatiere = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const matiere = await Matiere.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!matiere) {
    return next(new AppError("No Matiere found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    matiere: matiere,
  });
});

exports.deleteMatiere = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const matiere = await Matiere.findByIdAndDelete(id);
  if (!matiere) {
    return next(new AppError("No Matiere found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    message: "matiere ssucceffily delete",
  });
});

exports.getMatiereStats = catchAsync(async (req, res, next) => {
  const stats = await Matiere.aggregate([
    {
      $match: { prixParHeur: { $gte: 2000 } },
    },
    {
      $group: {
        _id: "$categorie",
        numMatieres: { $sum: 1 },
        avgPrixParHeur: { $avg: "$prixParHeur" },
        minPrixParHeur: { $min: "$prixParHeur" },
        maxPrixParHeur: { $max: "$prixParHeur" },
      },
    },
  ]);
  if (!stats) {
    return next(new AppError("aggregate fail", 404));
  }
  res.status(200).json({
    status: "success",
    message: stats,
  });
});
