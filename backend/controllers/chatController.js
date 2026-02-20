import chatModel from "../models/chatModel.js";
import { getContextualResponse, specialityMap } from "../utils/knowledgeBase.js";
import doctorModel from "../models/doctorModel.js";

// API to send message 
const sendMessage = async (req, res) => {
    try {
        const { userId, message } = req.body
        const actualUserId = req.userId || userId

        const newMessage = new chatModel({
            userId: actualUserId,
            sender: 'user',
            message,
            date: Date.now()
        })

        await newMessage.save()

        // Get initial contextual response and intent
        const context = getContextualResponse(message);
        let responseMessage = context.response;
        const lowercaseMsg = message.toLowerCase();

        // Dynamic Logic: Speciality-based doctor lookup
        let specialityFound = null;
        for (const [key, value] of Object.entries(specialityMap)) {
            if (lowercaseMsg.includes(key) || lowercaseMsg.includes(value.toLowerCase())) {
                specialityFound = value;
                break;
            }
        }

        if (specialityFound) {
            const doctors = await doctorModel.find({ speciality: specialityFound, available: true }).limit(5).select('name speciality fees experience');
            if (doctors.length > 0) {
                const docStrings = doctors.map(d => `- Dr. ${d.name} (${d.experience} exp, Fee: ₹${d.fees})`);
                responseMessage = `Here are some of our top ${specialityFound}s:\n${docStrings.join('\n')}\n\nYou can book a consultation with any of them by visiting their profile!`;
            } else {
                responseMessage = `We currently don't have any available ${specialityFound}s in our database. Please check back later!`;
            }
        }

        // Dynamic Logic: Specific Doctor Detailed Inquiry
        const doctorNames = await doctorModel.find({}).select('name fees speciality experience address degree about available');
        for (const doc of doctorNames) {
            const docNameLower = doc.name.toLowerCase();
            const hasDrPrefix = lowercaseMsg.includes(`dr. ${docNameLower}`) || lowercaseMsg.includes(`dr ${docNameLower}`);

            if (lowercaseMsg.includes(docNameLower) || hasDrPrefix) {
                if (lowercaseMsg.includes('about') || lowercaseMsg.includes('who is') || lowercaseMsg.includes('detail') || lowercaseMsg.includes('education') || lowercaseMsg.includes('degree')) {
                    responseMessage = `Dr. ${doc.name} (${doc.degree}) is a ${doc.speciality} with ${doc.experience} of experience.\n\nAbout: ${doc.about}\n\nAddress: ${doc.address.line1}, ${doc.address.line2}\nFee: ₹${doc.fees}\nStatus: ${doc.available ? 'Available' : 'Currently Unavailable'}`;
                } else {
                    responseMessage = `Dr. ${doc.name} is a ${doc.speciality} with ${doc.experience} experience. They practice at ${doc.address.line1}, ${doc.address.line2} and their consultation fee is ₹${doc.fees}. Would you like more details about them?`;
                }
                break;
            }
        }

        // Dynamic Logic: General Fee Inquiry (if not specific doctor)
        if (!responseMessage.includes('charge') && (lowercaseMsg.includes('fee') || lowercaseMsg.includes('cost') || lowercaseMsg.includes('how much'))) {
            responseMessage = "Consultation fees start from ₹300. You can view the specific fees for each doctor on their profile page.";
        }

        // General fallback for 'doctor' keyword
        if (!specialityFound && !responseMessage.includes('Dr.') && (lowercaseMsg.includes('doctor') || lowercaseMsg.includes('available'))) {
            const doctors = await doctorModel.find({ available: true }).limit(2).select('name speciality');
            if (doctors.length > 0) {
                const docNames = doctors.map(d => `Dr. ${d.name} (${d.speciality})`).join(', ');
                responseMessage = `We have several trusted doctors available, such as ${docNames}. Would you like to see the full list?`;
            }
        }

        const systemResponse = new chatModel({
            userId: actualUserId,
            sender: 'system',
            message: responseMessage,
            date: Date.now() + 1000
        })

        await systemResponse.save()

        res.json({ success: true, message: 'Message sent' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get chat history
const getChats = async (req, res) => {
    try {
        const { userId } = req.body
        const actualUserId = req.userId || userId
        const chats = await chatModel.find({ userId: actualUserId }).sort({ date: 1 })

        res.json({ success: true, chats })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to clear chat history
const clearChats = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        await chatModel.deleteMany({ userId });
        res.json({ success: true, message: 'Chat history cleared' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { sendMessage, getChats, clearChats }
