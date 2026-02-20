import paypal from '@paypal/checkout-server-sdk';

const environment = () => {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_SECRET_KEY;

    if (process.env.PAYPAL_MODE === 'live') {
        return new paypal.core.LiveEnvironment(clientId, clientSecret);
    } else {
        return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }
};

const client = () => {
    return new paypal.core.PayPalHttpClient(environment());
};

export default { client };
