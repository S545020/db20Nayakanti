var Costume = require('../models/costume');
// List of all Costumes
// List of all Costumes
exports.costume_list = async function(req, res) {
    try{
        theCostumes = await Costume.find();
        res.send(theCostumes);
        console.log("Inside try")
    }
    catch(err){
        console.log("Inside Catch")
        res.send(`{"error": ${err}}`);
        console.log("After Catch")
    }
};
//view page
exports.costume_view_all_Page = async function(req, res) {
    try{
    theCostumes = await Costume.find();
    res.render('costumes', { title: 'Costume Search Results', results: theCostumes });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific Costume.
exports.costume_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Costume.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };
// Handle Costume create on POST.
exports.costume_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Costume();
    document.costume_type = req.body.costume_type;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// Handle Costume delete form on DELETE.
exports.costume_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Costume.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };
// Handle Costume update form on PUT.
exports.costume_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await Costume.findById( req.params.id)
 // Do updates of properties
 if(req.body.costume_type)
 toUpdate.costume_type = req.body.costume_type;
 if(req.body.cost) toUpdate.cost = req.body.cost;
 if(req.body.size) toUpdate.size = req.body.size;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
};
// Handle a show one view with id specified by query

exports.costume_view_one_Page = async function(req, res) 
{  
 console.log("single view for id "  + req.query.id)  
  try{       
     //console.log("test");
     result = await Costume.findById(req.query.id);  
     res.render('costumeDetail', { title: 'Costume Detail', toShow: result });  
    }   
  catch(err){   
    res.status(500)    
    res.send(`{'error': '${err}'}`); 
   }};
   // Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.costume_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('costumecreate', { title: 'Costume Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle building the view for updating a costume.
// query provides the id
exports.costume_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Costume.findById(req.query.id)
    res.render('costumeupdate', { title: 'Costume Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle a delete one view with id from query
exports.costume_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Costume.findById(req.query.id)
    res.render('costumedelete', { title: 'Costume Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };