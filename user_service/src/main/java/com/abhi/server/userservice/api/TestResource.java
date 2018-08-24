package com.abhi.server.userservice.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("hello")
public class TestResource {
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getHelloPlain() {
        return "Hello World!";
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    public String getHelloHtm() {
        return "<html><head></head><body><strong>Hello World!</strong></body></html>";
    }

    @Path("{friend}")
    @GET
    public String greet(@PathParam("friend") String friend){
        if (friend.equalsIgnoreCase("html")){
            return getHelloHtm();
        }
        return "Hello " + friend ;
    }

}