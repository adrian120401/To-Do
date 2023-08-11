package com.ToDo.easyTask.controller;

import com.ToDo.easyTask.model.ToDo;
import com.ToDo.easyTask.service.ToDoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class ToDoController {

    private final ToDoService toDoService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping("/api/getAllToDos")
    public List<ToDo> getAllToDos(@RequestHeader("Authorization") String authToken) throws ExecutionException, InterruptedException, FirebaseAuthException {
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

            String userId = decodedToken.getUid();

            return toDoService.getAllToDos(userId);
        } catch (FirebaseAuthException e) {
            throw e;
        }
    }

    @PutMapping("/api/toDoCompleted")
    public void toDoCompleted(@RequestHeader("Authorization") String authToken,@RequestParam("id") String id
            ,@RequestParam("status") Boolean status) throws FirebaseAuthException, ExecutionException, InterruptedException {
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

            String userId = decodedToken.getUid();

            toDoService.toDoCompleted(userId,id, status);
        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw e;
        }
    }

    @PostMapping("/api/addNewTodo")
    public ResponseEntity<String> addNewTodo(@RequestHeader("Authorization") String authToken, @RequestBody ToDo todo)throws Exception{
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String userId = decodedToken.getUid();
            toDoService.addNewTodo(userId, todo);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"To-do created correctly\"}");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\": \"Could not created to-do\"}");
        }
    }
    @PostMapping("/api/addNewList")
    public ResponseEntity<String> addNewList(@RequestHeader("Authorization") String authToken, @RequestBody String list)throws Exception{
        try {
            String idToken = authToken.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String userId = decodedToken.getUid();
            toDoService.addNewList(userId, list);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"List created correctly\"}");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("{\"message\": \"Could not created list\"}");
        }
    }

    @GetMapping("/test")
    public String test(){
        return "Test";
    }
}
