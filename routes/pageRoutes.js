const express = require('express');
const path = require('path');
const {showHomePage, showShopPage, showSingleBlogPage, shopSinglePage, showAdminPage } = require('../controllers/pageControllers'); 
const {productDataStore, showproductCreatePage, showproductPage, viewSingleproductAdmin, deleteSingleproduct, editSingleproduct, updateSingleproduct} = require('../controllers/productController')
const multer = require('multer');
const { sliderPage, createslider, sliderDataStore, deleteSlider, editSlider, updateSlider } = require('../controllers/sliderController');

// init router
const router = express.Router();

// multer config
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const productPhotoMulter = multer({
    storage : storage
}).single('pphoto');



// config multer for sliders
const sliderStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/sliders'));
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const sliderPhotoMulter = multer({
    storage : sliderStorage
}).single('sphoto')


// routes
router.post('/admin/product/createproduct', productPhotoMulter, productDataStore);
router.get('/', showHomePage);
router.get('/shop', showShopPage);
router.get('/admin', showAdminPage);
router.get('/admin/product', showproductPage);
router.get('/admin/product/createproduct', showproductCreatePage);




router.get('/admin/product/:id', viewSingleproductAdmin);
router.get('/admin/product/edit/:id', editSingleproduct);
router.post('/admin/product/update/:id', productPhotoMulter, updateSingleproduct);
router.get('/admin/product/delete/:id', deleteSingleproduct);



router.post('/admin/slider/update/:id', sliderPhotoMulter, updateSlider);
router.post('/admin/createslider', sliderPhotoMulter, sliderDataStore);
router.get('/admin/slider', sliderPage);
router.get('/admin/createslider', createslider);
router.get('/admin/slider/delete/:id', deleteSlider);
router.get('/admin/slider/edit/:id', editSlider);


router.get('/blog/:id', showSingleBlogPage);
router.get('/view/:id', shopSinglePage);





// module exports
module.exports = router;