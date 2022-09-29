const { hashsync, hashSync, compareSync} = require ("bcrypt");
const {create,deleteUser,getUsers,updateUser }  = require ("./user.services");
const {getSaltSync} = require("bcrypt");

module.exports = {
    createUser : (req,res) =>{
        const body = req.body;
        const salt = getSaltSync(10);
        body.password = hashSync(body,password,salt);

    create(body, (err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                sucess : 0,
                message: "Database connection error"
            });
        }
        return res.status(200).json({
            sucess : 1,
            data: results,
        });
    });
    },
    deleteUser: (req,res)=>{
        const data = req.body;
        deleteUser(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    sucess: 0,
                    message:"record not found"
                })

            }return res.json({
                sucess:1,
                message:"user delete sucessFully"
            })
        })
    },
    login: (req,res)=>{
        const body = req.body;
        getUserByUserEmail(body,email, (err,results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    sucess:0,
                    message:"Invalid email or password"
                })
            }
            const result = compareSync(body,password,results,password);
            if(results){
                results.password = undefined;
                const jsontoken = sing({result: results},process.env.KEY,{
                    expiresIn : "1h",
                });
                return res.json({
                    sucess: 1,
                    message: "Login sucessfully",
                    token: jsontoken
                });
            } else{
                return res.json({
                    sucess: 1,
                    message: "invalid email or password"
                })
            }
        })
    }
}