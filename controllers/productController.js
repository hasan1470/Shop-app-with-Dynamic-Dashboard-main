const path = require('path');
const {readFileSync, read, writeFileSync, rename} = require('fs');
const { json } = require('express');

// Product page controllers
const showproductPage = (req, res) => {

    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    res.render('product/product', {
        products : products
    });
}

// Product Create page controllers
const showproductCreatePage = (req, res) => {
    res.render('product/createProduct');
}

// product Data Store page controllers
const productDataStore = (req, res) => {

    // all data
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // distruscute all data form body
    const { name, price, size, color,  } = req.body;

    // find id of any product
    let last_id = 1;
    if(products.length > 0) {
        last_id = products[products.length - 1].id + 1;
    }

    // push data into json db
    products.push({
        id : last_id,
        name : name,
        price : price,
        size : size,
        color : color,
        photo : req.file ? req.file.filename : "demoproduct.png"
    });


    // write data to json db
    writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(products));

    // redirect
    res.redirect('/admin/product/')
}

// viewSingleproductAdmin controllers
const viewSingleproductAdmin = (req, res) => {
    
    // all data
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    const {id} = req.params;

    // 
    const product = products.find(data => data.id == id);

    res.render('product/viewProduct', {
        product
    })
}

// delete single product
const deleteSingleproduct = (req, res) => {

    // all data
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    const { id } = req.params;

    const product = products.filter(data => data.id != id);

    writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(product));

    res.redirect('back');
}

// Edit student controller
const editSingleproduct = (req, res) => {

    // all data
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // get edit product id
    const { id } = req.params;

    // find edit id
    const edit_product = products.find(data => data.id == id);

    res.render('product/editProduct', {
        products : edit_product
    })
}

// update single product
const updateSingleproduct = (req, res) => {

    // get id
    const { id } = req.params;

     // all data
     const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

     // find index number
     products[products.findIndex(data => data.id == id)] = {
        ...products[products.findIndex(data => data.id == id)],
        name : req.body.name,
        price : req.body.price,
        size : req.body.size,
        color : req.body.color,
        photo : req.file.filename
     }

     // write data to json db
     writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(products));

     res.redirect('back');

}

// module expots
module.exports = {
    showproductPage,
    showproductCreatePage,
    productDataStore,
    viewSingleproductAdmin,
    deleteSingleproduct,
    editSingleproduct,
    updateSingleproduct
}