const { Router } = require('express')
const router = Router()
const Category = require('../model/category')
const Attribute = require('../model/attribute')
const Slider = require('../model/slider')

// Categry List Api url: http://localhost:3003/api/category \\
router.get('/category', async(req, res) => {
    const activeCategory = await Category.find({ status: 1 }).lean()
    res.send(activeCategory)
})
router.get('/slider', async(req, res) => {
    const sliders = await Slider.find({ status: 1 }).lean();
    res.send(sliders)
    console.log(sliders)
})

router.get('/getcat/:id', async(req, res) => {
    let Attributes = await Attribute.find({ category: req.params.id }).lean()
    console.log(Attributes)
    res.send(Attributes)
})

module.exports = router