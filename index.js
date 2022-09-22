// SCENES
require("./bot/middleware/scene/index.scene");

// ON

// COMMANDS
require("./bot/middleware/command/commands.command");
require("./bot/middleware/command/start.command");
require("./bot/middleware/command/help.command");
require("./bot/middleware/command/setting.command");
require("./bot/middleware/command/record.command");
require("./bot/middleware/command/all.command");
require("./bot/middleware/command/add.office.command");

// HEARS
require("./bot/middleware/hears/one.hears");
require("./bot/middleware/hears/two.hears");
require("./bot/middleware/hears/vacancy.hears");

// ACTION
require("./bot/middleware/action/vacancy.action")
require("./bot/middleware/action/salon.action")

// CONNECTION
require("./bot/connection/local.connection");
// require("./bot/connection/lambda.connection");