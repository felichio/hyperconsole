const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const https = require("https");
const html = require("html-minifier");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 8080;

const path = __dirname + "/";


// let privateKey = fs.readFileSync("./test/server.key");
// let certificate = fs.readFileSync("./test/server.crt");

// const options = {
//     key: privateKey,
//     cert: certificate,
//     passphrase: 
// };




app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path + "public"));


// Use middlewares
app.use(bodyParser());

app.get("/", (req, res) => {
    // res.render(path + "ejs/index.ejs", {
    //     user: {
    //         name: "test"
    //     }
    // })

    ejs.renderFile(path + "ejs/index.ejs", {
        user: {
            name: "test"
        }
    }, function (err, str) {
        res.send(html.minify(str, {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true
        }));
    });
});


// https.createServer(options, app).listen(port, () => {
//     console.log(`Server started successfully on port ${port}`);
// });




app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
});

