const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {

    async createUser(data) {

        const existing = await userModel.findOne({
            where: { email: data.email }
        });

        if (existing) {
            throw new Error("Email already registered");
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const user = await userModel.create({
            name: data.name,
            email: data.email,
            password: hashPassword
        });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        await user.update({ token });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    },


    async loginUser(data) {
        const user = await userModel.findOne({ email: data.email });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    },

    async getUser() {

        const result = await userModel.findAll({
            attributes: {
                exclude: ["password", "token"]
            }
        });
        
        return result;
    }

};

module.exports = userController;
