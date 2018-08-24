package com.abhi.server.userservice.manager;

import com.abhi.server.userservice.entity.User;
import org.jvnet.hk2.annotations.Contract;

import java.util.List;

@Contract
public interface UserManager {
    public List<User> getUsers();
    public User getUserById(String id);
    public User addUser(User user);
}
