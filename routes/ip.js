var express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var router = express.Router();

router.post('/', (req, res) => {
    
    const filePath = './public/ip.txt';
    const newData = req.body.newText;

    /*
    fs.truncate(filePath, (err) => {
        if (err) throw err;
        console.log('File emptied successfully');
    });*/

    fs.writeFile(filePath, newData, (err) => {
        if (err) throw err;
        console.log('File updated successfully');
      });
    res.status(200).send('File updated successfully');
});

module.exports = router;