package com.abhi.server.userservice.entity;

public class BaseEntity {

    protected String metaData;
    protected String createdTime;

    public String getCreatedTime() {
        return createdTime;
    }

    public String getMetaData() {
        return metaData;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }

    public void setMetaData(String metaData) {
        this.metaData = metaData;
    }
}
