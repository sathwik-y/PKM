package com.example.pkm.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pkm.model.ContentItem;

@Repository
public interface ContentItemRepo extends JpaRepository<ContentItem, Long> {

    @Query(value = "Select ci FROM ContentItem ci where ci.user.userName = :username order by ci.createdAt DESC limit 3")
    List<ContentItem> findTop3ByUserOrderByDesc(@Param("username") String username);

    // List<ContentItem> findByTag(String tagName);

}
