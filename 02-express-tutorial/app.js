const express = require('express')
const app = express()
const {products} = require('./data.js')

app.get('/',(req,res)=>{
    res.send('<h1>home page</h1><a href="/api/products">products</a>')
})
app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product) => {
        const {id,name,image} = product
        return {id,name,image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productId',(req,res)=>{
    const {productId} = req.params
    const singleProduct = products.find((product) => product.id === Number(productId))
    if(!singleProduct) {
        return res.status(404).send('product does not exist')
    }
    res.json(singleProduct)
})

app.all('*',(req,res)=>{
    res.status(404).send('resource not found')
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})









// const http = require('http')
// const {readFileSync} = require('fs')

// const homePage = readFileSync('./navbar-app/index.html')
// const homeStyles = readFileSync('./navbar-app/styles.css')
// const homeImage = readFileSync('./navbar-app/logo.svg')
// const homeLogic = readFileSync('./navbar-app/browser-app.js')

// const server = http.createServer((req, res) => {
//     // console.log("hit server")
//     const url = req.url
//     if(url === '/'){
//         res.writeHead(200,{'content-type':'text/html'})
//         res.write(homePage)
//         res.end()
//     }
//     else if(url === '/styles.css'){
//         res.writeHead(200,{'content-type':'text/css'})
//         res.write(homeStyles)
//         res.end()
//     }
//     else if(url === '/logo.svg'){
//         res.writeHead(200,{'content-type':'image/svg+xml'})
//         res.write(homeImage)
//         res.end()
//     }
//     else if(url === '/browser-app.js'){
//         res.writeHead(200,{'content-type':'text/javascript'})
//         res.write(homeLogic)
//         res.end()
//     }
//     else if(url === '/about'){
//         res.writeHead(200,{'content-type':'text/html'})
//         res.write('<h1>about</h1>')
//         res.end()
//     }
//     else {
//         res.writeHead(404,{'content-type':'text/html'})
//         res.write('<h1>page not found</h1>')
//         res.end()
//     }
// })

// server.listen(5000)