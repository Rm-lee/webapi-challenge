const express = require('express')

const Projs = require('./projectModel.js')
const Actions = require('./actionModel.js')

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

router.get('/', (req,res) => {
    console.log(req.query)

    Projs.get()
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

router.post('/', (req,res) => {
    Projs.insert(req.body)
    .then(projs => {
        res.status(201).json(projs)

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'error adding project'
        })
    })
})

router.put('/:id',(req,res) => {
Projs.update(req.params.id,req.body)
.then(projs => {
    if (projs) {
        res.status(200).json(projs)
    }
    else {
        res.status(404).json({
            message: "Project Not found"
        })

    }
    
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        message: "There was an error Updating Project"
    })
})
})

router.delete('/:id', (req,res) => {
    Projs.remove(req.params.id)
    .then(del => {
        res.status(200).json(del)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "and error occured while trying to delete"})
    })
})

router.get('/actions', (req,res) => {
    Actions.get()
    .then(acts => {
        res.status(200).json(acts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message:"there was an error getting actions"
        })
    })
})
router.post('/actions',(req,res) => {
    console.log(req.body.project_id)
    if(Projs.get(req.body.project_id)){

    Actions.insert(req.body)
    .then(acts => {
        res.status(201).json(acts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "there was an error creating the action"})
    })
}else{
    res.status(404).json({
        message: "projectId does not exist"
    })
}
})
module.exports = router