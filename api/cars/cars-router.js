// DO YOUR MAGIC
const express = require("express")

const router = express.Router()

const { 
    getAll,
    getById,
    create
} = require("./cars-model");

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require("./cars-middleware")


router.get("/", async (req, res, next) => {
    try {
        const cars = await getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", checkCarId, async (req, res, next) => {
    try {
        const car = await getById(req.params.id)
        res.json(car)
    } catch (err) {
        next(err)
    }
})

router.post("/", checkVinNumberValid, checkVinNumberUnique, checkCarPayload, async (req, res, next) => {
    const { vin, make, model, mileage, title, transmission } = req.body
    try {
        const newCar = await create({ vin, make, model, mileage, title, transmission })
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })

    next()
}) 

module.exports = router