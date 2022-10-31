const { VK } = require("vk-io");
const { Collection } = require("discord.js");
const User = require("../src/models/user_vk.js");
const vk = new VK({
    token: process.env.token,
    apiVersion: process.env.apiVersion
})
vk.updates.on("message", async (message, next) => {
    if (message.isOutbox == true) return;

    if (!await vk.db.user.findOne({ userId: message.senderId })) await vk.db.user.create({ userId: message.senderId });

    const command = vk.commands.get(message.text) || vk.commands.find(cmd => cmd.aliases && cmd.aliases.includes(message.text))
    if (!command) return message.send("Такой команды не существует");
    try {
        command.execute(vk, message)
    } catch (e) {
        console.log(e)
    }
    return next();
})
vk.commands = new Collection();
vk.aliases = new Collection();
vk.commands_array = [];
vk.prefix = "/";
vk.db = {
    user: User,
}
require("../src/handler/commandHandler.js").init(vk)
async function intilization() {
    await vk.updates.startPolling()
    require("../src/mongo.js");
}

intilization().then(_ => console.log(`[APP]: `.green.bold + "Приложение было загружено.".blue.bold), _ => console.log(`[APP]: `.red.bold + "Приложение не было загружено.".blue.bold));