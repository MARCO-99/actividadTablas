//Database conexion
const mysql = require('mysql');


const conexion = mysql.createConnection({
    host: "wpdatabaseserver.mysql.database.azure.com", 
    user: "adminProject@wpdatabaseserver", 
    password: 'UPMPwebproject_', 
    database: 'webproject', 
    port: 3306,
    
  });
  
    
  conexion.connect(function(error) {
    if (error){
      throw error;
    }else{
      console.log("Conexion Exitosa")
      
    }
  })


  module.exports= conexion;