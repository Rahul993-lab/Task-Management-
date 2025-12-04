jest.mock("../model/task.model", () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

const Task = require("../model/task.model");
const taskController = require("../controller/task.controller");

describe("Task Controller Unit Tests", () => {

    afterEach(() => jest.clearAllMocks());

    test("createTask should create and return new task", async () => {

        const mockTask = { id: 1, title: "Task" };
        Task.create.mockResolvedValue(mockTask);

        const result = await taskController.createTask(
            { title: "Task", status: "Pending" },
            "user-123"
        );

        expect(Task.create).toHaveBeenCalled();
        expect(result).toEqual(mockTask);
    });

    test("getTasks should return filtered tasks", async () => {

        const mockTasks = [{ id: 1 }];
        Task.findAll.mockResolvedValue(mockTasks);

        const result = await taskController.getTasks(
            "user-123",
            { status: "Pending" },
            { sortBy: "createdAt", order: "DESC" },
            { page: 1, limit: 10 }
        );

        expect(Task.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockTasks);
    });

    test("getTaskById should return task", async () => {

        const mockTask = { id: 1 };
        Task.findOne.mockResolvedValue(mockTask);

        const result = await taskController.getTaskById(1, "user-123");

        expect(Task.findOne).toHaveBeenCalled();
        expect(result).toEqual(mockTask);
    });

    test("updateTask should update and return updated task", async () => {

        Task.update.mockResolvedValue([1]);
        Task.findOne.mockResolvedValue({ id: 1, title: "Updated" });

        const result = await taskController.updateTask(
            1,
            { title: "Updated" },
            "user-123"
        );

        expect(Task.update).toHaveBeenCalled();
        expect(result.title).toBe("Updated");
    });

    test("deleteTask should delete task", async () => {

        Task.destroy.mockResolvedValue(1);

        const result = await taskController.deleteTask(1, "user-123");

        expect(Task.destroy).toHaveBeenCalled();
        expect(result).toBe(1);
    });

});
