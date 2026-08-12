import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import api from "../services/endPoints";
import { useAuth } from "../context/useAuth";

const SimpleTodoList = () => {

  const [initial, setInitial] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const { token, logout } = useAuth();

  const authConfig = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  const getInput = (e) => {
    setInitial(e.target.value);
    setError("");
  };


  const GetTodo = useCallback(async () => {
    try {
      const res = await axios.get(api.todo.getTodo, authConfig);
      setData(res.data?.data || []);

    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      } else {
        setError(error.response?.data?.message || "Unable to load tasks.");
      }
    }
  }, [authConfig, logout]);

  useEffect(() => {
    let isActive = true;

    const loadTasks = async () => {
      try {
        const res = await axios.get(api.todo.getTodo, authConfig);

        if (isActive) {
          setData(res.data?.data || []);
        }
      } catch (error) {
        if (!isActive) {
          return;
        }

        if (error.response?.status === 401) {
          logout();
        } else {
          setError(error.response?.data?.message || "Unable to load tasks.");
        }
      }
    };

    loadTasks();

    return () => {
      isActive = false;
    };
  }, [authConfig, logout]);

  const CreateTodo = async () => {
    try {
      if (!initial.trim()) {
        setError("Please enter a task title.");
        return;
      }

      await axios.post(api.todo.createtodo, {
        title: initial,
      }, authConfig);

      setInitial("");
      GetTodo();

    } catch (error) {
      setError(error.response?.data?.message || "Unable to add task.");
    }
  };

  const UpdateTodo = async () => {
    try {
      if (!initial.trim()) {
        setError("Please enter a task title.");
        return;
      }

      await axios.put(`${api.todo.updatetodo}/${editId}`, {
        title: initial
      }, authConfig);

      setInitial("");
      setEditId(null);
      GetTodo();

    } catch (error) {
      setError(error.response?.data?.message || "Unable to update task.");
    }
  };

  
  const DeleteTodo = async (id) => {
    try {
      await axios.delete(`${api.todo.deletetodo}/${id}`, authConfig);
     
      const updatedData = data.filter(todo => todo._id !== id);
      setData(updatedData);
    

    } catch (error) {
      setError(error.response?.data?.message || "Unable to delete task.");
    }
  };


  const editTask = (todo) => {
    setInitial(todo.title);
    setEditId(todo._id);
  };

  return (
    <div className="flex justify-center items-start">

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 sm:p-6">

        <h1 className="text-3xl font-bold text-center mb-6">
          Todo List
        </h1>

        {error && (
          <p className="bg-red-50 text-red-600 border border-red-200 rounded px-3 py-2 mb-4 text-sm text-left">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">

          <input
            type="text"
            value={initial}
            onChange={getInput}
            placeholder="Add new todo..."
            className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => {
              editId ? UpdateTodo() : CreateTodo();
            }}
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setInitial("");
                setError("");
              }}
              className="border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          )}

        </div>

        <div className="mt-6 space-y-2">

          {data.length > 0 ? (
            data.map((todo) => (

              <div
                key={todo._id}
                className="bg-gray-100 px-4 py-2 rounded flex items-center hover:bg-gray-200 transition-colors"
              >

                <span className="flex-1 text-left break-words">{todo.title}</span>

                <MdEdit
                  onClick={() => editTask(todo)}
                  className="text-blue-500 cursor-pointer text-xl mr-3 hover:text-blue-600"
                />

                <MdDelete
                  onClick={() => DeleteTodo(todo._id)}
                  className="text-red-500 cursor-pointer text-xl hover:text-red-600"
                />

              </div>

            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No todos yet. Add one above!</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default SimpleTodoList;
