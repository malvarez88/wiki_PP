const Sequelize = require("sequelize")
const db = require("../db")

class Pages extends Sequelize.Model {}

Pages.init({
    title: { type:
        Sequelize.STRING,
        allowNull: false },
    urlTitle: {type:
        Sequelize.STRING,
        allowNull: false },
    content: {type:
        Sequelize.TEXT,
        allowNull: false },
},{ hooks: {
    beforeValidate: (title) => {
        Pages.urlTitle = title.replace(" ", "_");
    },
}},
    { sequelize: db, modelName: "Pages" })

module.exports = Pages;