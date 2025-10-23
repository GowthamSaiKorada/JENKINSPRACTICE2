package com.klef.dev.model;

import jakarta.persistence.*;

@Entity
@Table(name = "apartmentdb")
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "house_no")
    private Integer id;

    @Column(name = "house_name", nullable = false, length = 50)
    private String name;

    @Column(name = "house_members", nullable = false)
    private Integer age;

    @Column(name = "house_contact", length = 20)
    private String contact;

    @Column(name = "house_email", length = 100)
    private String email;

    // Getters & Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
