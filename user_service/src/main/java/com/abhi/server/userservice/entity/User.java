package com.abhi.server.userservice.entity;

import java.io.Serializable;


//@XmlRootElement
public class User  extends BaseEntity implements Serializable {

//    @XmlElement
    private String email;
//    @XmlElement
    private String id;
//    @XmlElement
    private String firstName;
//    @XmlElement
    private String lastName;


    public User(){

    }

    public User(String id, String email, String firstName, String lastName){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    @Override
    public void setCreatedTime(String createdTime) {
        super.setCreatedTime(createdTime);
    }

    @Override
    public void setMetaData(String metaData) {
        super.setMetaData(metaData);
    }
    
    @Override
    public String toString() {
        String user =  "User: {id:"+ id+", email: "+ email+", first: "+firstName+", last: "+lastName+"}";
        System.out.println(user);
        return user;
    }
}
