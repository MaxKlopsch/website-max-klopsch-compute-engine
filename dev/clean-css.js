const fs = require('fs');
const CleanCSS = require('clean-css');
let files = fs.readdirSync('public/css');
files = files.filter(file => file.indexOf('.min.css') === -1);
for (file of files) {
    const input = fs.readFileSync(`public/css/${file}`);
    const options = { /* options */ };
    const output = new CleanCSS(options).minify(input);
    fs.writeFileSync(`public/css/${file.slice(0, -4)}.min.css`, output.styles);
}
