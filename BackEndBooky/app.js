const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const mainRouter = require("./routes/router")

mongoose.connect("mongodb+srv://Admin:Admin@cluster0.gcmxjec.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('CONNECTED OK')
    }).catch(e => {
        console.log('CONNECTION ERROR')
    })

app.use(cors())

app.use(express.json())

app.listen(4000)

app.use("/", mainRouter)





