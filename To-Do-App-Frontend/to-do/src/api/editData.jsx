const toDoCompleted = async (user, url, id, status) => {
  try {
    const token = await user.getIdToken()
    const requestOptions = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }

    await fetch(
      `${url}/api/toDoCompleted?id=${id}&status=${status}`,
      requestOptions
    );
  } catch (error) {
    console.error(error)
    throw error
  }
};

const editCurrentToDo = async(url, user, todo) =>{
  try {
    const token = await user.getIdToken()
    const requestOptions = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todo)
    }

    await fetch(
      `${url}/api/editTodo}`,
      requestOptions
    );
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {toDoCompleted}
