package com.abhi.server.userservice.api;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.net.URISyntaxException;

@Path("login")
public class LoginResource {

    @Context
    private ServletContext context;
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response startLogin(@Context ContainerRequestContext context) throws URISyntaxException, FileNotFoundException {

        context.getPropertyNames().stream().forEach(System.out::println);
        FileReader fr = new FileReader("login.html");
        java.net.URI location = new java.net.URI("../login.html");
        return Response.temporaryRedirect(location).build();
    }
}
