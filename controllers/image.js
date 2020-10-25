const Clarifai = require('clarifai');
const API_KEY = process.env.API_KEY;
const app = new Clarifai.App({
  apiKey: API_KEY,
});

const handleImage = (req, res, db) => {
  const { name } = req.body;
  const response = db.prepare('SELECT * FROM users WHERE name=?').get(name);
  const count = response.count + 1;
  db.prepare('UPDATE users SET count=? WHERE name=?').run(count, name);
  res.json({ count });
};

const handleFaceApi = async (req, res) => {
  try {
    const faceModel = await app.models.initModel({ id: Clarifai.FACE_DETECT_MODEL });
    const data = await faceModel.predict(req.body.input);
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.json('error working with api');
  }
};

module.exports = {
  handleImage: handleImage,
  handleFaceApi: handleFaceApi,
};
