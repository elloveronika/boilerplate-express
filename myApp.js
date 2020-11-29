var express = require("express")
var app = express()
process.env.MESSAGE_STYLE = "uppercase"

// --> 7)  Mount the Logger middleware here

// --> 11)  Mount the body-parser middleware  here

app.use(express.static(__dirname + "/public"))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" })
  } else {
    res.json({ message: "Hello json" })
  }
})

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString()
    next()
  },
  function (req, res) {
    res.json({ time: `${req.time}` })
  }
)

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word })
})

app.route("/name").get((req, res) => {
  console.log(req.query)
  const { first: firstname, last: lastname } = req.query
  res.json({ name: `${firstname} ${lastname}` })
})

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app
