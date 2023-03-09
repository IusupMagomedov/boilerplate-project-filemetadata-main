const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
var cors = require('cors');
require('dotenv').config()


// calling body-parser to handle the Request Object from POST requests
var bodyParser = require('body-parser');


const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'),  (req, res) => {
  // console.log("Filename in the post function: ", req.body.upfile)
  // upload.single(req.')
  const result = {
    "name":req.file.originalname,
    "type":req.file.mimetype,
    "size":req.file.size
  }
  // console.log(req.file)
  // req.body сохранит текстовые поля, если они будут
  res.json(result)
})





const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
