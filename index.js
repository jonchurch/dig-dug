
const express = require('express') 
const bodyParser = require('body-parser')

const app = express()
const routes = require('./routes')

app.use(bodyParser.json())

app.use('/', routes)

app.set('port', process.env.PORT || 3000)
const port = app.get('port')
app.listen(port, () => console.log(`Express is running on port: ${port}`))
