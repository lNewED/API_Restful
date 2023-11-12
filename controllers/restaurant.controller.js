const Restaurant = require("../models/restaurant.model");
const getAll = async (req, res) => {
  try {
    const restaurantList = await Restaurant.findAll();
    const result = restaurantList.map((restaurant) => {
      return restaurant.toJSON();
    });
    res.status(200).json(result);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server !");
    return;
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Restaurant.findOne({ where: { id: id } });
    if (!result) {
      return res.status(404).send("Not Found restaurant with id : " + id);
    }
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server");
  }
};
const create = async (req, res) => {
  const { name, type, img } = req.body;
  if (!name || !type || !img) {
    return res.status(400).send("Please provide all value");
  }
  try {
    await Restaurant.create({ name, type, img });
    res.status(201).send("created you restaurant !");
  } catch (err) {
    console.log(err);
    res.status(500).send("Have an error on server");
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Restaurant.findOne({ where: { id: id } });
    if (!result) {
      return res.status(404).send("Not Found restaurant with id : " + id);
    }
    result.destroy();
    res.status(200).send(`Deleted 1 row! id: ${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server");
  }
};

const updateById = async (req, res) => {
  const id = req.params.id;
  const { name, type, img } = req.body;
  console.log(req.body);
  if (!name || !type || !img) {
    return res.status(400).send("Please provide all value");
  }
  try {
    const result = await Restaurant.findOne({ where: { id: id } });
    if (!result) {
      return res.status(404).send("Not Found restaurant with id : " + id);
    }
    await Restaurant.update({ name, type, img }, { where: { id: id } });
    res.status(201).send(`Updated 1 row ! ID : ${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server");
  }
};

module.exports = { getAll, getById, create, deleteById, updateById };
