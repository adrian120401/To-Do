package com.ToDo.easyTask.repository;

import com.ToDo.easyTask.model.ToDo;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ExecutionException;


@Repository
public class ToDoRepository {

    Logger logger = LoggerFactory.getLogger(ToDoRepository.class);

    public List<ToDo> getAllToDos(String userId) throws ExecutionException, InterruptedException {
        List<ToDo> todos = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();

        DocumentReference userDocument = dbFirestore.collection("todos").document(userId);

        CollectionReference todosCollection = userDocument.collection("todos");

        ApiFuture<QuerySnapshot> future = todosCollection.get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        for (DocumentSnapshot document : documents) {
            ToDo toDo = new ToDo();
            toDo.setId(document.getId());
            toDo.setId(document.getString("id"));
            toDo.setText(document.getString("text"));
            toDo.setLists(document.getString("lists"));
            toDo.setModified(document.getDate("modified"));
            toDo.setIsCompleted(document.getBoolean("isCompleted"));
            if (toDo.getIsCompleted()) {
                toDo.setCompleted(document.getDate("completed"));
            }
            todos.add(toDo);
        }
        return todos;
    }

    public void toDoCompleted(String userId, String id, Boolean status) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        DocumentReference userDocument = dbFirestore.collection("todos").document(userId);

        CollectionReference todosCollection = userDocument.collection("todos");

        DocumentReference todoDocument = todosCollection.document(id);

        todoDocument.update("isCompleted", status);
        if(status){
            Timestamp fechaTimestamp = Timestamp.now();
            todoDocument.update("completed", fechaTimestamp);
        }
    }

    public void addNewTodo(String userId, ToDo todo) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        int newId = verifyDocument(userId, "todos");
        todo.setId(String.valueOf(newId));
        dbFirestore.collection("todos").document(userId).collection("todos").document(String.valueOf(newId)).set(todo);
    }

    public void editTodo(String userId, ToDo todo){
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference userDocument = dbFirestore.collection("todos").document(userId);

        CollectionReference todosCollection = userDocument.collection("todos");

        DocumentReference todoDocument = todosCollection.document(todo.getId());

        todoDocument.update("text", todo.getText());
        todoDocument.update("lists", todo.getLists());
        todoDocument.update("modified", todo.getModified());
    }


    public int verifyDocument(String docId, String document) throws ExecutionException, InterruptedException {
        int newId = 0;
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference userDocRef = dbFirestore.collection("todos").document(docId);
        ApiFuture<DocumentSnapshot> userDocFuture = userDocRef.get();
        DocumentSnapshot userDocSnapshot;
        try {
            userDocSnapshot = userDocFuture.get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return 0;
        }
        if (!userDocSnapshot.exists()) {
            ApiFuture<WriteResult> userDocCreateFuture = userDocRef.set(new HashMap<>());
            try {
                userDocCreateFuture.get();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
                return 0;
            }
        }

        CollectionReference todosCollectionRef = userDocRef.collection(document);
        ApiFuture<QuerySnapshot> collectionsFuture = todosCollectionRef.get();
        try {
            QuerySnapshot querySnapshot = collectionsFuture.get();
            if (querySnapshot.isEmpty()) {
                newId = 1;
            }else{
                List<Integer> idsList = new ArrayList<>();
                for (QueryDocumentSnapshot documentSnapshot : querySnapshot.getDocuments()) {
                    idsList.add(Integer.valueOf(documentSnapshot.getId()));
                }

                newId = Collections.max(idsList) + 1 ;

            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return newId;
    }

    public void deleteTodosByList(String userId, String list) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        try{
            DocumentReference userDocument = dbFirestore.collection("todos").document(userId);

            CollectionReference todosCollection = userDocument.collection("todos");

            ApiFuture<QuerySnapshot> future = todosCollection.get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            for (DocumentSnapshot document : documents) {
                if(Objects.equals(document.getString("lists"), list)){
                    DocumentReference docRef = todosCollection.document(document.getId());
                    docRef.delete();
                }
            }
        }catch (ExecutionException | InterruptedException e){
            logger.error(String.valueOf(e));
            throw e;
        }

    }

    public void deleteToDo(String userId,String id){
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("todos").document(userId)
                .collection("todos").document(id);
        docRef.delete();
    }

}
