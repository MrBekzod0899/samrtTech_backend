const { Router } = require('express')
const router = Router()
const Category = require('../model/category')
const Attribute = require('../model/attribute')
const Slider = require('../model/slider')
const Product = require('../model/product')

// Categry List Api url: http://localhost:3003/api/category \\
router.get('/category', async(req, res) => {
    const activeCategory = await Category.find({ status: 1 }).lean()
    res.send(activeCategory)
})
router.get('/slider', async(req, res) => {
    const sliders = await Slider.find({ status: 1 }).lean();
    res.send(sliders)
})


router.get('/getcat/:id', async(req, res) => {
    let Attributes = await Attribute.find({ category: req.params.id }).lean()
    res.send(Attributes)
})

router.get('/getproducts/:id', async(req, res) => {
        let Products = await Product.find({ category: req.params.id }).populate('category').populate('attributes.attribut').lean()
        res.send(Products)
    })
    //get product
router.get('/getproducts', async(req, res) => {
    let Products = await Product.find().populate('category').populate('attributes.attribut').lean()
    res.send(Products)
})
module.exports = router