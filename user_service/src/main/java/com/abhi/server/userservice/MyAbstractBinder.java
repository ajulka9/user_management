package com.abhi.server.userservice;

import com.abhi.server.userservice.manager.UserManager;
import com.abhi.server.userservice.manager.impl.UserManagerImpl;
import org.glassfish.hk2.utilities.binding.AbstractBinder;

public class MyAbstractBinder extends AbstractBinder {

    @Override
    protected void configure() {
        bind(UserManagerImpl.class).to(UserManager.class);
    }
}
