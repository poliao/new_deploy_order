package com.example.demo.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.user.MenuOrder_user;

import com.example.demo.service.user.BasketUserService;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

import java.util.concurrent.TimeUnit;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/baskets")
public class BasketUserController {

    @Autowired
    private BasketUserService basketUserService;

  

    // @PostMapping
    // public MenuOrder_user createMenuOrder(@RequestBody MenuOrder_user menuOrder) {
    //     return basketUserService.createMenuOrder(menuOrder);
    // }

    @GetMapping("/all")
    public Page<MenuOrder_user> getAllMenuOrders(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return basketUserService.getAllMenuOrders(page, size);
    }

    @GetMapping("/table/{tableId}")
    public List<MenuOrder_user> getMenuOrdersByTableId(@PathVariable("tableId") String tableId) {
        return basketUserService.getBasketsByTableId(tableId);
    }

    @DeleteMapping("/{id}")
    public String deleteMenu(@PathVariable("id") Long id) {
        return basketUserService.deleteMenu(id);
    }

    @DeleteMapping("/delete-by-table/{tableId}")
    public ResponseEntity<String> deleteMenuOrdersByTableId(@PathVariable String tableId) {
        basketUserService.deleteMenuOrdersByTableId(tableId);
        return ResponseEntity.ok("Menu orders deleted successfully for table ID: " + tableId);
    }

    // Endpoint ที่เพิ่มสำหรับ SSE (Real-Time)
    @PutMapping("/{menuId}/status")
    public ResponseEntity<MenuOrder_user> updateStatus(@PathVariable("menuId") Long menuId,
            @RequestParam("status") String status) {
        MenuOrder_user updatedOrder = basketUserService.updateStatusAndNotify(menuId, status);
        return ResponseEntity.ok(updatedOrder); // ตอบกลับสถานะที่อัปเดตแล้ว
    }

    // สร้างการเชื่อมต่อ SSE
    @GetMapping("/table/{tableId}/realtime")
    public SseEmitter streamBasketsByTableId(@PathVariable("tableId") String tableId) {
        SseEmitter emitter = new SseEmitter(300000L); // ตั้งค่า timeout 5 นาที
        basketUserService.streamBasketsByTableId(tableId, emitter);
        return emitter;
    }

    @PostMapping("/create")
    public MenuOrder_user createMenuOrder(@RequestBody MenuOrder_user menuOrder) {
        return basketUserService.createMenuOrder(menuOrder);
    }

    // สตรีมข้อมูลออเดอร์ทั้งหมดแบบเรียลไทม์ผ่าน SSE
    @GetMapping(value = "/realtime", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamAllMenuOrders() {
        SseEmitter emitter = new SseEmitter(TimeUnit.MINUTES.toMillis(30)); // ตั้ง timeout เป็น 30 นาที

        basketUserService.streamAllBaskets(emitter);

        return emitter;
    }


}
