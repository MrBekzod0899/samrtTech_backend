const { Router, request } = require("express");
const router = Router()
const Category = require('../model/category')
const Attribute = require('../model/attribute')
const Product = require('../model/product')
const upload = require('../middleware/file')

router.get('/', async(req, res) => {
    let categories = await Category.find({ status: 1 }).lean()
    let newProducts = await Product.find().populate('category').populate('attributes.attribut').lean()
    res.render('page/product/product', {
        title: 'Our Products',
        isProduct: true,
        categories,
        newProducts
    })
})

router.post('/', upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
    { name: 'img4', maxCount: 1 },
]), async(req, res) => {
    let { title, price, sale, category, attributes, text, order, top, status, news } = req.body
    let photos = []
    if (req.files) {
        let { img1, img2, img3, img4 } = req.files
        if (img1) {
            photos.push(img1[0].path)
        }
        if (img2) {
            photos.push(img2[0].path)
        }
        if (img3) {
            photos.push(img3[0].path)
        }
        if (img4) {
            photos.push(img4[0].path)
        }
    }
    status = status || 0
    order = order || 0
    news = news || 0
    top = top || 0
    attributes = JSON.parse(attributes)
    let newProduct = await new Product({
        title,
        price,
        sale,
        text,
        order,
        status,
        top,
        news,
        category,
        attributes,
        photos
    }).populate('category')
    await newProduct.save()
    res.redirect('/product')
})


router.get('/delete/:id', async(req, res) => {
    let _id = req.params.id;
    await Product.findOneAndDelete({ _id })
    res.redirect('/product')
})

router.get('/status/:id', async(req, res) => {
    let _id = req.params.id
    let statusProduct = await Product.findById(_id).lean()
    statusProduct.status = statusProduct.status == 1 ? 0 : 1
    await Product.findByIdAndUpdate(_id, statusProduct)
    res.redirect('/product')
})


router.get('/get/:id', async(req, res) => {
    let _id = req.params.id
    let editProduct = await Product.findOne({ _id }).lean()
    res.send(editProduct)
})

router.post('/save', async(req, res) => {
    let { _id, title, order, status, category } = req.body
    status = status || 0
    await Product.findByIdAndUpdate(_id, { title, order, status, category })
    res.redirect('/product')
})



module.exports = router