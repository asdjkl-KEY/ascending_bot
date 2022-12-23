const { LibEvent } = require('jesscode-lib');
const axios = require('axios');
class Database extends LibEvent {
    constructor(name){
        super();
        this.name = name;
        this.url = process.env['DATABASE_URL'];
        (async () => {await this.#create();})().then(() => {});
    }
    async #create(){
        axios.post(this.url + '/create', {
            name: this.name,
            password: process.env['PASSWORD']
        }).then(res => {
            if(res.data.state === 'created') this.emit('create');
            console.log(('Connected to database: ' + this.name).green)
        }).catch(err => {
            this.emit('error', err);
        });
        return;
    }
    async get(key, cb){
        let data = await axios.post(this.url + '/get', {
            name: this.name,
            password: process.env['PASSWORD'],
            key: key
        })
        console.log(data.data.data);
        return data.data.data;
    }
    async set(key, value){
        await axios.post(this.url + '/set', {
            name: this.name,
            password: process.env['PASSWORD'],
            key: key,
            value: value
        })
        return;
    }
    async has(key, cb){
        let data = await axios.post(this.url + '/get', {
            password: process.env['PASSWORD'],
            name: this.name,
            key: key
        });
        if(data.data.data) return true
        return false;
    }
}

module.exports = { Database };