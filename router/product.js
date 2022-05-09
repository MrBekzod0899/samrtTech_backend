const { Router, request } = require("express");
const router = Router()
const Category = require('../model/category')
const Attribute = require('../model/attribute')
const Product = require('../model/product')
const upload = require('../middleware/file')

router.get('/', async(req, res) => {
    let categories = await Category.find({ status: 1 }).lean()
    let newProducts = await Product.find().populate('category').populate('attributes.attribut').lean()
        // let Attributes= await Attribute.find().populate('category').lean()
    res.render('page/product/product', {
        title: 'Our Products',
        isProduct: true,
        categories
    })
})

router.post('/', async(req, res) => {
    let { title, order, status, category } = req.body
    console.log(category)
    status = status || 0
    let newProduct = await new Product({ title, order, status, category }).populate('category')
    await newProduct.save()
    res.redirect('/attribute')
})


router.get('/delete/:id', async(req, res) => {
    let _id = req.params.id;
    console.log(_id)
    await Product.findOneAndDelete({ _id })
    res.redirect('/attribute')
})

router.get('/status/:id', async(req, res) => {
    let _id = req.params.id
    let statusProduct = await Product.findById(_id).lean()
    statusProduct.status = statusProduct.status == 1 ? 0 : 1
    await Product.findByIdAndUpdate(_id, statusProduct)
    res.redirect('/attribute')
})


router.get('/get/:id', async(req, res) => {
    let _id = req.params.id
    let editProduct = await Product.findOne({ _id }).lean()
    res.send(editProduct)
})

router.post('/save', async(req, res) => {
    let { _id, title, order, status, category } = req.body

    console.log(req.body)
    status = status || 0
    await Product.findByIdAndUpdate(_id, { title, order, status, category })
    res.redirect('/product')
})



module.exports = router