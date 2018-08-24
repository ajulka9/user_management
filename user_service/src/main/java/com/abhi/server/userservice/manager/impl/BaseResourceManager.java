package com.abhi.server.userservice.manager.impl;

import com.abhi.server.userservice.entity.BaseEntity;

public abstract class BaseResourceManager {
    protected abstract void updateMetaData(BaseEntity resource, String metaData);
    protected abstract void updateCreatedTime(BaseEntity resource, String date);

}
