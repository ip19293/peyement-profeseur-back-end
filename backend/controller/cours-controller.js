const APIFeatures = require("../utils/apiFeatures");
const Cours = require("../models/cours");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.getCours = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.id) filter = { cours: req.params.id };
  //EXECUTE QUERY
  const features = new APIFeatures(Cours.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const cours = await features.query;
  res.status(200).json({
    status: "success",
    data: {
      cours: cours,
    },
  });
});

exports.getOneCours = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const cours = await Cours.findById(id);
  if (!cours) {
    return next(new AppError("No cours found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      cours: cours,
    },
  });
});

exports.addCours = catchAsync(async (req, res, next) => {
  const data = req.body;
  const newCours = await Cours.create(data);
  res.status(201).json({
    status: "success",
    data: {
      cours: newCours,
    },
  });
});

exports.updateCours = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const cours = await Cours.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!cours) {
    return next(new AppError("No cours found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      cours: cours,
    },
  });
};

exports.deleteCours = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const cours = await Cours.findByIdAndDelete(id);
  if (!cours) {
    return next(new AppError("No cours found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    message: "cours ssucceffily delete",
  });
});
