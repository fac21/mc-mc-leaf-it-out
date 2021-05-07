function handleErrors(error, request, response, next){
    console.error(error);
    response.status(500).send(`<h1>Something went wrong</h1>`);
}

module.exports = { handleErrors };