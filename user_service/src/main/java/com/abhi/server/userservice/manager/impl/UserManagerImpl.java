package com.abhi.server.userservice.manager.impl;

import com.abhi.server.userservice.entity.BaseEntity;
import com.abhi.server.userservice.entity.User;
import com.abhi.server.userservice.manager.UserManager;
import org.jvnet.hk2.annotations.Service;
import javax.inject.Singleton;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@Singleton
@Service
public class UserManagerImpl extends BaseResourceManager implements UserManager {

    static Map<String, User> userCollection = new HashMap<>();


    public UserManagerImpl() {
    }

    private String generateRandomUid(){
        return UUID.randomUUID().toString();
    }
    private String getCurrentTime(){
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(cal.getTime());
    }
    public User addUser(User user){

        String id = generateRandomUid();
        user.setId(id);
        this.userCollection.put(id, user);

        updateCreatedTime(user, getCurrentTime());
        updateMetaData(user, "{created: by_test," +
                "abc:def}");
        return user;
    }

    public User getUserById(String id){
        User u =  this.userCollection.get(id);
        if(u == null){
            return null;
        }
        else{
            return u;
        }
    }

    public List<User> getUsers(){
       return this.userCollection.values().stream().collect(Collectors.toList());
    }

    @Override
    protected void updateMetaData(BaseEntity resource, String metaData) {
        resource.setMetaData(metaData);
    }

    @Override
    protected void updateCreatedTime(BaseEntity resource, String date) {
        resource.setCreatedTime(date);

    }

}
