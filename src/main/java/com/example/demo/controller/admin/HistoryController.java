package com.example.demo.controller.admin;

import com.example.demo.service.admin.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import com.example.demo.entity.admin.History;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping
    public List<History> getAllHistory() {
        return historyService.getAllHistory();
    }

    @PostMapping
    public History saveHistory(@RequestBody History history) {
        return historyService.saveHistory(history);
    }

    @DeleteMapping("/{id}")
    public void deleteHistory(@PathVariable("id") Long id) {
        historyService.deleteHistory(id);
    }

    @GetMapping("/sales/{year}")
    public List<Map<String, Object>> getSalesByYear(@PathVariable("year") int year) {
        return historyService.getSalesByYear(year);
    }
}
