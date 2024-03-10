const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { json } = require('express');


// Slider controllers
const sliderPage = (req, res) => {

    // all data
    const sliders = JSON.parse(readFileSync(path.join(__dirname, '../db/mainSlider.json')));
    
    res.render('slider/sliderMain', {
        sliders
    });

}

// create slider page controlers
const createslider = ( req, res ) => {

    res.render('slider/createSlider')

}


// slider data store controlers
const sliderDataStore = (req, res) => {

    // all data
    const sliders = JSON.parse(readFileSync(path.join(__dirname, '../db/mainSlider.json')));

    // distructure data from slider from requested body
    const { title, desc, photo } = req.body

    // find id
    let last_id = 1;
    if(sliders.length > 0) {
        last_id = sliders[sliders.length - 1].id + 1;
    }

    // push slider data into json
    sliders.push({
        id : last_id,
        title : title,
        desc : desc,
        photo : req.file ? req.file.filename : "sliderDemo.png"
    })

    // updata all data into json db
    writeFileSync(path.join(__dirname, '../db/mainSlider.json'), JSON.stringify(sliders))

    // redirect
    res.redirect('/admin/slider');

 }



 // delete slider controllers
 const deleteSlider = (req, res) => {

    // all data from slider collection
    const sliders = JSON.parse(readFileSync(path.join(__dirname, '../db/mainSlider.json')));

    // get single data with id to delete
    const { id } = req.params;

    // match slider by id
    const new_slider = sliders.filter(data => data.id != id);

    // update new data
    writeFileSync(path.join(__dirname, '../db/mainSlider.json'), JSON.stringify(new_slider));

    res.redirect('back')

 }


 // update slider details
 const editSlider = ( req, res ) => {

    // all data from slider collection
    const sliders = JSON.parse(readFileSync(path.join(__dirname, '../db/mainSlider.json')));

    // get single data with id to delete
    const { id } = req.params;

    const edit_slider = sliders.find(data => data.id == id);

    res.render('slider/editSlider', {
        sliders : edit_slider
    })
 }


 // update sliders data
 const updateSlider= (req, res) => {

    // all data from slider collection
    const sliders = JSON.parse(readFileSync(path.join(__dirname, '../db/mainSlider.json')));

    // get id
    const { id } = req.params;
    const { sphoto } = req.body;

    // find index number
    sliders[sliders.findIndex(data => data.id == id)] = {
    ...sliders[sliders.findIndex(data => data.id == id)],
    title : req.body.title,
    desc : req.body.desc,
    photo : req.file.filename

    }
console.log(sphoto)

    // write data to json db
    writeFileSync(path.join(__dirname, '../db/mainSlider.json'), JSON.stringify(sliders));

    res.redirect('/admin/slider');

 }






// module exports 
module.exports = {
    sliderPage,
    createslider,
    sliderDataStore,
    deleteSlider,
    editSlider,
    updateSlider
}