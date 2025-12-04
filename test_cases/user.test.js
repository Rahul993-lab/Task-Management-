jest.mock("../model/user.model", () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
}));

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));

const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controller/user.controller");

describe("User Controller Unit Tests", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("createUser → should register a new user", async () => {

        userModel.findOne.mockResolvedValue(null); // no existing email
        bcrypt.hash.mockResolvedValue("hashed_password");

        const mockUser = {
            id: "123",
            name: "John",
            email: "john@test.com",
            password: "hashed_password",
            update: jest.fn()
        };

        userModel.create.mockResolvedValue(mockUser);
        jwt.sign.mockReturnValue("fake_jwt_token");

        const result = await userController.createUser({
            name: "John",
            email: "john@test.com",
            password: "123456"
        });

        expect(userModel.findOne).toHaveBeenCalled();
        expect(bcrypt.hash).toHaveBeenCalled();
        expect(userModel.create).toHaveBeenCalled();
        expect(mockUser.update).toHaveBeenCalledWith({ token: "fake_jwt_token" });
        expect(result.token).toBe("fake_jwt_token");
    });

    test("createUser → should throw if email already registered", async () => {

        userModel.findOne.mockResolvedValue({ id: 1 });

        await expect(userController.createUser({
            name: "John",
            email: "john@test.com",
            password: "123456"
        })).rejects.toThrow("Email already registered");
    });

    test("loginUser → should login successfully", async () => {

        const mockUser = {
            id: "123",
            name: "John",
            email: "john@test.com",
            password: "hashed_password"
        };

        userModel.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("login_jwt_token");

        const result = await userController.loginUser({
            email: "john@test.com",
            password: "123456"
        });

        expect(result.token).toBe("login_jwt_token");
        expect(result.user.email).toBe("john@test.com");
    });

    test("loginUser → should fail when user not found", async () => {

        userModel.findOne.mockResolvedValue(null);

        await expect(userController.loginUser({
            email: "john@test.com",
            password: "123456"
        })).rejects.toThrow("User not found");
    });

    test("loginUser → should fail for wrong password", async () => {

        userModel.findOne.mockResolvedValue({
            id: "123",
            email: "john@test.com",
            password: "hashed_password"
        });

        bcrypt.compare.mockResolvedValue(false);

        await expect(userController.loginUser({
            email: "john@test.com",
            password: "wrong"
        })).rejects.toThrow("Invalid password");
    });

    test("getUser → should return all users", async () => {

        const mockUsers = [
            { id: "1", name: "John" },
            { id: "2", name: "Jane" }
        ];

        userModel.findAll.mockResolvedValue(mockUsers);

        const result = await userController.getUser();

        expect(result.length).toBe(2);
        expect(userModel.findAll).toHaveBeenCalled();
    });

});
