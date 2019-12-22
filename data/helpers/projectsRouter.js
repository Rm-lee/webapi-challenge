const express = require('express')

const Projs = require('./projectModel.js')
const actions = require('./actionModel.js')

const router = express.Router()

router.get('/', (req,res) => {
    console.log(req.query)

    Projs.get(req.query.id)
    .then(projs => {
        res.status(200).json(projs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "There was an error retrieving projects"
        })
    })
})

module.exports = router