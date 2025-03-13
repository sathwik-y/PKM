package com.example.pkm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.example.pkm.model.Tag;
import com.example.pkm.model.Users;
import com.example.pkm.repository.TagRepo;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {
    private final UserService userService;
    private final TagRepo tagRepo;

    @Transactional
    public Tag createTag(Tag tag, String userName) {
        Users user = userService.findByUserName(userName);
        if (user == null) throw new RuntimeException("User not found");
        try {
            if (tag.getTagName() == null || tag.getTagName().trim().isEmpty()) {
                throw new IllegalArgumentException("Tag name cannot be null or empty");
            }
            tag.setUser(user);
            return tagRepo.save(tag);
        } catch (Exception e) {
            throw new RuntimeException("Error while creating tag", e);
        }
    }

    @Transactional(readOnly = true)
    public List<Tag> getAllTags(String userName) {
        Users user = userService.findByUserName(userName);
        if (user == null) throw new RuntimeException("User not found");
        return user.getTags();
    }

    @Transactional
    public void deleteTag(String userName, Long id) {
        Users user = userService.findByUserName(userName);
        if (user == null) throw new RuntimeException("User not found");
        Tag tag = tagRepo.findById(id).orElseThrow(() -> new RuntimeException("Tag not found"));
        user.getTags().remove(tag);
        tag.setUser(null);
        tagRepo.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getTopTags(String username) {
        Users user = userService.findByUserName(username);
        if (user == null) throw new RuntimeException("User not found");
        List<Tag> tags = user.getTags();
        if (tags == null || tags.isEmpty()) {
            return new HashMap<>();
        }
        return tags.stream()
                .filter(tag -> tag.getTagName() != null && !tag.getTagName().trim().isEmpty())
                .collect(Collectors.groupingBy(Tag::getTagName, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, HashMap::new));
    }
}