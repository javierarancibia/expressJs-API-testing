const express = require('express')
const router = express.Router() // Boilerplate to create a router
const { people } = require('../data.js')
const { getPeople, createPerson } = require("../controllers/people")

// GET method to get all people
router.get('/', getPeople) // Function imported from the Controllers


// POST method to add person to the People existing array 
router.post('/', createPerson) // Function imported from the Controllers


// Another way to chain the routes with their imported Functions from Controller in fewer lines
// router.route("/").get(getPeople).post(createPerson)




// Get method to get one person
router.get('/:id', (req, res) => {
    const { id } = req.params
    const person = people.find(person => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, message: "The person has not been found" })
    }
    const foundPerson = people.filter(person => person.id === Number(id))
    return res.status(200).json({ success: true, data: foundPerson })
})


// PUT method to update
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const chosenPersonIndex = people.findIndex(person => person.id === Number(id))
    if (!chosenPersonIndex) {
       return res.send(404).json({ success: false, message: `Person with id: ${id} not found` })
    }
    people[chosenPersonIndex].name = name
    return res.status(200).json(people)
})

// DELETE method
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const person = people.find(person => person.id === Number(id))
    if (!person) {
        return res.status(400).json({ success: false, message: "Person not Found" })
    }
    
    const filteredPeople = people.filter(person => person.id !== Number(id))
    return res.status(200).json(filteredPeople)
})

module.exports = router
