const { LibEvent } = require('jesscode-lib');
const axios = require('axios');
class Database extends LibEvent {
    constructor(name){
        super();
        this.name = name;
        this.url = process.env['DATABASE_URL'];
        this.#create();
    }
    #create(){
        axios.post(this.url + '/create', {
            name: this.name,
            password: process.env['PASSWORD']
        }).then(res => {
            if(res.data.state === 'created') this.emit('create');
        }).catch(err => {
            this.emit('error', err);
        });
        return;
    }
    async #read(){
        let data = {};
        axios.post(this.url + '/read', {
            name: this.name,
            password: process.env['PASSWORD']
        }).then(res => {
            if(res.data.state === 'read'){
                data = res.data.data;
                this.emit('read');
            }
        }).catch(err => {
            this.emit('error', err);
        });
        return data;
    }
    async get(key){
        let data = await this.#read();
        return data[key];
    }
    async set(key, value){
        axios.post(this.url + '/set', {
            name: this.name,
            password: process.env['PASSWORD'],
            key: key,
            value: value
        }).then(res => {
            if(res.data.state === 'set') this.emit('set');
        }).catch(err => {
            this.emit('error', err);
        });
        return;
    }
}

module.exports = { Database };