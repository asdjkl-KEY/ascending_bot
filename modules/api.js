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
    async #read(){
        let data = await axios.post(this.url + '/read', {
            name: this.name,
            password: process.env['PASSWORD']
        });
        return data.data;
    }
    async get(key){
        let data = await this.#read();
        return data[key];
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
    async has(key){
        let data = await this.#read();
        if(data[key]) return true;
        return false;
    }
}

module.exports = { Database };