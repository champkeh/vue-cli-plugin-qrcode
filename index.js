const os = require('os')
const qrcode = require('qrcode')

function getIpAddress() {
    const ips = []
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
        const iface = interfaces[devName]
        for (const alias of iface) {
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                ips.push(alias.address)
            }
        }
    }
    return ips
}

module.exports = (api, projectOptions) => {
    const {serve} = api.service.commands

    const serveFn = serve.fn

    serve.fn = (...args) => {
        return serveFn(...args).then(res => {
            const {url} = res
            const ips = getIpAddress()
            if (ips.length > 0) {
                console.log(ips)
                qrcode.toString(url.replace('localhost', ips[0]), {type: 'terminal'}, (err, url) => {
                    if (err) {
                        console.warn(er)
                    } else {
                        console.log(url)
                    }
                })
            }
        })
    }
}
