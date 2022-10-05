require('dotenv').config();
const http = require('http');
const { getUsers } = require('../bot/common/sequelize/user.sequelize');
const { generateContent } = require('../bot/common/users/input-output.user');

const port = Number(process.env.SERVER_PORT);

http
    .createServer( async (req, res) => {
        //Get content
        const users = await getUsers();
        const content = generateContent(users);

        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(content);
    })
    .listen(port, () => console.log(`Server is running on port: ${port}`))
