package com.example.pkm.DTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.pkm.model.ContentItem;

import lombok.Data;

@Data
public class DashboardData {
    private int totalItems;
    private long overdueReminders;
    private Map<String, Long> topTags;
    private List<ContentItem> recentItems;

    public DashboardData() {
        this.totalItems = 0;
        this.overdueReminders = 0L;
        this.topTags = new HashMap<>();
        this.recentItems = new ArrayList<>();
    }

    public DashboardData(int totalItems, Long overdueReminders, Map<String, Long> topTags, List<ContentItem> recentItems) {
        this.totalItems = totalItems;
        this.overdueReminders = overdueReminders != null ? overdueReminders : 0L;
        this.topTags = topTags != null ? topTags : new HashMap<>();
        this.recentItems = recentItems != null ? recentItems : new ArrayList<>();
    }
}