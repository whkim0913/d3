/**
 * Created by g_fri on 2017-04-18.
 */
module.exports = {
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || '192.168.200.107:1521/orcl',
    user: process.env.NODE_ORACLEDB_USER || 'GREENPROCESS',
    password: process.env.NODE_ORACLEDB_PASSWORD || 'GREENPROCESS',
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
}