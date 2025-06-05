const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true }, 
    icon: { type: String, required: true },  
    color: { type: String, required: true },
    description: { type: String, required: true }, 
    link: { type: String, required: true },  
    category: { type: String, required: false }, 
    usageCount: { type: Number, default: 0 }, 
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
