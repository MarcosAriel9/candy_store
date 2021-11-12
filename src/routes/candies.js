const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/',async (req,res)=>{
    let listCandies = await pool.query('SELECT* FROM CANDIES');
    res.json({
        status : 200,
        message: "se ha listado correctamente",
        listCandies: listCandies
    });
});
router.get('/:id',async (req,res)=>{
    const {id}= req.params;
    let listCandies = await pool.query('SELECT * FROM CANDIES where id = ?',[id]);
    res.json({
        status : 200,
        message: "se ha obtenido correctamente",
        listCandies: listCandies
    });
});
router.post('/create',(req,res)=>{
    const {name,price } = req.body;
    const candies ={
        name,price,status:1
    };
    pool.query('Insert into candies set ?',[candies]);
    res.json({
        status : 200,
        message: "se ha creado correctamente",
        candies : candies
    });
});
router.post('/update/:id',(req,res)=>{
const {id}=req.params;
const {name,price} = req.body;
const candies ={
    name,price,status:1
};
pool.query('update products set ? where id= ?',[candies,id ]);
res.json({
    status : 200,
    message: "se ha actualizado correctamente",
    candies : candies
});
});
router.post('/delete/:id',async (req,res)=>{
    const {id}=req.params;
    await pool.query('update products set status = 0 where id = ?',[id]);
    res.json({
        status : 200,
        message: "se ha eliminado correctamente",
        
    });
});
module.exports = router;


