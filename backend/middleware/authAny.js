import jwt from 'jsonwebtoken'

const authAny = async (req, res, next) => {
    const { token, dtoken, atoken } = req.headers
    const actualToken = token || dtoken || atoken

    if (!actualToken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(actualToken, process.env.JWT_SECRET)

        // For admin, token might be a string (email+password)
        if (typeof token_decode === 'string') {
            req.userId = 'admin'
            req.body.userId = 'admin'
        } else {
            req.userId = token_decode.id
            req.body.userId = token_decode.id
        }

        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAny;
