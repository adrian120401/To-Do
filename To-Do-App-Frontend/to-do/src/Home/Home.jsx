import { useEffect, useState, useContext } from "react";
import { UserAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAdd } from "@fortawesome/free-solid-svg-icons";
import { getAllTodos, getListsByUser } from "../api/getData";
import { toDoCompleted } from "../api/editData";
import { SelectedOptionContext } from "../context/OptionsContext";
import { ModalAdd } from "../components/Modal";

const Home = ({ url }) => {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [currentTodos, setCurrentTodos] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext)

  const { user } = UserAuth();


  useEffect(() => { 
    if (user && Object.keys(user).length !== 0) {
      getAllTodos(user, url).then((data) => {
        setTodos(data)
        setCurrentTodos(data)
      })
      getListsByUser(user, url).then((data) => {
        data.unshift("All")
        setLists(data)
        setSelectedOption("All")
        setIsLoading(false)
      })
    }
  }, [user, url])


  useEffect(() => {
    handleFilterTodos(selectedOption)
  },[selectedOption, todos.length])

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
    const updatedTodos = [...currentTodos]
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setCurrentTodos(updatedTodos);
    toDoCompleted(
      user,
      url,
      updatedTodos[index].id,
      updatedTodos[index].isCompleted
    )
  }

  const handleFilterTodos = (item) => {
    const filterList = item === "All" || !item ? todos : todos.filter((todo) => todo.lists.includes(item))
    setCurrentTodos(filterList)
  };

  const handleOptionChange = (item) => {
    setSelectedOption(item)
  }

  const handleAddTodo = () => {
    setModalOpen(true)
  }

  const handleIsCompletedDebounced = debounce(handleIsCompleted, 400)

  const allTodos = () => {
    return currentTodos.map((todo, index) => {
      return (
        <div
          className="d-flex shadow mb-3 rounded"
          style={{ backgroundColor: "rgba(20,20,20,0.2)" }}
          key={index}
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
      )
    })
  }

  const allLists = () =>{
    return lists.map((item, index) =>{
        return(
        <li className="list-group-item d-flex justify-content-between align-items-center" key={index} onClick={() => handleOptionChange(item)}>
          {item}
        </li>
        )
    })
  }
  return (
    <div className="container mx-0">
      <div className="row">
        <div className="col-sm mt-4 d-none d-lg-block">
          <ul className="list-group">
            {isLoading ? <p>Is loading....</p> : allLists()}
          </ul>
        </div>
        <div className="container mt-4 col-sm  mx-auto">
        <h3 className="border-bottom pb-1 mb-3">{selectedOption}</h3> 
        {currentTodos.length !== 0 ?
          allTodos()
         : 
          <p>Create your first ToDo!</p>
        }
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary rounded-circle" type="button" onClick={handleAddTodo}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </div>
      <ModalAdd isShow={modalOpen} setShowModal={setModalOpen} url={url} user={user} lists={lists} todos={todos} setTodos={setTodos} />
    </div>
  );
};

export { Home };
