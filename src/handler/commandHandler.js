const fs = require("fs");
module.exports.init = (vk) => {
    fs.readdir("./src/commands/", (error, files) => {
        if (error) return console.log(error);
        files.forEach(file => {
            const cmd = require(`../commands/${file}`);
            vk.commands.set(cmd.name, cmd);
            if (cmd.aliases) cmd.aliases.forEach(alias => vk.aliases.set(alias, cmd.name))
            console.log(`[CMD]: `.green.bold + `Команда ${cmd.name} загружена`.blue.bold)
        })
    })
}