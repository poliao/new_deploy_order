package com.example.demo.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.admin.History;
import com.example.demo.service.admin.HistoryService;

import java.util.List;

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
}
