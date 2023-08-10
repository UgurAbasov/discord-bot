const mongoouse = require("mongoose")

module.exports = {
    name: 'ready',
    once: 'true',
    async execute() { 
        console.log('| ———————————————————————————————— |');
        console.log('| Ban.js succeful connected        |');
        console.log('| ———————————————————————————————— |');
        console.log('| Clear.js succeful connected      |');
        console.log('| ———————————————————————————————— |');
        console.log('| User-info.js succeful connected  |');
        console.log('| ———————————————————————————————— |');
        console.log('| Avatar.js succeful connected     |');
        console.log('| ———————————————————————————————— |');
        console.log('| Ping.js succeful connected       |');
        console.log('| ———————————————————————————————— |');
        console.log('| ⚡ Bot is Ready!                 |');
        console.log('| ———————————————————————————————— |');

    if(!Database) return;
    mongoouse.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Клиент подключился к базе данных")
    }).catch((err) => {
        console.log(err)
    });
}
}