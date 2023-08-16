package com.ToDo.easyTask.model;

import java.util.Date;
import java.util.List;

public class ToDo {
    private String text;

    private Date completed;
    private Date modified;
    private String lists;

    private String id;

    private Boolean isCompleted;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getModified() {
        return modified;
    }

    public void setModified(Date modified) {
        this.modified = modified;
    }

    public String getLists() {
        return lists;
    }

    public void setLists(String lists) {
        this.lists = lists;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCompleted() {
        return completed;
    }

    public void setCompleted(Date completed) {
        this.completed = completed;
    }

    public void setIsCompleted(Boolean completed) {
        this.isCompleted = completed;
    }

    public Boolean getIsCompleted(){
        return isCompleted;
    }

}
