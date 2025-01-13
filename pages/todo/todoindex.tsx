import { useState, useEffect, ChangeEvent } from "react";
import api from "../../services/api";
import { Todo } from "../../type/todo";
import "../../styles/globals.css";

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
      const updatedTodo = { desc: editDesc, status: "0" }; // Adjust `status` if needed
      await api.put<Todo>(`todolist/${editTodoId}`, updatedTodo);
      setEditTodoId(null);
      setEditDesc("");
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
      <div className="flex items-center justify-center w-screen h-screen font-medium">
        <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
          <div className="max-w-full p-8 bg-white rounded-lg shadow-lg  w-[700px]">
            <div className="flex items-center mb-6">
              <svg
                className="h-8 w-8 text-indigo-500 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h4 className="font-semibold ml-3 text-lg">Kenjey's To Do List</h4>
            </div>
            <div>
              {todos.map((todo) => {
                return (
                  <div key={todo.id}>
                    {" "}
                    <input
                      className="hidden"
                      type="checkbox"
                      id={`task_${todo.id}`}
                    />
                    <label
                      className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                      htmlFor={`task_${todo.id}`}
                    >
                      <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                        <svg
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="ml-4 text-sm">{todo.desc}</span>{" "}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex">
            <button
              onClick={addTodo}
              className="flex"
            >
              <svg
                className="w-5 h-5 text-gray-400 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            
            </button>
            <input
                type="text"
                value={desc}
                onChange={handleInputChange}
                className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
                placeholder="add to do"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <h1 classNameName="text-3xl font-semibold mb-4">Todo List</h1>

<div classNameName="flex items-center gap-2 mb-4">
  <input
    type="text"
    value={desc}
    onChange={handleInputChange}
    placeholder="Add a new todo"
    classNameName="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    onClick={addTodo}
    classNameName="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    Add
  </button>
</div>

<ul classNameName="space-y-3">
  {todos.map((todo) => (
    <li key={todo.id} classNameName="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200">
      {editTodoId === todo.id ? (
        <>
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            classNameName="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div classNameName="flex gap-2">
            <button
              onClick={updateTodo}
              classNameName="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Save
            </button>
            <button
              onClick={() => setEditTodoId(null)}
              classNameName="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span classNameName="text-lg">{todo.desc}</span>
          <div classNameName="flex gap-2">
            <button
              onClick={() => {
                setEditTodoId(todo.id);
                setEditDesc(todo.desc);
              }}
              classNameName="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              classNameName="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  ))}
</ul> */}
    </div>
  );
};

export default Home;
