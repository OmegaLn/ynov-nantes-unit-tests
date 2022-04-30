const ToDo = require('../todoModel.js').ToDo;

describe('ToDoModel.js tests', () => {
    it('should update name attribute ', async () => {
        const todo = new ToDo({
            text: 'My todo'
        });
        todo.text = 'Other toDo';
        
        expect(todo.text).toBe('Other toDo');
    });
    it('should update isDone attribute', async () => {
        const todo = new ToDo({
            text: 'Other todo'
        });
        todo.isDone = true;
        
        expect(todo.done).toBe(true);
    });
});