const mongoose = require("mongoose");

const matiereSchema = mongoose.Schema(
  {
    matiere: {
      type: String,
      required: [true, "matiere nom is required"],
      unique: true,
      trim: true,
      message: "matiere is String",
    },
    categorie: {
      type: String,
      required: [true, " categorie is required"],
      enum: {
        values: ["Informatique", "Mathematique", "Langage", "Autre"],
        message: `the valid enum values is Informatique, Mathematique, Langage, Autre`,
      },
      trim: true,
    },
    prixParHeur: {
      type: Number,
      required: [true, "prix is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Matiere", matiereSchema);
