const mongoose = require('mongoose');

const Vendedor = mongoose.model('Vendedor',
  new mongoose.Schema({ 
    idVendedor: Number,
    nombre: String, 
    correo: String,
    totalComision: Number 
  })
);

const Venta = mongoose.model('Venta',
  new mongoose.Schema({ 
    idVendedor: Number, 
    zona: String,
    fecha: String,
    valorVenta: Number
  })
);

module.exports = {
  Vendedor: Vendedor,
  Venta: Venta
}

