class APIFeatures{
    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1;
        const skipPage = resultPerPage * (currentPage -1);
        this.query = this.query.limit(resultPerPage).skip(skipPage);
        return this;
    }
}

module.exports = APIFeatures;