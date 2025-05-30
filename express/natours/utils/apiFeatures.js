class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter(){
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting(){
         if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
            // sort('price ratingsAverage')
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    fieldLimiting(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
            // select('name price')
        }
        else {
            this.query = this.query.select('-__v'); // Exclude __v field
        }
        return this;
    }
    pagination(){
        const page = this.queryString.page * 1 || 1; // Convert to number
        const limit = this.queryString.limit * 1 || 10; // Convert to number
        const skip = (page - 1) * limit; // Calculate skip value
        this.query = this.query.skip(skip).limit(limit);

        if(this.queryString.page) {
            const numTours = Tour.countDocuments();
            if(skip >= numTours) {
                throw new Error('This page does not exist');
            }
        }
        return this;
    }
}

module.exports = APIFeatures;