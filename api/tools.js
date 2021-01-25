function getPagination(page, l){
    const limit = l ? +l : 20;
    const offset = page ? (page - 1) * limit : 0;

    return { limit, offset };
};

module.exports = { getPagination }
