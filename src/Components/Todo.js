import React, { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button'
import "./Todo.css";
function Todo() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [editId, setEditId] = useState(0);

  const addToDo = () => {
    if (toDo !== "") {
      setToDos([...toDos, { list: toDo, id: Date.now(), status: false }]);
      console.log(toDos);
      setToDo("");
    }
    if (editId) {
      const updatedToDos = toDos.map((todo) =>
        todo.id === editId ? { ...todo, list: toDo } : todo
      );
      setToDos(updatedToDos);
      setEditId(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inutRef = useRef("null");

  useEffect(() => {
    // console.log(inutRef.current)
    inutRef.current.focus();
  });

  const onDelete = (id) => {
    setToDos(toDos.filter((toDo) => toDo.id !== id));
  };

  const onComplete = (id) => {
    console.log(id);
    let completedItem = toDos.map((toDo) => {
      if (toDo.id === id) {
        // toDo.status=!toDo.status;
        return { ...toDo, status: !toDo.status };
      }
      return toDo;
    });
    //setToDo(completedItem)
    setToDos(completedItem);
  };

  const onEdit = (id) => {
    console.log(id);
    const editTodo = toDos.find((toDo) => toDo.id === id);
    console.log(editTodo);
    console.log(editTodo.list);
    setToDo(editTodo.list);
    setEditId(id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          onChange={(event) => setToDo(event.target.value)}
          value={toDo}
          ref={inutRef}
          type="text"
          placeholder="Enter your todo"
          className="form-control"
        />
        <Button className="addoredit" variant="light" onClick={addToDo}>{editId ? "EDIT" : "ADD"}</Button>
      </form>
      <div className="list">
        <ul>
          {toDos.map((toDo, index) => (
            <li className="list-items" key={index}>
              <div
                className="list-item-list"
                id={toDo.status ? "list-item" : ""}
              >
                {toDo.list}{" "}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(toDo.id)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(toDo.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(toDo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
