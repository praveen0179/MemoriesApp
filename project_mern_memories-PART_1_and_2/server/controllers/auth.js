import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const signin = async (req, res)=>
{
    const {email, password} = req.body;

    try
    {
        const existingUser = await User.findOne({email});

        if(!existingUser)
        {
            return res.json(
                {
                    message: 'user not fount'
                }
            )
        }
        else
        {
            const isPasswordMatch = await bcryptjs.compare(password, existingUser.password);

            if(!isPasswordMatch)
            {
                return res.json(
                    {
                        message: 'invalid credentials'
                    }
                )
            }
            else
            {
                const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'});
                return res.json(
                    {
                        result: existingUser,
                        token: token
                    }
                )
            }
        }
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

export const signup = async (req, res)=>
{
    const {firstName, lastName, email, password, confirm_password} = req.body;

    try
    {
        const existingUser = await User.findOne({email});

        if(existingUser)
        {
            return res.json(
                {
                    message: 'User already exists'
                }
            )
        }
        else
        {
            if(password!==confirm_password)
            {
                return res.json(
                    {
                        message: "password doesn't match"
                    }
                )
            }

            const hashedPassword = await bcryptjs.hash(password, 12);

            const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

            const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'});4

            res.json(
                {
                    result: result,
                    token: token
                }
            )
        }
    }
    catch(err)
    {
        return res.json(
            {
                message: 'Something went wrong'
            }
        )
    }
}

