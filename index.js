const express = require("express")
const { Sequelize, DataTypes, where } = require("sequelize")

const app = express()
app.use(express.json())

let sequelize = new Sequelize({
    host: "localhost",
    username: "postgres",
    dialect: "postgres",
    password: "Vali336699",
    port: 5432,
    database: "n9"
})

sequelize.authenticate().then(() => {console.log("postgres connect")
}).catch((err) => {
    console.log(err)
})

let Movies = sequelize.define("movies", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    categoryId: {
        type: DataTypes.INTEGER
    }
})

let Categories = sequelize.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    year: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1980,
            max: 2070
        }
    }
})


Movies.sync({force: false})
Categories.sync({force: false})

Categories.hasMany(Movies, {
    foreignKey: "categoryId",
    onDelete: "Cascade"
})

Movies.belongsTo(Categories)

app.get("/categories/all", async(req, res) => {
    let categories = await Categories.findAll({
        include: "movies"
    })
    res.status(200).send({
        success: "true",
        message: "Categorylar",
        data: categories
    })
})

app.post("/categories/create", async(req, res) => {
    let { name } = req.body
    let category = await Categories.create({name})

    res.status(200).send({
        success: "true",
        message: "yaratildi",
        data: category
    })
})

app.patch("/categories/update", async(req, res) => {
    let { id, name } = req.body
    let category = await Categories.update({name}, {
        where: {
            id
        }
    })

    res.status(200).send({
        success: "true",
        message: "o'zgartirildi",
        data: category
    })
    
})

app.delete("/categories/delete/:id", async(req, res) => {
    let { id } = req.params

    let result = await Categories.destroy({
        where: {
            id
        }
    })

    res.status(200).send({
        success: "true",
        message: "o'chirildi",
        data: result
    })
})

let salom = "salom"

app.get("/movies/all", async(req, res) => {
    let movies = await Movies.findAll({
        include: [{
            model: Categories,
            attributes: ["id", "name"]
        }]
    })

    res.status(200).send({
        success: "true",
        message: "Kinolar",
        data: movies
    })
})

app.post("/movies/create", async(req, res) => {
    let { name, year, categoryId} = req.body
    let movie = await Movies.create({name, year, categoryId})

    res.status(200).send({
        success: "true",
        message: "yaratildi",
        data: movie
    })
})

app.listen(9000, () => {
    console.log(9000)
})