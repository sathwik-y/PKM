package com.example.pkm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pkm.model.Notification;

@Repository
public interface NotificationRepo extends JpaRepository<Notification,Long>{
    
}
