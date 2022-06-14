const express = require("express") ;
const List = require("../models/listing.model") ;
const router = express.Router() ; 


router.get('/list', async (req, res) => {
    try {
        let page = req.query.page || 1 ;
        let pagesize = req.query.pagesize || 4 ;
        let filter = req.query.filter || "" ;
        let sort = req.query.sort || "" ;
        const skip = (page - 1) * pagesize ; // skip is the number of documents to skip
        if (filter !== "all") { 

            const lists = await List.find({ Type: { $eq: filter } }).skip(skip).limit(pagesize).sort({ Year: sort }).lean().exec() ;
            const total_pages = Math.ceil((await List.find({ Type: { $eq: filter } }).countDocuments()) / pagesize)

            return res.send({ total_pages, lists })

        }
        else {
            const lists = await List.find().skip(skip).limit(pagesize).sort({ Year: sort }).lean().exec()
            const total_pages = Math.ceil((await List.find().sort({ Year: sort }).countDocuments()) / pagesize)

            return res.send({ total_pages, lists })

        }
    }
    catch (error) {
        return res.status(500).send(error) ;
    }
}
) ;

module.exports = router ;