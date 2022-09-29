const pool = require("../../config/database");


module.exports = {
    // if we get error it will be passed as data and callback will be null
    // if execution is sucessful then call back will have data
    create: (data, callBack) => {
        poll.query(
            `insert into registration(firstName, lastName, gender, email, password, number) 
              values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: (callBack) => {
        pool.query(
            `select id,firstName,lastName,gender,email,number from registration`, [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(`update registration set firstName =? ,lastName =?,
        gender =?, email =?, password =?,number =? where id = ?`, [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
        ], (error, results, fields) => {
            if (error) {
                return callBack(error)
            }
            return callBack(null, results[0])
        })
    },
    deleteUser: (data, callBack) => {
        pool.query('delete from registration where id = ?', [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                } return callBack(null, results[0]);
            })
    }
};