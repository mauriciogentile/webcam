var navigation = require("../controllers/navigation");

module.exports = function(app) {
    app.get("/", navigation.home);
};