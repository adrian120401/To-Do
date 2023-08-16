const deleteList = async(user,url, id, list) => {
    try{
        const token = await user.getIdToken()
        const requestOptions = {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }

       return await fetch(`${url}/api/deleteList?id=${id}&list=${list}`, requestOptions)
    }catch (error) {
        console.log(error)
        throw error
    }
}

export {deleteList}