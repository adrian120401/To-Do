package com.ToDo.easyTask.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class ListsRepository {

    public List<String> getListsByUser(String userId) throws ExecutionException, InterruptedException {
        List<String> lists = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("lists").document("default");

        ApiFuture<DocumentSnapshot> future = docRef.get();

        DocumentSnapshot document = future.get();
        List<String> defaultLists = (List<String>) document.get("lists");
        lists.addAll(defaultLists);

        return lists;
    }
}
