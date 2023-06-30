const mongoose = require("mongoose");
const Cours = require("../models/cours");
const Matiere = require("../models/matiere");
const professeurSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "nom of professeur is required"],
    },
    prenom: {
      type: String,
      required: [true, "prenom of professeur is required"],
    },

    mobile: {
      type: Number,
      required: [true, "mobile number is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
    },
    matieres: Array,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
professeurSchema.pre("save", async function (next) {
  const matieresPromises = this.matieres.map(
    async (id) => await Matiere.findById(id)
  );
  this.matieres = await Promise.all(matieresPromises);
  next();
});
// professeurSchema.pre("findByIdAndDelete, async function (next) {
//   console.log(
//     `+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=`
//   );
// next();
// const professeur = this;
// await Cours.deleteMany({ owner: professeur._id });
//   next();
// });
module.exports = mongoose.model("Professeur", professeurSchema);
