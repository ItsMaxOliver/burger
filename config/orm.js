const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    let arr = [];
    
    for (var key in ob) {
        let value = ob[key];
        
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

const orm = {
    selectAll: function (table, callback){
        let queryString = `SELECT * FROM ${table};`;
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            
            callback(res);
        });
    },
    insertOne: function (table, cols, vals, callback) {
        let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;
        
        connection.query(queryString, vals, function(err, res) {
            if (err) throw err;

            callback(res);
        });
    },
    updateOne: function (table, objColVals, condition, callback) {
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`;
        
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            
            callback(res);
        });
    }
};

module.exports = orm;