// create router
const router = require('express').Router()

// import models
const db = require('../models')

// GET /bounties
router.get('/', (req,res)=>{
    //get all the bounties
    db.Bounty.find()
    .then(foundBounties =>{
        console.log(foundBounties)
        res.send(foundBounties)
    })
    .catch(err =>{
        console.log(err)
        //503 = service unavailable
        res.status(503).send({message: 'database error'})
    })
    //res.send('You have reached the GET /bounties route!')
})

router.get('/:id', (req,res)=>{
    db.Bounty.findById(req.params.id)
    .then(foundBounty =>{
        if(foundBounty){
            res.send(foundBounty)
        } else {
            res.status(404).send({message: 'Resource not located.'})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Unavailable'})
    })
    // res.send('You have reached the GET id /bounties route!')
})

router.post('/', (req, res)=>{
    db.Bounty.create(req.body)
    .then(createBounty=>{
        res.status(201).send(createBounty)
    })
    .catch(err=>{
        console.log('error creating new bounties', err)
        if(err.name === 'Validation Error'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: 'Database or server error'})
        }
    })
    //res.send('POST boundies route')
})

router.put('/:id', (req,res)=>{
    db.Bounty.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedBounty=>{
        res.send(updatedBounty)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
    // res.send('PUT update id route')
})

//delete /bounties
router.delete('/', (req, res)=>{
    db.Bounty.deleteMany()
    .then(()=>{
        res.send({message: 'They are all gone!'})
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})

router.delete('/:id', (req, res)=>{
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
    // res.send('Delete id route')
})

// export these routes so they can be used in index.js
module.exports = router