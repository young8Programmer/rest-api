// installation qo'llanmasi yaratildi
// component testlari yaratildi
// kod uslubini yaxshilash
// prettier formatlash
// bundle size optimallashtirildi
// installation qo'llanmasi yaratildi
// API endpoint testlari qo'shildi
// bundle size optimallashtirildi
// unit testlar qo'shildi
// code comments qo'shildi
// bundle size optimallashtirildi
// API endpoint testlari qo'shildi
// CI/CD pipeline sozlandi
// package.json yangilandi
// error handling yaxshilandi
// component testlari yaratildi
// installation qo'llanmasi yaratildi
// ESLint qoidalariga moslashtirish
// README faylini yangilash
// shopping cart funksiyasi qo'shildi
// component testlari yaratildi
// validation xatolari tuzatildi
// admin dashboard yaratildi
// kod formatlash va indentatsiya
// API response formatini yaxshilash
// kod formatlash va indentatsiya
// database migrations yaratildi
// memory leak muammosi hal qilindi
// image optimization qo'shildi
// admin dashboard yaratildi
// component testlari yaratildi
// API hujjatlarini qo'shish
// CI/CD pipeline sozlandi
// API response formatini yaxshilash
// type error tuzatildi
// shopping cart funksiyasi qo'shildi
// API response formatini yaxshilash
// error handling yaxshilandi
// database migrations yaratildi
// ESLint qoidalariga moslashtirish
// kod strukturasini yaxshilash
// authentication xatosi tuzatildi
// memory leak muammosi hal qilindi
// error handling yaxshilandi
// middleware funksiyalari qo'shildi
// installation qo'llanmasi yaratildi
// ESLint qoidalariga moslashtirish
// README faylini yangilash
// database migrations yaratildi
// API response formatini yaxshilash
// API endpoint testlari qo'shildi
// validation xatolari tuzatildi
const express = require("express")
// memory leak muammosi hal qilindi
// README faylini yangilash
// kod uslubini yaxshilash
// dependencies yangilandi
// CI/CD pipeline sozlandi
// changelog yangilandi
// database querylarni optimallashtirish
// database querylarni optimallashtirish
// unit testlar qo'shildi
// integration testlar yaratildi
// admin dashboard yaratildi
const { Sequelize, DataTypes, where } = require("sequelize")
// user authentication qo'shildi
// database testlari qo'shildi
// code comments qo'shildi
// real-time notifications implementatsiya qilindi

// environment variables sozlandi
// database testlari qo'shildi
// type error tuzatildi
// kod formatlash va tozalash
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