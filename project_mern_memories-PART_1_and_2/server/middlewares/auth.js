import jwt from 'jsonwebtoken';

const auth = async (req, res, next)=>
{
    try
    {
        console.log("backend headers--> ", req.headers);

        let token = req.headers?.authorization?.split(" ")[1];

        const isCustom = token.length<500;

        let decodedData;

        if(token&&isCustom)
        {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }
        else
        {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }
        next();
    }
    catch(err)
    {
        return res.json(
            {
                message: err.message
            }
        )
    }
}

export default auth;
