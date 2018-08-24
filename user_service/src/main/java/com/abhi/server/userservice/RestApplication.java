package com.abhi.server.userservice;

import org.glassfish.hk2.api.ServiceLocator;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.io.IOException;

@ApplicationPath("myapp")
public class RestApplication extends Application {
    public RestApplication(ServiceLocator serviceLocator){
        System.out.println("RestApplication Constructor!!");
    }

    public static void main(String[] args) {
        System.out.println("Starting the Rest Application");
        try {
            Server.startServer();
        }catch (IOException ioe){
            System.out.println("IO exception while starting the server." );
        }
    }
}
