package com.example.pkm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pkm.model.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, Long>{
        Users findByUserName(String userName);
        Users findByEmailId(String emailId);
}
