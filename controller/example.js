//middleware are functions that stand inbetween place of your request object and respond object and next middleware

/**
 * this function returns to the consle the route that the current server visits
 * @param {Object} req Expressjs Request object 
 * @param {Object} res Expressjs Request object
 * @param {Function} next Expressjs middleware function
 */

exports.myRequestMiddleware = (req, res, next)=>{
    console.log(req);
    return next();
}

//install jsdoc