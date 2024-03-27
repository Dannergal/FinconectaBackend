const ItemModel = require('./Item');
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors'); // Import cors middleware
require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Get all items
app.get("/api/items", async (req, res) => {
  ItemModel.find({}).then(function(users) {
      res.json({ data : users})
  }).catch(function(err) {
    console.log(err)
  }) 
});

// Get single item by ID
app.get("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  const o_id = new mongoose.Types.ObjectId(itemId);

  ItemModel.findOne({ _id: o_id }) 
  .then(item => {
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ data: item });
  })
  .catch(err => {
    console.error('Error fetching item by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  });
});

// Create new item
app.post("/api/items", (req, res) => {
  const newItemData = req.body; // Extract the data for the new item from the request body

  // Create a new item using the provided data
  ItemModel.create(newItemData)
    .then(createdItem => {
      // If the item is successfully created, return the newly created item
      res.status(201).json({ data: createdItem });
    })
    .catch(err => {
      // If there's an error during the database operation, return a 500 error
      console.error('Error creating item:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Update item
app.put("/api/items/:id", (req, res) => {
  const itemId = req.params.id; // Extract the item ID from the request parameters
  const newData = req.body; // Extract the updated data from the request body

  // Find the item by its ID and update it with the new data
  ItemModel.findOneAndUpdate(itemId, newData, { new: true })
    .then(updatedItem => {
      if (!updatedItem) {
        // If the item is not found, return a 404 error
        return res.status(404).json({ error: 'Item not found' });
      }
      // If the item is successfully updated, return the updated item
      res.json({ data: updatedItem });
    })
    .catch(err => {
      // If there's an error during the database operation, return a 500 error
      console.error('Error updating item by ID:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Delete item
app.delete("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  const o_id = new mongoose.Types.ObjectId(itemId);
  ItemModel.findOneAndDelete({ _id: o_id })
    .then(deletedItem => {
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting item by ID:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
