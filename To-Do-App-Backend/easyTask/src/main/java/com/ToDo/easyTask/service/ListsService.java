package com.ToDo.easyTask.service;

import com.ToDo.easyTask.repository.ListsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class ListsService {

    private final ListsRepository listsRepository;

    public ListsService(ListsRepository listsRepository) {
        this.listsRepository = listsRepository;
    }

    public void addNewList(String userId, String list) throws ExecutionException, InterruptedException {
        listsRepository.addNewList(userId,list);
    }

    public List<Map<String,String>> getListsByUser(String userId) throws ExecutionException, InterruptedException {
        return listsRepository.getListsByUser(userId);
    }

    public List<String> getDefaultLists() throws ExecutionException, InterruptedException {
        return listsRepository.getDefaultLists();
    }

    public void deleteList(String userId, String id, String list) throws ExecutionException, InterruptedException {
        listsRepository.deleteList(userId, id, list);
    }
}
