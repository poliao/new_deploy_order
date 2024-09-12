package com.example.demo.repository.admin;

import com.example.demo.entity.user.MenuOrder_user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuOrderRepository extends JpaRepository<MenuOrder_user, Long> {
}