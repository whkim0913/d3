/**
 * Created by g_fri on 2017-04-18.
 */
var oracledb = require('oracledb');
var db = require('../../config/db');

var sql = 'SELECT B.SEQ, A.VALUE AS Y  ,SUBSTR(A.TIMEKEY, 0, 14) AS X ' +
    'FROM DCDCDATA_PHOTO A, DCDCPHOTOKEY B, DCEQUIPMENT C ' +
    'WHERE A.SEQ = B.SEQ AND B.EQUIPMENTID = C.EQUIPMENTID AND ITEMID = :ITEMID ' +
    'ORDER BY A.SEQ';

module.exports.chart = function (sql, params) {
    db.doConnect(function (err, connection) {
        if (err) {
            console.log("ERROR: Unable to get a connection ");
            return callback(err);
        } else {
            db.doExecute(
                connection, sql, params// PASS BIND PARAMS IN HERE - SEE ORACLEDB DOCS
                , function (err, result) {
                    if (err) {
                        db.doRelease(connection);     // RELEASE CONNECTION
                        return callback(err);
                    }
                }
            )
        }
    })
};
