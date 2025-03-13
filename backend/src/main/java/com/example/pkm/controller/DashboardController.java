package com.example.pkm.controller;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.pkm.DTO.DashboardData;
import com.example.pkm.model.ContentItem;
import com.example.pkm.service.ContentItemService;
import com.example.pkm.service.NotificationService;
import com.example.pkm.service.TagService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DashboardController {
    private final ContentItemService contentItemService;
    private final TagService tagService;
    private final NotificationService notificationService;

    @GetMapping("/dashboard")
    @Transactional(readOnly = true)
    public ResponseEntity<DashboardData> getDashboard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println("Fetching dashboard data for user: " + username);
        try {
            List<ContentItem> allItems = contentItemService.getAllItems(username);
            int totalItems = allItems != null ? allItems.size() : 0;
            System.out.println("Total items retrieved: " + totalItems);

            Long overdueReminders = notificationService.getOverdueReminders(username);
            System.out.println("Overdue reminders: " + overdueReminders);

            Map<String, Long> topTags = tagService.getTopTags(username);
            System.out.println("Top tags retrieved: " + (topTags != null ? topTags : "null"));

            List<ContentItem> recentItems = contentItemService.getRecentItems(username);
            System.out.println("Recent items retrieved: " + (recentItems != null ? recentItems.size() : "null"));

            DashboardData dashboardData = new DashboardData(totalItems, overdueReminders, topTags, recentItems);
            System.out.println("Dashboard data assembled successfully");
            return new ResponseEntity<>(dashboardData, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error in getDashboard for user " + username + ": " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}