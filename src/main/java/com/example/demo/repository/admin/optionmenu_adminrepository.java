package com.example.demo.repository.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.admin.optionmenu_admin;

@Repository
public interface optionmenu_adminrepository extends JpaRepository<optionmenu_admin, Long> {
}
