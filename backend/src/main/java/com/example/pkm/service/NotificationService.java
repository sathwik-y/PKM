package com.example.pkm.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.pkm.model.Notification;
import com.example.pkm.model.Users;
import com.example.pkm.repository.NotificationRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepo notificationRepo;
    private final UserService userService;
    @Transactional
    public Notification pushNotif(String username, Notification notification) {
        Users user =  userService.findByUserName(username);
        if(user==null) throw new RuntimeException("User not found");
        try{
            user.getNotifications().add(notification);
            notification.setUser(user);
            return notificationRepo.save(notification);
        }catch(Exception e){
            throw new RuntimeException("Failed to push Notification",e);
        }
    }
    @Transactional(readOnly = true)
    public List<Notification> pullNotif(String username) {
        Users user =  userService.findByUserName(username);
        if(user==null) throw new RuntimeException("User not found");
        return user.getNotifications();
    }
    @Transactional
    public void clearNotifs(String username) {
        Users user =  userService.findByUserName(username);
        if(user==null) throw new RuntimeException("User not found");
        List<Notification> notifList = user.getNotifications();
        notifList.clear();
        notificationRepo.deleteAll(notifList);
    }

    @Transactional
    public void clearNotif(String username, Long id) {
        Users user =  userService.findByUserName(username);
        if(user==null) throw new RuntimeException("User not found");
        Notification notif = notificationRepo.findById(id).orElseThrow(() -> new RuntimeException("Notifcation not found"));
        user.getNotifications().remove(notif);
        notif.setUser(null);
        notificationRepo.deleteById(id);   
    }
    public Long getOverdueReminders(String username) {
        return pullNotif(username).stream()
                .filter(notif -> notif.getReminderTime()!=null && notif.getReminderTime().isBefore(LocalDateTime.now()))
                .count();
    }
    
}

