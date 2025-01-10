import { useState, useEffect, ChangeEvent } from "react";
import api from "../../services/api";
import { Todo } from "../../type/todo";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [desc, setTitle] = useState<string>("");

  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editDesc, setEditDesc] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await api.get<Todo[]>("todolist");

    console.log(response.data);
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (desc.trim()) {
      const newTodo = { desc, status: "0" };
      await api.post<Todo>("todolist", newTodo);
      setTitle("");
      fetchTodos();
    }
  };

  const updateTodo = async () => {
    if (editTodoId !== null && editDesc.trim()) {
      const updatedTodo = { desc: editDesc, status: '0' }; // Adjust `status` if needed
      await api.put<Todo>(`todolist/${editTodoId}`, updatedTodo);
      setEditTodoId(null);
      setEditDesc('');
      fetchTodos(); // Refresh the list after update
    }
  };
  

  const deleteTodo = async (id: number) => {
    await api.delete(`todolist/${id}`);
    fetchTodos();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Todo List</h1>

<div className="flex items-center gap-2 mb-4">
  <input
    type="text"
    value={desc}
    onChange={handleInputChange}
    placeholder="Add a new todo"
    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    onClick={addTodo}
    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    Add
  </button>
</div>

<ul className="space-y-3">
  {todos.map((todo) => (
    <li key={todo.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200">
      {editTodoId === todo.id ? (
        <>
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <button
              onClick={updateTodo}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Save
            </button>
            <button
              onClick={() => setEditTodoId(null)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-lg">{todo.desc}</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditTodoId(todo.id);
                setEditDesc(todo.desc);
              }}
              className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>

    </div>
  );
}  

export default Home;