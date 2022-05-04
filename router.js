const {Router}=require('express')
const router=Router()
// const auth=require('./middleware/auth')
const pagerouter=require('./router/page')
const settings=require('./router/settings')
const project=require('./router/project')
const faqs=require('./router/faqs')
const attribute=require('./router/attribute')
const category=require('./router/category')
const user=require('./router/user')


router.use('/',pagerouter)
router.use('/category',category)
router.use('/attribute',attribute)
router.use('/settings',settings)
router.use('/faqs',faqs)
router.use('/project',project)
router.use('/user',user)

module.exports=router
