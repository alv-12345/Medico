export const specialityMap = {
    'skin': 'Dermatologist',
    'heart': 'Cardiologist',
    'child': 'Pediatrician',
    'kidney': 'Nephrologist',
    'brain': 'Neurologist',
    'stomach': 'Gastroenterologist',
    'women': 'Gynecologist',
    'bone': 'Orthopedic',
    'general': 'General physician',
    'physician': 'General physician',
    'physicians': 'General physician',
    'physicial': 'General physician',
    'fever': 'General physician',
    'cold': 'General physician',
    'flu': 'General physician',
    'pregnant': 'Gynecologist',
    'pregnancy': 'Gynecologist',
    'baby': 'Pediatrician',
    'eye': 'Ophthalmologist',
    'vision': 'Ophthalmologist',
    'teeth': 'Dentist',
    'tooth': 'Dentist'
};

const intentBase = [
    {
        intent: 'greeting',
        patterns: [/\bhi\b/i, /\bhello\b/i, /\bhey\b/i, /greetings/i],
        response: "Hello! I'm your Medico Assistant. How can I help you today?"
    },
    {
        intent: 'booking_info',
        patterns: [/how to book/i, /\bappointment\b/i, /\bbooking\b/i, /book an appointment/i],
        response: "You can book an appointment through the Medico app’s appointment section. Select your doctor, choose a time slot, and confirm your booking."
    },
    {
        intent: 'about_medico',
        patterns: [/about medico/i, /what is medico/i, /services/i],
        response: "Medico is a comprehensive medical platform where you can connect with trusted doctors and manage your health journey."
    },
    {
        intent: 'fees_general',
        patterns: [/\bfees\b/i, /\bcost\b/i, /\bprice\b/i, /how much/i],
        response: "Consultation fees start from ₹300. You can view the specific fees for each specialist on their profile."
    },
    {
        intent: 'cancellation',
        patterns: [/cancel/i, /cancellation/i, /refund/i],
        response: "You can manage or cancel your bookings from the 'My Appointments' page. Please refer to our policy for details on refunds."
    },
    {
        intent: 'health_general',
        patterns: [/diabetes/i, /fever/i, /cold/i, /flu/i, /headache/i, /covid/i],
        response: "For any specific health condition, please consult a medical professional for detailed advice and diagnosis."
    },
    {
        intent: 'contact_support',
        patterns: [/\bcontact\b/i, /\bsupport\b/i, /\bhelp\b/i, /\breach\b/i],
        response: "If you need assistance with technical issues, you can reach us through our contact page or email support@medico.com."
    }
];

export const getContextualResponse = (message) => {
    const lowercaseMsg = message.toLowerCase();

    for (const item of intentBase) {
        if (item.patterns.some(pattern => pattern.test(lowercaseMsg))) {
            return { response: item.response, intent: item.intent };
        }
    }

    return {
        response: "I'm not sure I understand. Could you please rephrase? Type 'help' to see what I can assist with.",
        intent: 'unknown'
    };
};
