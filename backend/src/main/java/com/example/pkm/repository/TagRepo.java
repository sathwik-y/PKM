package com.example.pkm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pkm.model.Tag;

@Repository
public interface TagRepo extends JpaRepository<Tag,Long> {
    Tag findByTagName(String tagName);
}
