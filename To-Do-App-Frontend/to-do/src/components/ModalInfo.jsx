import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";


const ModalInfo = ({isShow,setShowModalInfo, currentTodo, defaultLists, userLists}) => {
    const [todoText, setTodoText] = useState("")
    const [currentList, setCurrentList] = useState("")


    useEffect(()=>{
        if(currentTodo){
            setTodoText(currentTodo.text)
            setCurrentList(currentTodo.lists)
        } 
    }, [currentTodo])

    const getOptions = () => {
        const userListArr = userLists.map(({ name }) => name)
        userListArr.splice(userListArr.indexOf(currentTodo?.lists), 1)
        return [...defaultLists, ...userListArr].map((list, index) => {
          return <option key={index} value={list}>{list}</option>;
        });
    };

    return(
        <Modal show={isShow} onHide={() => setShowModalInfo(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit to-do</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="Form.ControlTextarea">
                    <Form.Control required as="textarea" rows={3}
                     value={todoText} onChange={(event) => setTodoText(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="Form.ControlSelect">
                    <Form.Select required value={currentList} onChange={(event) => setCurrentList(event.target.value)}>
                        <option value={currentTodo?.lists}>{currentTodo?.lists}</option>
                        {getOptions()}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
        </Modal>
    )
}

export {ModalInfo}