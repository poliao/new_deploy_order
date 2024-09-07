package com.example.demo.repository.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.admin.menuitem;

public interface menuitem_adminrepository extends JpaRepository<menuitem, Long> {
}