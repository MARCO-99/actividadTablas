const express = require('express');
const router = express.Router();

const conexion= require('./database/db');


// router.get('/',(req,res)=>{
    
//     conexion.query('SELECT * FROM alumno', (err,results)=>{
//         if (err){
//             throw err;
//         }
//         else{
//             res.render('index.ejs', {results:results})
//         }
//     })
// },crud.Auth)
// Ruta para login
router.get('/login',(req,res)=>{
    res.render('login.ejs');
});
//Ruta para logup

router.get('/register',(req,res)=>{
    res.render('register.ejs');
});

//Ruta para crear registros

router.get('/create',(req,res)=>{
    res.render('create.ejs');
})



//Ruta para editar registro
router.get('/edit/:matricula', (req,res)=>{
    const matricula = req.params.matricula;
    conexion.query('SELECT * FROM alumno WHERE matricula=?',[matricula],(err,results)=>{
        if (err){
            throw err;
        }
        else{
            res.render('edit.ejs', {alumno:results[0]})
        }
    })    
})

//Ruta para eliminar registro

router.get('/delete/:matricula',(req,res)=>{
    const matricula=req.params.matricula;
    conexion.query('DELETE FROM alumno WHERE matricula=?',[matricula],(err,results)=>{
        if (err){
            throw err;
        }
        else{
            res.redirect('/');
        }
    })   
})


const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);




//Ruta pagina de Carreras
router.get('/carreras',(req,res)=>{
    conexion.query('SELECT * FROM carrera', (err,results)=>{
        if (err){
            throw err;
        }
        else{
            res.render('carrera.ejs', {results:results})
        }
    })
    
})

//Ruta para crear registros

router.get('/createCarrera',(req,res)=>{
    res.render('createCarrera.ejs');
});

//Ruta para editar registro
router.get('/editCarrera/:id_carrera', (req,res)=>{
    const id_carrera = req.params.id_carrera;
    conexion.query('SELECT * FROM carrera WHERE id_carrera=?',[id_carrera],(err,results)=>{
        if (err){
            throw err;
        }
        else{
            res.render('editCarrera.ejs', {carrera:results[0]})
        }
    })    
});

//Ruta para eliminar registro

router.get('/deleteCarrera/:id_carrera',(req,res)=>{
    const id_carrera=req.params.id_carrera;
    conexion.query('DELETE FROM carrera WHERE id_carrera=?',[id_carrera],(err,results)=>{
        if (err){
            throw err;
        }
        else{
            res.redirect('/carreras');
        }
    })   
});



router.post('/saveCarrera', crud.saveCarrera);
router.post('/updateCarrera', crud.updateCarrera);


router.post('/register',crud.register);
router.post('/auth',crud.login);
router.get('/',crud.Auth);
router.get('/logout',crud.logout)


module.exports = router;