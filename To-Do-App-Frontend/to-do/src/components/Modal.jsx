import { Button, Modal, Form } from "react-bootstrap";
import { addNewToDo } from "../api/addData";
import { useState } from "react";
const ModalAdd = ({ isShow, setShowModal, url, user, lists, todos, setTodos}) => {
  const [taskText, setTaskText] = useState("")
  const [selectedOptionList , setSelectedOptionList] = useState("")
  const [error , setError] = useState(false)

  const handleAddNewToDo = (event) => {
    event.preventDefault()
    if (user && Object.keys(user).length !== 0) {
      const newTodo = {
        completed: null,
        isCompleted: false,
        lists: [selectedOptionList],
        modified: Date.now(),
        text: taskText,
      };

      addNewToDo(user,url, newTodo).then((data) => {
        if(data.ok){
          setTodos([...todos, newTodo])
          setShowModal(false)
          setTaskText("")
          setSelectedOptionList("")
        }else{
          setError(true)}
        }
        )
    }
  };

  const getOptions = () => {
    return lists.map((list, index) => {
      return <option key={index} value={list}>{list}</option>;
    });
  };

  return (
    <Modal show={isShow} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new to-do</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleAddNewToDo}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="Form.ControlTextarea">
            <Form.Control required as="textarea" rows={3} placeholder="Add new task" value={taskText} onChange={(event) => setTaskText(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="Form.ControlSelect">
            <Form.Select required value={selectedOptionList} onChange={(event) => setSelectedOptionList(event.target.value)}>
              <option value="" disabled>Select an option</option>
              {getOptions()}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export { ModalAdd };
