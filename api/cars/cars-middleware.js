const { getAll, getById } = require('./cars-model')


const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;


  const  car = await getById(id);
  if (!car) {
    res.status(404).json({ message: `car with id ${id} is not found` })
  }
  next()
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const reqFields = ['vin', 'make', 'model', 'mileage'];
  reqFields.forEach(field => {
    if (!req.body[field]) {
      res.status(400).json({ message: `${field} is missing` })
    }
  });
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  if (!vin) {
    res.status(400).json({ message: `vin is missing` })
  }
  if (vin.length !== 17) {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  }
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  const car =  await getAll().where('vin', vin).first();
  if (car) {
    res.status(400).json({ message: `vin ${vin} already exists` })
  }
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
