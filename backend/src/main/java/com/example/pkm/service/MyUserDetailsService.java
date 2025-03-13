package com.example.pkm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.pkm.model.UserPrincipal;
import com.example.pkm.model.Users;
import com.example.pkm.repository.UserRepo;

@Service
public class MyUserDetailsService implements  UserDetailsService{
    @Autowired
    private UserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = repo.findByUserName(username);
        if(user == null){
            throw new UsernameNotFoundException("user not found");
        }   
        return new UserPrincipal(user);
        }
}

