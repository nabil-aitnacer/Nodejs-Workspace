var mod1 = require("./mode1");
mod1.setGlobal(34);
var val = mod1.getGlobal();
console.log(val)