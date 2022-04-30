const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { ToDo } = require("../toDoModel");

beforeAll(async () => {
    jest.setTimeout(30000);
  await mongoose
    .connect("mongodb://mongo:27017/toDoApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
});

describe("create toDos objects", () => {
    test('should retun todo content', async () => {
        const mytoDo = await ToDo.create({ text: "My toDo", isDone: false });
        await mytoDo.save();
        const toDoObject = await ToDo.find({ text: "My toDo", isDone: false }, (err, docs) => {
            try {
                return docs
            } catch (err) {
                console.error(err)
          }
        });
        expect(toDoObject.text).toBe("My toDo");
    
})
test('should return if a toDo is done or not', async () => {
    const mytoDo = await ToDo.create({ text: "My toDo", isDone: false });
    await mytoDo.save();
    const toDoObject = await ToDo.find({ text: "My toDo", isDone: false }, (err, docs) => {
        try {
            return docs
        } catch (err) {
            console.error(err)
      }
    });
    expect(toDoObject.isDone).toBe(false);
    
    });
    
        
});