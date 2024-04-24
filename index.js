var express = require('express');
var cors = require('cors');
const multer = require('multer')
require('dotenv').config()

let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
})

const upload = multer({ storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
	if (!req.file) res.json({ message: 'No file' })

	// file data 
	let name = req.file.originalname
	let type = req.file.mimetype
	let size= req.file.size

	res.json({name,type,size})
})




const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Your app is listening on port ' + port)
});
