package com.example.demo.repository.user;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.user.MenuOrder_user;

@Repository
public interface MenuOrderUserRepository extends JpaRepository<MenuOrder_user, Long> {
    
    Page<MenuOrder_user> findByStatusNot(String status, Pageable pageable);
    
    List<MenuOrder_user> findByTable_TableId(String tableId);
    
    void deleteByTable_TableId(String tableId);
}
