package com.ToDo.easyTask.controller;

import com.ToDo.easyTask.service.ListsService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class ListsController {

    private final ListsService listsService;

    public ListsController(ListsService listsService) {
        this.listsService = listsService;
    }

    @GetMapping("/api/getListsByUser")
    public List<String> getListsByUser(@RequestHeader("Authorization") String authToken) throws FirebaseAuthException, ExecutionException, InterruptedException {
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

            String userId = decodedToken.getUid();

            return listsService.getListsByUser(userId);
        }catch (FirebaseAuthException | ExecutionException | InterruptedException e){
            throw e;
        }
    }
}
