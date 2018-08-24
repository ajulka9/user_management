package com.abhi.server.userservice;


import com.abhi.server.userservice.api.LoginResource;
import com.abhi.server.userservice.api.TestResource;
import com.abhi.server.userservice.api.UserResource;
import org.glassfish.jersey.server.ResourceConfig;
public class MyResourceConfig extends ResourceConfig {

    public MyResourceConfig(){

        super();
        register(UserResource.class);
        register(TestResource.class);
        register(LoginResource.class);
        register(new MyAbstractBinder());
////        register(org.glassfish.jersey.jsonb.JsonBindingFeature.class);
//        register(User.class);
////        register(JacksonProviderImpl.class);
//        packages(true, "com.oracle.abhi");
    }
}
