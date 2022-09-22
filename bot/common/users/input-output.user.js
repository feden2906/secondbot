const { createWriteStream, createReadStream, unlink, stat } = require('fs');
const { join } = require('path')
const { getUsersHTML } = require('./getUsersHTML');

exports.generateContent = (users) => {
    let content = '';
    let count = 1;

    const rows = users.map(({ chatID, username, firstName, lastName, createdAt }) =>
        `<tr><td>${count++}</td><td>${chatID}</td><td>${username}</td><td>${firstName}</td><td>${lastName}</td><td>${createdAt}</td></tr>`);

    rows.forEach((row) => content += row + '\n');

    return getUsersHTML(content)
};

exports.generateFileName = () => {
    const random = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
    return `users-${random(200000, 100000)}.html`;
}

exports.generateFilePath = (fileName) => join(`./storage/${fileName}`)

exports.saveFile = async (HTMLContent, filePath) => {
    return new Promise((resolve, reject) => {
        const stream = createWriteStream(filePath, 'utf-8');
        stream.write(HTMLContent, 'utf-8');
        stream.on('finish', () =>
            stat(filePath, (err) => (err ? reject(err) : resolve())));
        stream.on('error', () => unlink(filePath, () => reject()));
        stream.end();
    })
}

exports.sendFile = async (ctx, fileName, filePath) => {
    // const chat = ctx.message.chat.id;
    return new Promise((resolve, reject) => {
        const stream = createReadStream((filePath), 'utf-8');
        ctx.replyWithDocument({ source: stream, fileName });
        // ctx.telegram.sendDocument(chat, { source: stream, fileName });
        stream.on('error', () => unlink(filePath, () => reject()));
        stream.on('close', () => stat(filePath, (err) => err ? reject(err) : resolve()))
    })
};

exports.deleteFile = async (filePath) => {
    return new Promise((resolve, reject) => {
        unlink(filePath, (err) => {
            if(err) return reject(err)
            resolve()
        })
    })
};

