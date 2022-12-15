// const http = require('http')
// const { readFileSync } = require('fs')

// const homePage = readFileSync('./index.html')
// const server = http.createServer((req, res) => {
//     const url = req.url
//     if (url === '/') {
//         res.writeHead(200, { 'content-type': 'text/html'})
//         res.end(homePage)
//     } else if (url === '/about') {
//         res.writeHead(200, { 'content-type': 'text/html'})
//         res.end('<h1 style="color:brown;" >About</h1>')
//     } else {
//         res.writeHead(400, { 'content-type': 'text/html'})
//         res.end('<h1 style="color: red;" >404 page</h1>')
//     }

// })

// server.listen(8000)

const express = require('express')
const app = express()
const { products } = require('./data.js')

// Call to get home pagedata
app.get('/', (req, res) => {
    res.status(200)
    res.send("<h1>Home Page</h1> <a href='/api/products'>Products</a>")
})

// Call to get all Products
app.get('/api/v1/products', (req, res) => {
    const filteredProducts = products.map(prod => {
        return { // Map to get only the necessary data from the api, leaving out the desc
            id: prod.id,
            name: prod.name,
            image: prod.image,
        }
    })
    res.json(filteredProducts)
    
})

// Call to get ONe single Product data
app.get('/api/v1/products/:id', (req, res) => {
    const productID = req.params.id
    const singleProduct = products.find(prod => prod.id === parseInt(productID))
    if (!singleProduct) {
        return res.status(400).send('Product not found')
    }
    res.json(singleProduct)
})

// Query string
app.get('/api/v1/query', (req, res) => { // Example of query string: /api/v1/query?search=M&limit=2
    const { search, limit } = req.query
    let sortedProducts = [ ...products ] // Variable is a copy of original data

    if (search) { // First checks is search is defined and filters the copy of the data. Then follows the next step because it does not return a response yet
        sortedProducts = sortedProducts.filter(prod => prod.name.startsWith(search))
    }
    if (limit) { // Second it checks if a limit is defined
        sortedProducts = sortedProducts.slice(0, parseInt(limit))
    }
    if (sortedProducts.length < 1) {
        // return res.status(200).send("<h2>Product not found</h2>")
        return res.status(200).json({ success: true, message: "No products were found with the given parameters"})
    }
    // Return the final response after the data variable copy passes the three previous filters 
    return res.status(200).json(sortedProducts)
})


// 404 response
app.all('*', (req, res) => {
    res.status(400).send('<h1 style="color:red;">Resource not found</h1>')
})

// Server listen
app.listen(5000, () => {
    console.log('server is listening on port 5000')
})