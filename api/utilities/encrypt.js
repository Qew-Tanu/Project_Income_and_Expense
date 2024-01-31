const bcrypt = require('bcrypt');

require("dotenv").config()

exports.hashPassword = async (plaintextPassword) => {
    try {
        const hash = await bcrypt.hash(plaintextPassword, 10);
        return hash
    } catch (error) {
        console.log(error);
    }
}

exports.comparePassword = async (plaintextPassword, hash) => {
    try {
        console.log("test3");
        const result = await bcrypt.compare(plaintextPassword, hash);
        return result
    } catch (error) {
        console.log(error);
    }

}