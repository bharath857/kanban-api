const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB
/* mongodb+srv://kanban-api-working:kanban-api-working@kanban.gpvpz.mongodb.net/kanban?retryWrites=true&w=majority */