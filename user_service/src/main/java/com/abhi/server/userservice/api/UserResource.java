package com.abhi.server.userservice.api;

import com.abhi.server.userservice.entity.User;
import com.abhi.server.userservice.manager.UserManager;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/user")
public class UserResource {

    private UserManager userManger;

    @Inject
    public UserResource(UserManager userManager){
        this.userManger = userManager;
    }

    @Path("check")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String check(){
        return "This is users REST API";
    }

    @Path("all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAll(){
        return userManger.getUsers();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createUser(User user){
        if(user == null){
            throw new IllegalArgumentException("User Object can not be null!!");
        }
        return userManger.addUser(user);
    }

    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@PathParam("id") String id){
        return userManger.getUserById(id);
    }

}
