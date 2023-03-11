const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
// rutas
/*const sqlite = require('./rutas/sqlite')
const graficos = require('./rutas/graficos')
const sqlitemaster = require('./rutas/sqlitemaster')*/
// Configuración
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// static files
app.use(express.static(path.join(__dirname, './docs')))
// routes
/*app.use(sqlite)
app.use(graficos)
app.use(sqlitemaster)*/
//app.use(crud)
// ARRANQUE SERVIDOR
app.listen(app.get('port'), () => {
  console.log(`Servidor en puerto -  ${app.get('port')}`)
})

