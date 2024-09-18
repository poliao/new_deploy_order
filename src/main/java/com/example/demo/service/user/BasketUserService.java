package com.example.demo.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;

import org.springframework.stereotype.Service;


import com.example.demo.entity.user.MenuOrder_user;

import com.example.demo.repository.user.MenuOrderUserRepository;

import jakarta.transaction.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class BasketUserService {
    @Autowired
    private MenuOrderUserRepository menuOrderUserRepository;

    // เปลี่ยนจาก List เป็น CopyOnWriteArrayList
    // เพื่อให้สามารถลบหรือแก้ไขรายการขณะวนลูปได้อย่างปลอดภัย
    private final Map<String, CopyOnWriteArrayList<SseEmitter>> emitters = new ConcurrentHashMap<>();

    public Page<MenuOrder_user> getAllMenuOrders(int page, int size) {
        Pageable pageable = PageRequest.of(page, size); // Create pagination request
        return menuOrderUserRepository.findAll(pageable); // Return paginated data
    }

    @Transactional
    public MenuOrder_user createMenuOrder(MenuOrder_user menuOrder) {
       
        return menuOrderUserRepository.save(menuOrder); 
    }

    public List<MenuOrder_user> getBasketsByTableId(String tableId) {
        return menuOrderUserRepository.findByTable_TableId(tableId);
    }

     @Transactional
    public String deleteMenu(Long id) {
        Optional<MenuOrder_user> menuOpt = menuOrderUserRepository.findById(id);
        if (menuOpt.isPresent()) {
            menuOrderUserRepository.deleteById(id);
            return "ลบเมนูสำเร็จ";
        } else {
            return "ไม่พบเมนู";
        }
    }

    @Transactional
    public void deleteMenuOrdersByTableId(String tableId) {
        menuOrderUserRepository.deleteByTable_TableId(tableId);
    }

    // ฟังก์ชันสำหรับอัปเดตสถานะในฐานข้อมูล
    @Transactional
    public MenuOrder_user updateStatus(Long menuId, String status) {
        Optional<MenuOrder_user> menuOrderOptional = menuOrderUserRepository.findById(menuId);
        if (menuOrderOptional.isPresent()) {
            MenuOrder_user menuOrder = menuOrderOptional.get();
            menuOrder.setStatus(status);
            return menuOrderUserRepository.save(menuOrder); // อัปเดตลงฐานข้อมูล
        } else {
            throw new RuntimeException("MenuOrder not found with id: " + menuId);
        }
    }

    // ฟังก์ชันอัปเดตสถานะและส่งการแจ้งเตือน SSE พร้อม retry
    @Transactional
    public MenuOrder_user updateStatusAndNotify(Long menuId, String status) {
        // อัปเดตสถานะในฐานข้อมูล
        MenuOrder_user updatedOrder = updateStatus(menuId, status);

        // ส่งการแจ้งเตือน SSE พร้อม retry 3 ครั้งหากเกิดข้อผิดพลาด
        sendSseNotificationWithRetry(updatedOrder, 3);

        return updatedOrder;
    }

    // ฟังก์ชันสำหรับส่งการแจ้งเตือน SSE พร้อม retry 3 ครั้งหากเกิดข้อผิดพลาด
    @Async
    public void sendSseNotificationWithRetry(MenuOrder_user updatedOrder, int retryCount) {
        if (updatedOrder.getTable() != null) {
            CopyOnWriteArrayList<SseEmitter> sseEmitters = emitters.get(updatedOrder.getTable().getTableId());
            if (sseEmitters != null) {
                for (SseEmitter emitter : sseEmitters) {
                    boolean success = false;
                    int attempt = 0;
                    while (!success && attempt < retryCount) {
                        try {
                            emitter.send(SseEmitter.event().name("statusUpdate").data(updatedOrder)); // ส่งข้อมูลผ่าน
                                                                                                      // SSE
                            success = true; // ส่งสำเร็จ
                        } catch (IOException | IllegalStateException e) {
                            attempt++;
                            if (attempt < retryCount) {
                                try {
                                    // หน่วงเวลา 3 วินาทีก่อน retry
                                    Thread.sleep(1000);
                                } catch (InterruptedException ie) {
                                    Thread.currentThread().interrupt(); // คืนสถานะ interrupted
                                }
                            } else {
                                emitter.completeWithError(e); // ปิดการเชื่อมต่อเมื่อ retry ครบแล้ว
                                sseEmitters.remove(emitter); // ลบ emitter ที่มีปัญหาออกจากรายการ
                            }
                        }
                    }
                }
            }
        }
    }

    // ฟังก์ชันสำหรับสร้างการเชื่อมต่อ SSE
    public void streamBasketsByTableId(String tableId, SseEmitter emitter) {
        // ใช้ CopyOnWriteArrayList สำหรับเก็บ SseEmitters
        emitters.computeIfAbsent(tableId, key -> new CopyOnWriteArrayList<>()).add(emitter);

        // จัดการเมื่อ connection เสร็จสิ้น
        emitter.onCompletion(() -> {
            CopyOnWriteArrayList<SseEmitter> sseEmitters = emitters.get(tableId);
            if (sseEmitters != null) {
                sseEmitters.remove(emitter);
            }
        });

        // จัดการเมื่อ connection หมดเวลา
        emitter.onTimeout(() -> {
            System.out.println("SSE connection timed out for tableId: " + tableId);
            CopyOnWriteArrayList<SseEmitter> sseEmitters = emitters.get(tableId);
            if (sseEmitters != null) {
                sseEmitters.remove(emitter);
            }
            emitter.complete();
        });

        // จัดการเมื่อเกิดข้อผิดพลาด
        emitter.onError((ex) -> {
            System.err.println("SSE connection error for tableId: " + tableId + " - " + ex.getMessage());
            CopyOnWriteArrayList<SseEmitter> sseEmitters = emitters.get(tableId);
            if (sseEmitters != null) {
                sseEmitters.remove(emitter);
            }
            emitter.completeWithError(ex);
        });
    }
}
