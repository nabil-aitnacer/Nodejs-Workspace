class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
      this.limit = 0;
      const model =query
      this.total = 0;
     
    }
    filter() {
      const queryParam = { ...this.queryString };
      const excludeFields = ['page', 'sort', 'limit', 'fields'];
      excludeFields.forEach((element) => delete queryParam[element]);
  
      //advanced filtering
      let queryStr = JSON.stringify(queryParam);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      this.query = this.query.find(JSON.parse(queryStr));
     
      return this;
    }
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query.sort(sortBy);
      } else {
        this.query.sort('-createdAt');
      }
      return this;
    }
    fields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
    pagination() {
      this.page = this.queryString.page * 1 || 1;
      this.limit = this.queryString.limit * 1 || 100;
      const skip = (this.page - 1) * this.limit;
  
      this.query = this.query.skip(skip).limit(this.limit);
     
      return this;
    }
  
    getNumPages() {
      
        const totalDocuments = this.query.model.countDocuments({});
        const totalPages = Math.ceil(totalDocuments / this.limit);
    
        return totalPages;
      
    }
  }

  module.exports= APIFeatures