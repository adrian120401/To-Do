import { useEffect, useState, useContext } from "react";
import { UserAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getAllTodos, getListsByUser, getDefaultLists } from "../api/getData";
import { toDoCompleted } from "../api/editData";
import { ListsContext } from "../context/ListContext";
import { ModalAdd } from "../components/Modal";
import { deleteList } from "../api/deleteData";
import { addNewList } from "../api/addData";

const Home = ({ url }) => {
  const [todos, setTodos] = useState([]);
  const [newList, setNewList] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const { selectedOption, setSelectedOption,
     listUser, setListUser,
     defaultLists, setDefaultLists } = useContext(
    ListsContext
  );

  const { user } = UserAuth();

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      getAllTodos(user, url).then((data) => {
        setTodos(data);
        setCurrentTodos(data);
      });
      getDefaultLists(user, url).then((data) => {
        setDefaultLists(data);
      });
      getListsByUser(user, url).then((data) => {
        setListUser(data)
        setIsLoading(false);
      });
    }
  }, [user, url]);

  useEffect(() => {
    handleFilterTodos(selectedOption);
  }, [selectedOption, todos.length]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleIsCompleted = (index) => {
    const updatedTodos = [...currentTodos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setCurrentTodos(updatedTodos);
    toDoCompleted(
      user,
      url,
      updatedTodos[index].id,
      updatedTodos[index].isCompleted
    );
  };

  const handleFilterTodos = (item) => {
    const filterList =
      item === "" || !item
        ? todos
        : todos.filter((todo) => todo.lists === item);
    setCurrentTodos(filterList);
  };

  const handleOptionChange = (item) => {
    setSelectedOption(item);
  };

  const handleAddTodo = () => {
    setModalOpen(true);
  };

  const handleIsCompletedDebounced = debounce(handleIsCompleted, 400);

  const saveNewList = () => {
    if(newList !== ""){
      addNewList(user,url,newList).then((data) => {
      if(data.ok){
        const value = {
          "id": listUser.length + 1,
          "name" : newList
        }
        setListUser([...listUser, value])
        setNewList("")
      }
    })
    }
  }


  const deleteItem = (e, id, list) => {
    e.stopPropagation();
    deleteList(user, url, id, list).then((data) => {
      if (data.ok) {
        const newList = listUser.filter((list) => list.id !== id);
        setListUser(newList);
      }
    });
  };

  const allTodos = () => {
    return currentTodos.map((todo, index) => {
      return (
        <div
          className="d-flex shadow mb-3 rounded"
          style={{ backgroundColor: "rgba(20,20,20,0.2)" }}
          key={todo.id}
        >
          <button
            onClick={() => handleIsCompletedDebounced(index)}
            type="button"
            className="border-0 p-2 btn"
          >
            {todo.isCompleted ? (
              <FontAwesomeIcon icon={faCheck} style={{ color: "#00ff11" }} />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
          </button>
          <div>
            <p>{todo.text}</p>
          </div>
        </div>
      );
    });
  };

  const allDefaultLists = () => {
    return defaultLists.map((item, index) => {
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={index}
          onClick={() => handleOptionChange(item)}
        >
          {item}
        </li>
      );
    });
  };

  const allUserLists = () => {
    return listUser.map((item, index) => {
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={item.id}
          onClick={() => handleOptionChange(item.name)}
        >
          
            {item.name}
           <div> 
            <button
              className="btn btn-primary-secondary rounded-circle"
              type="button"
              onClick={(e) => deleteItem(e, item.id, item.name)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="container mx-0">
      <div className="row">
        <div className="col-sm mt-4 d-none d-lg-block">
          <ul className="list-group">
            {isLoading ? (
              <p>Is loading....</p>
            ) : (
              <>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={() => handleOptionChange("")}
                >
                  All
                </li>
                {allDefaultLists()}
                <div style={{ borderBottom: "1px solid #333" }}></div>
                {allUserLists()}
                <li>
                   <div className="input-group">
                    <input
                      type="text"
                      className="form-control pr-3"
                      placeholder="Create a new list"
                      value={newList}
                      onChange={(event) => setNewList(event.target.value)}
                      aria-label="Create a new list"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append m-">
                      <button
                        className="btn btn-primary-secondary rounded-circle"
                        type="button"
                        onClick={saveNewList}
                      >
                        <FontAwesomeIcon icon={faAdd} />
                      </button>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="container mt-4 col-sm  mx-auto">
          <h3 className="border-bottom pb-1 mb-3">
            {selectedOption != "" ? selectedOption : "All"}
          </h3>
          {currentTodos.length !== 0 ? (
            allTodos()
          ) : (
            <p>Create your first ToDo!</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary rounded-circle"
          type="button"
          onClick={handleAddTodo}
        >
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </div>
      <ModalAdd
        isShow={modalOpen}
        setShowModal={setModalOpen}
        url={url}
        user={user}
        defaultLists={defaultLists}
        userLists={listUser}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};

export { Home };
