const express = require('express')
const app = express()

app.use(express.static(__dirname+ 'dist/dungeons-and-coder'))
app.get('/*', function(re,res){
  res.sendFile('index.html', {root: __dirname + 'dungeons-and-coder'})
})
app.listen(process.env.PORT || 8080)