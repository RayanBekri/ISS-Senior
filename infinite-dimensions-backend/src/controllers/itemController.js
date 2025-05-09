// src/controllers/itemController.js
require('dotenv').config();
const pool = require('../config/db');
const { validationResult } = require('express-validator');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// --- AWS S3 setup ---
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

// --- multer-s3 middleware for up to 10 images under the "website/" folder ---
const uploadImages = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, `website/${filename}`);
    },
  }),
}).array('images', 10);

exports.uploadImages = uploadImages;

// GET /api/items
exports.getItems = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM item');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// POST /api/items
// First middleware: uploadImages
exports.createItem = [
  uploadImages,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required.' });
    }

    // Collect all uploaded URLs
    const urls = req.files.map(f => f.location);

    try {
      const [result] = await pool.query(
        `INSERT INTO item 
          (name, description, price, image_url) 
         VALUES (?, ?, ?, ?)`,
        [ name, description, price, JSON.stringify(urls) ]
      );
      res.status(201).json({
        message: 'Item created',
        itemId: result.insertId,
        images: urls
      });
    } catch (err) {
      next(err);
    }
  }
];

// PUT /api/items/:id
// First middleware: uploadImages (can upload 0–10 new images)
exports.updateItem = [
  uploadImages,
  async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // If new files were uploaded, collect their URLs; otherwise leave image_url untouched
    let urls;
    if (req.files && req.files.length > 0) {
      urls = req.files.map(f => f.location);
    }

    // Build dynamic SQL
    const fields = ['name = ?', 'description = ?', 'price = ?'];
    const params = [name, description, price];
    if (urls) {
      fields.push('image_url = ?');
      params.push(JSON.stringify(urls));
    }
    params.push(id);

    try {
      await pool.query(
        `UPDATE item 
           SET ${fields.join(', ')}
         WHERE item_id = ?`,
        params
      );
      res.json({ message: 'Item updated', images: urls || 'unchanged' });
    } catch (err) {
      next(err);
    }
  }
];

// DELETE /api/items/:id
exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM item WHERE item_id = ?', [id]);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};


exports.uploadImages = uploadImages;