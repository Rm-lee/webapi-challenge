const express = require('express')
const server = express()
const projectsRouter = require('./data/helpers/projectsRouter.js')
server.use(express.json())
server.use('/api/projects', projectsRouter)

module.exports = server