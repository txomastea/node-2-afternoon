module.exports = {
    create: (req, res, next) => {
        const dbInstance = req.app.get('db');  
        const { name, description, price, image_url } = req.body;

        dbInstance.create_product([name, description, price, image_url])
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error creating product', error)
        })
    },
    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;

        dbInstance.read_product( [params.id ])
        .then((product) => res.status(200).send( product ))
        .catch(err => {
            res.status(500).send({errorMessage: "error in getOne method"});
            console.log('----------------------',err)
        })
    },
    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products()
            .then( products => {
                //console.log(products)
                res.status(200).send(products)
            })
            .catch(err => {
                res.status(500).send({errorMessage: "error in getAll method"});
                console.log('-----~~~~~~~~~~~~',err)
            })
    },
    update: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params, query } = req;

        dbInstance.delete_product([ params.id, query.desc ])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({errorMessage: "error in update method"});
                console.log('-----~~~~~~~~~~~~',err)
            })
    },
    delete: (req,res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;

        dbInstance.delete_product([ params.id ])
        .then(() => res.sendStatus(200))
        .catch( err => {
            res.status(500).send({errorMessage: "error in delete method"});
            console.log('-----~~~~~~~~~~~~',err)
        })
    }
}