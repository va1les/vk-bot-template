const mongoose = require("mongoose");

mongoose.connect(process.env.mongo, { keepAlive: true });

mongoose.connection.on("connected", () => {
    console.log(`[MongoDB]: `.green.bold + `Mongoose была подключена!`.blue.bold)
})

mongoose.connection.on('err', err => {
    console.log(`[MongoDB]: `.green.bold + `Mongoose ошибка подключения:\n${err.stack}`.red.bold)
});

mongoose.connection.on('disconnected', () => {
    console.log(`[MongoDB]: `.green.bold + `Mongoose подключение потеряно!`.yellow.bold)
});