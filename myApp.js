require('dotenv').config()
let bodyParser = require('body-parser')
let express = require('express');
let app = express();

// app.use((req, res, next) => {console.log(req.method+" "+req.path+" - "+req.iq);next();});


app.use((req, res, next) => {

  let string = `${req.method} ${req.path} - ${req.ip}`
  console.log(string)
  next();

});

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/now', function (req, res, next) {
  next();
}, function (req, res) {
  req.time = new Date().toString()
  res.send({ time: req.time });
});

// app.get('/', (req, res) => {
//     res.send('Hello Express')
// })

console.log('dirnmae', __dirname)

const absolutePath = __dirname + '/views/index.html'
app.get('/', (req, res) => {
  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
  console.log('env', process.env.MESSAGE_STYLE)
  const message = "Hello json"
  const styleMessage = process.env.MESSAGE_STYLE
  if (styleMessage === 'uppercase') {
    res.json({ "message": message.toUpperCase() })
  } else {
    res.json({ "message": message })
  }
})

// Input parameter
app.get('/:word/echo', (req, res) => {
  const { word } = req.params
  res.json({ echo: word })
})

// Input query
app.get('/name', (req, res) => {
  const { first, last } = req.query
  res.json({ name: `${first} ${last}` })
})

app.post('/name', (req, res) => {
  const { first, last } = req.body
  res.json({ name: `${first} ${last}` })
})

app.use('/', express.static(__dirname + '/public'))

























module.exports = app;
