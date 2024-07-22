/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est deja pris",
        },
        validate: {
          notEmpty: {
            msg: "Le nom du pokemon ne peut pas etre vide",
          },
          notNull: { msg: "Le nom du pokemon est une propriété  requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nomnres entiers pour les points de vies",
          },
          notNull: { msg: "Les Points de vie sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les Points de vie ne doivent pas être inferieur a 0",
          },
          max: {
            args: [999],
            msg: "Les Points de vie ne doivent pas être superieur a 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nomnres entiers pour les degâts",
          },
          notNull: { msg: "Les Points de degâts sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les Points de degâts ne doivent pas être inferieur a 0",
          },
          max: {
            args: [99],
            msg: "Les Points de degâts ne doivent pas être superieur a 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Entrez une Url valide",
          },
          notNull: { msg: "L'image est une propriété requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,

        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },

        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit avoir au moins un type.");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokemon ne peut pas avoir plus de trois types."
              );
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type de pokemon doit appartenir a la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
