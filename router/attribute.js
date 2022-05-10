const { Router } = require('express')
const router = Router()
const Category = require('../model/category')
const Attributes = require('../model/attribute')
const upload = require('../middleware/file')

router.get('/', async(req, res) => {
    let categories = await Category.find({ status: 1 }).lean()
    let newAttribute = await Attributes.find().populate('category').lean()

    newAttribute = newAttribute.map(attribute => {
        attribute.status === 1 ?
            attribute.status = `<span class="badge badge-pill badge-success">faol</span>` :
            attribute.status = `<span class="badge badge-pill badge-danger">no faol</span>`
        return attribute
    })
    res.render('page/attribute/attribute', {
        title: 'Attribute',
        isAttribute: true,
        categories,
        newAttribute
    })
})

router.post('/', async(req, res) => {
    let { title, order, status, category } = req.body
    status = status || 0
    let newAttributes = await new Attributes({ title, order, status, category }).populate('category')
    await newAttributes.save()
    res.redirect('/attribute')
})


router.get('/delete/:id', async(req, res) => {
    let _id = req.params.id;
    await Attributes.findOneAndDelete({ _id })
    res.redirect('/attribute')
})

router.get('/status/:id', async(req, res) => {
    let _id = req.params.id
    let statusAttributes = await Attributes.findById(_id).lean()
    statusAttributes.status = statusAttributes.status == 1 ? 0 : 1
    await Attributes.findByIdAndUpdate(_id, statusAttributes)
    res.redirect('/attribute')
})


router.get('/get/:id', async(req, res) => {
    let _id = req.params.id
    let editAttributes = await Attributes.findOne({ _id }).lean()
    res.send(editAttributes)
})

router.post('/save', async(req, res) => {
    let { _id, title, order, status, category } = req.body
    status = status || 0
    await Attributes.findByIdAndUpdate(_id, { title, order, status, category })
    res.redirect('/attribute')
})


module.exports = router