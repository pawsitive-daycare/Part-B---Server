const { getAllUsers, getUser, registerUser, loginUser, updateUser, deleteUser } = require("../userController");
const { userModel} = require("../../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Mocking dependencies
jest.mock("../../models/user.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");



describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  

  describe(getAllUsers, () => {
    it("should return all users with status 200", async () => {
      const mockUsers = [{ email: "test@example.com" }];
      userModel.find.mockResolvedValue(mockUsers);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("should return an error with status 500 if something goes wrong", async () => {
      userModel.find.mockRejectedValue(new Error("Database error"));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    });
  });

  describe(getUser, () => {
    it("should return a user by ID with status 200", async () => {
      const mockUser = { _id: "123", email: "test@example.com" };
      userModel.findById.mockResolvedValue(mockUser);

      const req = { params: { id: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should return 404 if the user is not found", async () => {
      userModel.findById.mockResolvedValue(null);

      const req = { params: { id: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe(registerUser, () => {
    it("should create a new user and return it with status 201", async () => {
      const mockUser = { _id: "123", email: "test@example.com" };
      userModel.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      userModel.prototype.save = jest.fn().mockResolvedValue(mockUser);

      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
          firstName: "Test",
          lastName: "User",
          phoneNumber: "1234567890",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      
    });

    it("should return 400 if the user already exists", async () => {
      userModel.findOne.mockResolvedValue({ email: "test@example.com" });

      const req = { body: { email: "test@example.com" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });
  });

  describe(loginUser, () => {
    it("should authenticate a user and return a token", async () => {
      const mockUser = { _id: "123", email: "test@example.com", password: "hashedPassword" };
      userModel.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockToken");

      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        userId: mockUser._id,
        token: "mockToken",
      });
    });

    it("should return 404 if the user is not found", async () => {
      userModel.findOne.mockResolvedValue(null);

      const req = { body: { email: "test@example.com", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  // Additional tests for updateUser and deleteUser would follow the same pattern
});
