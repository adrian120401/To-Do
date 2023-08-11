const getAllTodos = async (user, url) => {
  try {
    const token = await user.getIdToken();
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${url}/api/getAllToDos`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getListsByUser = async(user,url) => {
  try {
    const token = await user.getIdToken();
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${url}/api/getListsByUser`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getDefaultLists = async(user,url) => {
  try {
    const token = await user.getIdToken();
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${url}/api/getDefaultLists`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export { getAllTodos, getListsByUser, getDefaultLists };
