package com.ToDo.easyTask.service;

import com.ToDo.easyTask.repository.ListsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ListsService {

    private final ListsRepository listsRepository;

    public ListsService(ListsRepository listsRepository) {
        this.listsRepository = listsRepository;
    }

    public List<String> getListsByUser(String userId) throws ExecutionException, InterruptedException {
        return listsRepository.getListsByUser(userId);
    }
}
