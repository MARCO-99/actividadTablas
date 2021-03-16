const conexion = require("../database/db");

exports.save = (req, res) => {
  const matricula = req.body.matricula;
  const id_carrera = req.body.id_carrera;
  const nombre = req.body.nombre;
  const apellidoap = req.body.apellidoap;
  const apellidoam = req.body.apellidoam;
  const grado = req.body.grado;
  const grupo = req.body.grupo;
  const correo_institucional = req.body.correo_institucional;
  conexion.query(
    "INSERT INTO alumno SET ?",
    {
      matricula: matricula,
      id_carrera: id_carrera,
      nombre: nombre,
      apellidoap: apellidoap,
      apellidoam: apellidoam,
      grado: grado,
      grupo: grupo,
      correo_institucional: correo_institucional,
    },
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
};

exports.update = (req, res) => {
  const matricula = req.body.matricula;
  const id_carrera = req.body.id_carrera;
  const nombre = req.body.nombre;
  const apellidoap = req.body.apellidoap;
  const apellidoam = req.body.apellidoam;
  const grado = req.body.grado;
  const grupo = req.body.grupo;
  const correo_institucional = req.body.correo_institucional;

  let sql = `UPDATE alumno SET ? WHERE matricula=?`;
  let data = [
    {
      matricula: matricula,
      id_carrera: id_carrera,
      nombre: nombre,
      apellidoap: apellidoap,
      apellidoam: apellidoam,
      grado: grado,
      grupo: grupo,
      correo_institucional: correo_institucional,
    },
    [matricula],
  ];
  conexion.query(sql, data, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};


// Crud para carreras

exports.saveCarrera = (req, res) => {
    const id_carrera = req.body.id_carrera;
    const nombrec = req.body.nombrec;
    const siglas = req.body.siglas;
    
    conexion.query(
      "INSERT INTO carrera SET ?",
      {
        id_carrera: id_carrera,
        nombrec: nombrec,
        siglas: siglas,
      },
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/carreras");
        }
      }
    );
  } 
  
  exports.updateCarrera = (req, res) => {
    const id_carrera = req.body.id_carrera;
    const nombrec = req.body.nombrec;
    const siglas = req.body.siglas;
  
    let sql = `UPDATE carrera SET ? WHERE id_carrera=?`;
    let data = [
      {
        nombrec: nombrec,
        siglas: siglas,
      },
      [id_carrera],
    ];
    conexion.query(sql, data, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        
        res.redirect("/carreras");
      }
    });
  };
  