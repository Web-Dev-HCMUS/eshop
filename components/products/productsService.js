const Product = require('../../models/Product');

const perPage = 9;

exports.list = (page) => Product.find({}, null,{ skip: perPage * (page-1) }).limit(perPage);

exports.countDoc = () => Product.find({}).count();

exports.countDocByCategory = (category) => Product.find({type: category}).count();

exports.listByCategory = (category, currentPage) => Product.find({type: category})
                                                            .skip(perPage * (currentPage - 1))
                                                            .limit(perPage);

exports.handleSearchParams = (req) => {
    let filter = {};
    const keyword = req.query.name;
    if (keyword !== "") {
        filter = {
            name: {
                $regex: keyword,
                $options: "i",
            },
        };
    }
    const category = req.query.category;

    if (category !== "all" && category !== "0" && category) {
        filter.type = category;
    }
    const rangePrice = req.query.rangePrice;

    if (rangePrice !== "0") {
        switch (rangePrice) {
            case "1":
                filter.price = {
                    $lte: 10000000,
                };
                break;
            case "2":
                filter.price = {
                    $gte: 10000000,
                    $lte: 25000000,
                };
                break;
            case "3":
                filter.price = {
                    $gte: 25000000,
                };
                break;
            default:
                filter.price = {
                    $gte: 1,
                };
                break;
        }
    }

    const release = req.query.release;
    const sortParams = req.query.sort;
    const orderParams = req.query.order;
    let sort = {};
    if (release === "0" || !release) {
        sort = {updatedAt: "-1"};
    } else {
        sort = {updatedAt: release};
    }

    if (sortParams === "price") {
        if (orderParams === "asc") {
            sort = {price: "1"};
        } else {
            sort = {price: "-1"};
        }
    }

    return {filter, sort};
}

exports.countDocBySearch = (filter) => Product.find(filter).count();

exports.listBySearch = (filter, sort, currentPage) =>
    Product.find(filter)
    .sort(sort)
    .collation({locale: "en_US", numericOrdering: true})
    .skip(perPage * (currentPage - 1))
    .limit(perPage);
