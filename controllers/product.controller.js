const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// CREATE product controller code
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

// READ product detail controller code
exports.product_details = function (req, res) {
	var id = req.params.id;
	var hex = Buffer.from(id, 'hex')[0];
	if(req.params.id.length!=24 || hex==null){
		res.send('Bad Product ID!');
	}
	else
	{
	    Product.findById(req.params.id, function (err, product) {
	        if (err) return next(err);
	        if (product) {
	        	res.send(product);
	        }
	        else
	        {
	        	res.send('Product not found!');
	        }
	    })
	}
};

// UPDATE product data controller code
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product updated.');
    });
};

// DELETE product data controller code
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
