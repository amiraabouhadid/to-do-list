import Home from "./src/modules/Home";
describe("add task function", () => {
  test("increases tasks by one", () => {
    let event = { target: { value: "hi" } };
    Home.addTask(event);
    expect(tasks).toHaveLength(1);
  });
});
