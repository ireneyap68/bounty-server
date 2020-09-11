const mongoose = require('mongoose')

//comments
const commentSchema = new mongoose.Schema({
    author: {
        typr: String,
        default: "Anonymous"
    },
    content: String,
    date: Date
})

//posts
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    comments: [commentSchema]
})

module.exports = mongoose.model('Post', postSchema)

//how to add a comment to a post
const post = new post({title: "Cool Cats", body: "O'Malley takes the cake!"})
post.comments.push({ content: "This is content", date: Date.now() })
post.save().then(()=>{
    //stuff
})

//Delete a comment
post.findById(req.params.id).then(post =>{
    post.id(req.params.commentId).remove()
    post.save()
})

//*--- Referencing Documents --- *//
// orders.js
const orderSchema = new mongoose.Schema({
    orderDate: Date,
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

//products.js
// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     price: Number
// })

const Order = mongoose.model('Order', orderSchema)

// as export default
const Product = mongoose.model('Product', productSchema)

//access all products
Order.findById(id).populate('products').then(order =>{
    console.log(order.products)
})

let newOrder = new Order({date: Date.now()})
let newProduct = new Product({ name: 'bearings', price: 30 })
newOrder.products.push(newProduct)
newOrder.products.push(new Product({ name: 'wheels', price: 80 }))
order.save()