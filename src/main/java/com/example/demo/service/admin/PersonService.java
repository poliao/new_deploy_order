package com.example.demo.service.admin;

import com.example.demo.entity.admin.Person;
import com.example.demo.repository.admin.PersonRepository;
import com.example.demo.service.token.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String login(String username, String password) {
        Person person = personRepository.findByUsername(username);

        if (person != null && person.getPassword().equals(password)) {
            return jwtUtil.generateToken(person.getUsername(), person.getFirstName(), person.getLastName(), person.getEmail(), person.getRole());
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
}