const mssql = require('mssql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registrationSchema, loginSchema } = require('../utils/validator')
const { sqlConfig } = require('../config/database.connection.config')
const { hashPassword } = require('../utils/hash')
const { createToken } = require('../utils/token.gen')

module.exports.MemberRegister = async(req, res)=>{
    try{
        if(!req.body){
            return res.status(400).json({error: 'The request body can not be empty'})
        }
        const { cohortNumber, firstName, lastName, email, password } = req.body
       const { error } = registrationSchema.validate({ cohortNumber, firstName, lastName, email, password })
    
       if(error){
              return res.status(400).json({error: error.message})
       } else{
              // check if email is registred
              const pool = await mssql.connect(sqlConfig)
              const checkEmailQuery = await pool
              .request()
              .input('email', email)
              .execute('fetchUserByEmailPROC')
    
              if(checkEmailQuery.rowsAffected[0] == 1){
                return res.status(400).json({error: 'Account creation failed! This email is already registered'})
              }
    
              const hashedPwd = await hashPassword(password)
              
              await pool.request()
              .input('cohort_number', cohortNumber)
              .input('first_name', firstName)
              .input('last_name', lastName)
              .input('email', email)
              .input('password', hashedPwd)
                .execute('createNewUserPROC');
                
                const token = jwt.sign({email, is_admin: 0}, process.env.SECRET_KEY, {
                 expiresIn: 24*60*60
                })
    
                res.status(201).json({message: 'Account created successfully', token, user: {firstName, lastName, email, is_admin: 0}})
       }
    }
       catch(error){
                return res.status(500).json({error: error.message})
       }
}
