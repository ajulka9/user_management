package com.abhi.server.userservice;

import com.abhi.server.userservice.entity.User;
import com.abhi.server.userservice.manager.UserManager;
import org.jvnet.hk2.annotations.Service;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Random;

@Service
@Path("/user")
public class MyRestService {

    UserManager um ;

    @Inject
    @Named("UM")
    public MyRestService(UserManager um){
        this.um = um;
        System.out.println("User Manager: "+ um);
    }

//    @Path("/user")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(){
//        List<User> users =  UserManagerImpl.getInstance().getUsers();
//        Users u = new Users();
//        u.setUsers(users);
//        return u;
        Random r = new Random();
        int res =r.nextInt(100-1) + 1;
      final User u = new User(res+"","abhi@oracle.com","abhi","kumar");
        GenericEntity entity = new GenericEntity<User>(u, User.class);
        um.addUser(u);
        return Response.ok(entity).build();
//      UserManagerImpl.getInstance().addUser(u);
//      return u;
    }

//    @Path("/check")
//    @GET
//    @Produces(MediaType.TEXT_PLAIN)
//    public String check(){
//        return "This is users REST API";
//    }
//
//    @Path("/all")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<User> getAll(){
////        return UserManagerImpl.getInstance().getUsers();
//        return um.getUsers();
//    }

//    @Path("/{id}")
//    @Produces(MediaType.APPLICATION_JSON)
//    @GET
//    public User getUserById(@PathParam("id") String id){
////        if (UserManagerImpl.getInstance().userCollection.containsKey(id)) {
////            return UserManagerImpl.getInstance().getUserById(id);
////        }
////        else{
////            return null;
////        }
//        return um.getUserById(id);
//    }
}
