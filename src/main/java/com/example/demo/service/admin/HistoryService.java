package com.example.demo.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.admin.History;
import com.example.demo.repository.admin.HistoryRepository;

import java.util.List;
import java.util.Map;
@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    public List<History> getAllHistory() {
        return historyRepository.findAll();
    }

    public History saveHistory(History history) {
        return historyRepository.save(history);
    }

    public void deleteHistory(Long id) {
        historyRepository.deleteById(id);
    }

     public List<Map<String, Object>> getSalesByYear(int year) {
        return historyRepository.findSalesByYear(year);
    }

   
}
