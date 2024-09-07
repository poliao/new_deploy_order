package com.example.demo.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.user.Table_user;

@Repository
public interface TableUserRepository extends JpaRepository<Table_user, Long> {
    // คุณสามารถเพิ่ม custom query methods ได้หากจำเป็น
}
