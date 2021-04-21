const conexion = require("../database/db");
const bcrypt = require("bcryptjs");
require("../router.js");

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
};

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

// registro de usuarios
exports.register = async (req, res) => {
  const user = req.body.user;
  const rol = req.body.rol;
  const pass = req.body.pass;
  let passwordHaash = await bcrypt.hash(pass, 8);
  let valor = "";

  conexion.query(
    "INSERT INTO login SET ?",
    { usermane: user, id_rol: rol, password: passwordHaash },
    async (err, results) => {
      if (err) {
        console.log(err.message);
      } else {
        res.render("register", {
          valor: "success",
          alert: true,
          alertTitle: "Registration",
          alertMessage: "Registro Exitoso",
          alertIcon: "success",
          showConfirmButtom: false,
          timer: 1500,
          ruta: "/",
        });
      }
    }
  );
};

// User login
exports.login = async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  let passwordHaash = await bcrypt.hash(pass, 8);

    if (user && pass) {
      conexion.query(
      "SELECT * FROM login WHERE usermane= ? ",
      [user],
      async (err, results) => {
        console.log(results);
        if (
          results.length == 0 ||
          !(await bcrypt.compare(pass, results[0].password))
        ) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o Passwod incorrecto",
            alertIcon: "error",
            showConfirmButtom: true,
            timer: false,
            ruta: "/login",
          });
        } else {
          req.session.rol = results[0].id_rol;
          req.session.loggedIn = true;
          res.render("login", {
            alert: true,
            alertTitle: "Conexion Exitosa",
            alertMessage: "LogIn Correcto",
            alertIcon: "success",
            showConfirmButtom: false,
            timer: 1500,
            ruta: "/",
          });
        }
      }
    );
  } else {
    res.render("login", {
      alert: true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese un usuario y/o password",
      alertIcon: "warning",
      showConfirmButtom: true,
      timer: false,
      ruta: "/login",
    });
  }
};

//Auth pages
exports.Auth = (req, res) => {
  if (req.session.loggedIn ) {
    conexion.query("SELECT* from calificacionesTareas ", (err, results) => {
      if (err) {
        throw err;
      } else {
        res.render("index.ejs", { results: results, login: true });
      }
    });
    
  } else {
    res.render("index", {
      login: false,
    });
  }
};

//logout

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
