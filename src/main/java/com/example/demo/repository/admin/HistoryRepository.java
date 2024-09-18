package com.example.demo.repository.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.admin.History;


@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
}
