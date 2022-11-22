const { Vendedor, Venta } = require("./models.js");


// ------- VENDEDORES

exports.readVendedores = (req, res) =>
    Vendedor.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.readVendedor = (req, res) =>
    Vendedor.findOne({ idVendedor: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });



exports.updateVendedor = (req, res) =>
    Vendedor.findOneAndUpdate(
        { idVendedor: req.params.id},
        { $set: { 
            idVendedor: req.body.idVendedor,
            nombre: req.body.nombre, 
            correo: req.body.correo,
            totalComision: req.body.totalComision } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createVendedor = (req, res) =>
    new Vendedor({ 
        idVendedor: req.body.idVendedor,
        nombre: req.body.nombre, 
        correo: req.body.correo,
        totalComision: req.body.totalComision })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });



// ------ VENTAS

exports.readVentas = (req, res) =>
    Venta.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });


exports.updateVenta = (req, res) =>
    Articulo.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { idVendedor: req.body.idVendedor, 
                zona: req.body.zona,
                fecha: req.body.fecha,
                valorVenta: req.body.valorVenta } }, 
        (err, data) => {
            if (err) res.json({ error: err });
            else     res.json(data);
        }
    );


exports.createVenta = (req, res) =>
    new Venta({ idVendedor: req.body.idVendedor, 
                    zona: req.body.zona,
                    fecha: req.body.fecha,
                    valorVenta: req.body.valorVenta })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

