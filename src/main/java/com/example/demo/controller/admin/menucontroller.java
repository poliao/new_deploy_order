package com.example.demo.controller.admin;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.demo.entity.admin.menuitem;

import com.example.demo.service.Share.FileStorageService;
import com.example.demo.service.admin.menuservice_add_admin;

import java.io.IOException;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin/menus")
public class menucontroller {

    private final FileStorageService fileStorageService = new FileStorageService();
    @Autowired
    private menuservice_add_admin menuService;



    @PostMapping
    public String createMenu(@RequestBody menuitem menuDTO) {
        return menuService.saveMenu(menuDTO);
    }

    @GetMapping
    public List<menuitem> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }

    @GetMapping("/{id}")
    public Optional<menuitem> getMenuItemById(@PathVariable("id") Long id) {
        return menuService.getMenuItemById(id);
    }

    @PutMapping("/{id}")
    public String updateMenu(@PathVariable("id") Long id, @RequestBody menuitem menuDTO) {
        return menuService.updateMenu(id, menuDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteMenu(@PathVariable("id") Long id) {
        return menuService.deleteMenu(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, List<String>>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> fileUrls = new ArrayList<>();
        Map<String, List<String>> response = new HashMap<>();

        try {
            for (MultipartFile file : files) {
                String fileUrl = fileStorageService.storeFile(file);
                fileUrls.add(fileUrl);
            }
            response.put("fileUrls", fileUrls);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", List.of("Failed to upload files: " + e.getMessage())));
        }
    }

  
    @GetMapping("/subscribe/{menuId}")
    public SseEmitter subscribeToMenuUpdates(@PathVariable("menuId") Long menuId) {
        
        return menuService.subscribe(menuId);
    }
 

    @PostMapping("/updateTotal")
    public String updateTotal(@RequestParam("namemenu") String namemenu, @RequestParam("newTotal") Long newTotal) {
        return menuService.updateTotal(namemenu, newTotal);
    }
    
}
