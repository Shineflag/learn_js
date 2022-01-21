const  nunjucks = require("nunjucks")


nunjucks.configure('njk', { autoescape: true });
console.log(nunjucks.render("api.njk",{TABLE_LABEL:'学生'}))
