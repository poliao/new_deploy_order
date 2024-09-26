package com.example.demo.repository.admin;

import com.example.demo.entity.admin.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query(value = "SELECT EXTRACT(YEAR FROM created_at) AS year, "
            + "EXTRACT(MONTH FROM created_at) AS month, "
            + "SUM(total * price) AS total_sales "
            + "FROM history "
            + "WHERE EXTRACT(YEAR FROM created_at) = :year "
            + "GROUP BY EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at) "
            + "ORDER BY year, month", nativeQuery = true)
    List<Map<String, Object>> findSalesByYear(@Param("year") int year);
}
