import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    sender: { type: String, enum: ['user', 'system'], required: true },
    message: { type: String, required: true },
    date: { type: Number, required: true }
})

const chatModel = mongoose.models.chat || mongoose.model("chat", chatSchema);
export default chatModel;
