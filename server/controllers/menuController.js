const MenuItem = require('../models/MenuItem');

exports.getMenu = async (req, res) => {
    try {
        const menu = await MenuItem.find();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMenuItem = async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        const savedItem = await menuItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
