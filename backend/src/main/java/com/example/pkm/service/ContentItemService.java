package com.example.pkm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import com.example.pkm.model.ContentItem;
import com.example.pkm.model.Users;
import com.example.pkm.repository.ContentItemRepo;

@RequiredArgsConstructor
@Service
public class ContentItemService {
    private final UserService userService;
    private final ContentItemRepo contentItemRepo;

    @Transactional
    public ContentItem createItem(ContentItem contentItem, String username) {
        try {
            Users user = userService.findByUserName(username);
            if (user == null) throw new RuntimeException("User not found: " + username);
            contentItem.setUser(user);
            user.getContentItems().add(contentItem);
            return contentItemRepo.save(contentItem);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create ContentItem", e);
        }
    }

    @Transactional
    public List<ContentItem> getAllItems(String username) {
        Users user = userService.findByUserName(username);
        if (user == null) throw new RuntimeException("User not found: " + username);
        return user.getContentItems();
    }

    @Transactional
    public void deleteItem(Long id) {
        contentItemRepo.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<ContentItem> getRecentItems(String username) {
        List<ContentItem> recentItems = contentItemRepo.findTop3ByUserOrderByDesc(username);
        if (recentItems == null || recentItems.isEmpty()) {
            Users user = userService.findByUserName(username);
            if (user != null && !user.getContentItems().isEmpty()) {
                // Fallback: Sort in-memory if query fails
                return user.getContentItems().stream()
                        .filter(item -> item.getCreatedAt() != null)
                        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                        .limit(3)
                        .collect(Collectors.toList());
            }
            return new ArrayList<>();
        }
        return recentItems;
    }
}