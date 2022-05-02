const Sequelize = require("sequelize");
const db = require("../db");

class Pages extends Sequelize.Model {}

Pages.init(
  {
    title: { type: Sequelize.STRING, allowNull: false },
    urlTitle: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    route: {
      type: Sequelize.VIRTUAL,
      get() {
        return `/wiki/${this.getDataValue("urlTitle")}`;
      },
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      set(values){
        const tags = values.split(',')
      }
    }
  },
  { sequelize: db, modelName: "Pages" }
);

Pages.addHook("beforeValidate", (page) => {
  page.urlTitle = page.title.replace(/\s+/g, "_").replace(/\W/g, "");
});

module.exports = Pages;
