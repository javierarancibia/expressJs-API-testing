const { people } = require("../data.js")


const getPeople = (req, res) => {
    res.status(200).json([ ...people, { success: true, message: "Successful call" }])
}

const createPerson = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: "Please provide a name value" })
    }
    return res.status(201).json({ succes: true, data: [ ...people, { name: name }  ] })
}

module.exports = { getPeople, createPerson }