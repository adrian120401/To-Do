import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";


const ModalInfo = ({isShow,setShowModalInfo, currentTodo, defaultLists, userLists}) => {
    const [todoText, setTodoText] = useState("")
    const [currentList, setCurrentList] = useState("")
    const [areChanges, setAreChanges] = useState(true)


    useEffect(()=>{
        if(currentTodo){
            setTodoText(currentTodo.text)
            setCurrentList(currentTodo.lists)
        } 
    }, [currentTodo])

    const getOptions = () => {
        const userListArr = userLists.map(({ name }) => name)
        return [...defaultLists, ...userListArr].map((list, index) => {
          return <option key={index} value={list}>{list}</option>;
        });
    };

    const editToDo = (event) => {
        event.preventDefault()
        console.log("here")
    }

    const verificateChanges = () => {
        setAreChanges(currentTodo.text !== todoText || currentTodo.lists !== currentList)
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
                     value={todoText} onChange={(event) => {verificateChanges();setTodoText(event.target.value)}} />
                </Form.Group>
                <div className="">
                    <p>Modified: {currentTodo?.modified.split("T")[0]}</p>
                    {currentTodo?.isCompleted ? <p>Completed: {currentTodo.completed.split("T")[0]}</p> : null}  
                </div>
                
                <Form.Group controlId="Form.ControlSelect">
                    <Form.Select required value={currentList} onChange={(event) => {verificateChanges();setCurrentList(event.target.value)}}>
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