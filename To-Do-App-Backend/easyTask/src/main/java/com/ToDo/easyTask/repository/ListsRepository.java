package com.ToDo.easyTask.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class ListsRepository {

    Logger logger = LoggerFactory.getLogger(ListsRepository.class);

    private final ToDoRepository toDoRepository;

    public ListsRepository(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public void addNewList(String userId, String list) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        int newId = toDoRepository.verifyDocument(userId, "lists");
        Map<String, String> listObject = new HashMap<>();
        listObject.put("id", String.valueOf(newId));
        listObject.put("name", list);
        dbFirestore.collection("todos").document(userId).collection("lists").document(String.valueOf(newId)).set(listObject);
    }

    public List<Map<String,String>> getListsByUser(String userId) throws ExecutionException, InterruptedException {
        List<Map<String,String>> lists = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference userDocument = dbFirestore.collection("todos").document(userId);

        CollectionReference todosCollection = userDocument.collection("lists");

        ApiFuture<QuerySnapshot> future = todosCollection.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (DocumentSnapshot document : documents) {
            Map<String,String> list = new HashMap<>();
            list.put("id", document.getString("id"));
            list.put("name", document.getString("name"));
            lists.add(list);
        }
        return lists;
    }

    public List<String> getDefaultLists() throws ExecutionException, InterruptedException {
        List<String> lists = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("lists").document("default");

        ApiFuture<DocumentSnapshot> future = docRef.get();

        DocumentSnapshot document = future.get();
        List<String> defaultLists = (List<String>) document.get("lists");
        lists.addAll(defaultLists);

        return lists;
    }

    public void deleteList(String userId, String id, String list) throws ExecutionException, InterruptedException {
        List<Map<String,String>> lists = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference userDocument = dbFirestore.collection("todos").document(userId);
            DocumentReference listDocument = userDocument.collection("lists").document(id);

            toDoRepository.deleteTodosByList(userId, list);
            listDocument.delete();
        }catch (Exception e){
            throw e;
        }

    }

}
