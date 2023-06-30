const mongoose = require("mongoose");

const coursSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "type is required"],
      enum: {
        values: ["CM", "TD", "TP"],
        message: "{VALUE} is not supported",
      },
    },
    date: {
      type: Date,
      default: Date.now(),
      required: [true, "date is required"],
    },
    heures: {
      type: Number,
      required: [true, "nombres d'heures is required"],
      default: 1.5,
    },

    professeur: {
      type: mongoose.Schema.ObjectId,
      ref: "Professeur",
      required: [true, "professeur is required"],
    },
    matiere: {
      type: mongoose.Schema.ObjectId,
      ref: "Matiere",
      required: [true, "matiere is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

coursSchema.index({ date: 1, matiere: 1 }, { unique: true });
coursSchema.index({ date: 1, professeur: 1 }, { unique: true });

module.exports = mongoose.model("Cours", coursSchema);
