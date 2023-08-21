import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { editCurrentToDo } from "../api/editData";


const ModalInfo = ({isShow,setShowModalInfo,url, user,todos, setTodos, currentTodo,setCurrentTodo, defaultLists, userLists}) => {
    const [todoText, setTodoText] = useState("")
    const [currentList, setCurrentList] = useState("")
    const [areChanges, setAreChanges] = useState(true)


    useEffect(()=>{
        if(currentTodo){
            setTodoText(currentTodo.text)
            setCurrentList(currentTodo.lists)
        } 
    }, [currentTodo])

    useEffect(()=>{
        setAreChanges(currentTodo?.text === todoText && currentTodo?.lists === currentList)
    },[todoText, currentList])

    const getOptions = () => {
        const userListArr = userLists.map(({ name }) => name)
        return [...defaultLists, ...userListArr].map((list, index) => {
          return <option key={index} value={list}>{list}</option>;
        });
    };

    const editToDo = (event) => {
        event.preventDefault()
        const newTodo = {
            completed: currentTodo.completed,
            isCompleted: currentTodo.isCompleted,
            lists: currentList,
            modified: Date.now(),
            text: todoText,
            id: currentTodo.id
          };
        editCurrentToDo(url,user, newTodo).then((data) => {
            if(data.ok){
                const newTodos = todos.filter(todo => todo.id !== newTodo.id)
                setTodos([...newTodos, newTodo])
                setShowModalInfo(false)
                newTodo.modified = new Date(newTodo.modified).toISOString()
                setCurrentTodo(newTodo)
            }
        })
    }
    return(
        <Modal show={isShow} onHide={() => setShowModalInfo(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit to-do</Modal.Title>
            </Modal.Header>
            <Form onSubmit={editToDo}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="Form.ControlTextarea">
                    <Form.Control required as="textarea" rows={3}
                     value={todoText} onChange={(event) => {setTodoText(event.target.value)}} />
                </Form.Group>
                <div className="">
                    <p>Modified: {currentTodo?.modified.split("T")[0]}</p>
                    {currentTodo?.isCompleted ? <p>Completed: {currentTodo?.completed.split("T")[0]}</p> : null}  
                </div>
                
                <Form.Group controlId="Form.ControlSelect">
                    <Form.Select required value={currentList} onChange={(event) => {setCurrentList(event.target.value)}}>
                        {getOptions()}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModalInfo(false)}>
            Close
          </Button>
          <Button variant="success" type="submit" disabled={areChanges}>
            Edit
          </Button>
        </Modal.Footer>
        </Form>
        </Modal>
    )
}

export {ModalInfo}