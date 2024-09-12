package com.example.demo.repository.admin;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.admin.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByUsername(String username);
}