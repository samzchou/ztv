const domain = 'http://192.168.16.163:8081';
const domainPort = 3300;
const mongo = '127.0.0.1'; //192.168.16.151
const mongoPort = 27017;

module.exports = {
    'description': 'HRpackage, One HRSSC, all service!',
    'hrssc_env': {
        'PORTAL_ORIGIN': domain,
        'SERVER_URL': `${domain}/hrssc-platform-portal/`,
        'HOST': '0.0.0.0',
        'PORT': domainPort
    },
    'mongo_env': {
        'mongo_server': mongo,
        'mongo_port': mongoPort,
        'mongo_username': '',
        'mongo_password': ''
    }
}