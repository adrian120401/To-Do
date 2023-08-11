package com.ToDo.easyTask.service;

import com.ToDo.easyTask.model.ToDo;
import com.ToDo.easyTask.repository.ToDoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ToDoService {

    Logger logger = LoggerFactory.getLogger(ToDoService.class);

    private final ToDoRepository toDoRepository;

    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public List<ToDo> getAllToDos(String userId) throws ExecutionException, InterruptedException {
        return toDoRepository.getAllToDos(userId);
    }

    public void toDoCompleted(String userId, String id, Boolean status) throws ExecutionException, InterruptedException {
        toDoRepository.toDoCompleted(userId,id, status);
    }

    public void addNewTodo(String userId, ToDo todo) throws ExecutionException, InterruptedException {
        toDoRepository.addNewTodo(userId,todo);
    }
}
