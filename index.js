// SCENES
require("./bot/middleware/scene/index.scene");

// ON

// COMPOSERS
require("./bot/middleware/composers/index.composer")

// COMMANDS
require("./bot/middleware/command/start.command");
require("./bot/middleware/command/info.command");
require("./bot/middleware/command/menu.command");
require("./bot/middleware/command/salon.command");
require("./bot/middleware/command/course.command");
// COMMANDS for admin
require("./bot/middleware/command/commands.command");
require("./bot/middleware/command/cron.command");
require("./bot/middleware/command/all.command");
require("./bot/middleware/command/add.course");
require("./bot/middleware/command/add.teacher");

// HEARS
require("./bot/middleware/hears/welcome.hears");

// ACTION
require("./bot/middleware/action/vacancy.action")
require("./bot/middleware/action/salon.action")
require("./bot/middleware/action/study.action")


// CONNECTION
require("./bot/connection/local.connection");
require("./bot/connection/mongo.connection");
// require("./bot/connection/lambda.connection");