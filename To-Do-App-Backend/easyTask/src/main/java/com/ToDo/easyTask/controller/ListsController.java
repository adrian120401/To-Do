package com.ToDo.easyTask.controller;

import com.ToDo.easyTask.service.ListsService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
public class ListsController {

    private final ListsService listsService;

    public ListsController(ListsService listsService) {
        this.listsService = listsService;
    }

    @GetMapping("/api/getListsByUser")
    public List<Map<String,String>> getListsByUser(@RequestHeader("Authorization") String authToken) throws FirebaseAuthException, ExecutionException, InterruptedException {
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

            String userId = decodedToken.getUid();

            return listsService.getListsByUser(userId);
        }catch (FirebaseAuthException | ExecutionException | InterruptedException e){
            throw e;
        }
    }

    @GetMapping("/api/getDefaultLists")
    public List<String> getDefaultLists(@RequestHeader("Authorization") String authToken) throws FirebaseAuthException, ExecutionException, InterruptedException {
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

            String userId = decodedToken.getUid();

            return listsService.getDefaultLists();
        }catch (FirebaseAuthException | ExecutionException | InterruptedException e){
            throw e;
        }
    }

    @PostMapping("/api/addNewList")
    public ResponseEntity<String> addNewList(@RequestHeader("Authorization") String authToken, @RequestParam(name = "list", required = true) String list)throws Exception{
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String userId = decodedToken.getUid();
            listsService.addNewList(userId, list);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"List created correctly\"}");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\": \"Could not created list\"}");
        }
    }

    @DeleteMapping("api/deleteList")
    public ResponseEntity<String> deleteList(@RequestHeader("Authorization") String authToken, @RequestParam(name="id") String id, @RequestParam(name = "list") String list){
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String userId = decodedToken.getUid();
            listsService.deleteList(userId, id, list);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("{\"message\": \"List deleted correctly\"}");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\": \"Could not deleted list\"}");
        }

    }

}
