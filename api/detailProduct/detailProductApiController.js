const detailProductService = require('../../components/detailProduct/detailProductService');



exports.postComment = async (req, res) =>{
    // if(!req.user){
    //     res.status(401).json({
    //         message: 'Unauthorized'
    //     });
    //     return;
    // }

    const productId = req.params.productID;
    const content = req.body.content;
    // const email = req.user.email;

    console.log(req.body)
    const username = req.body.username;


    
    // console.log('\n', email, '\n',productId,'\n', content, '\n')

    const comment = await detailProductService.postComment(username, productId, content);

    res.status(201).json(comment);
}