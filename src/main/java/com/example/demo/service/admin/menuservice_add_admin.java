package com.example.demo.service.admin;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.demo.entity.admin.menuitem;
import com.example.demo.entity.admin.optiondetail_admin;
import com.example.demo.entity.admin.optionmenu_admin;
import com.example.demo.repository.admin.menuitem_adminrepository;

import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Async;


@Service
public class menuservice_add_admin {

    @Autowired
    private menuitem_adminrepository menuRepository;

    private final ConcurrentHashMap<Long, CopyOnWriteArrayList<SseEmitter>> emitters = new ConcurrentHashMap<>();

    @Transactional
    public String saveMenu(menuitem menuDTO) {
        menuitem menu = new menuitem();
        menu.setNamemenu(menuDTO.getNamemenu());
        menu.setImg(menuDTO.getImg());
        menu.setPrice(menuDTO.getPrice());
        menu.setTotal(menuDTO.getTotal());
        menu.setDetailmenu(menuDTO.getDetailmenu());
        menu.setTypemenu(menuDTO.getTypemenu());
        
        List<optionmenu_admin> optionMenus = menuDTO.getOptionsmenu().stream().map(optionmenuDTO -> {
            optionmenu_admin optionMenu = new optionmenu_admin();
            optionMenu.setOption_name(optionmenuDTO.getOption_name());
            optionMenu.setMenu(menu);

            List<optiondetail_admin> optionDetails = optionmenuDTO.getOptiondetail().stream().map(optiondetailDTO -> {
                optiondetail_admin optionDetail = new optiondetail_admin();
                optionDetail.setOptiondetails(optiondetailDTO.getOptiondetails());
                optionDetail.setOptionMenu(optionMenu);
                return optionDetail;
            }).collect(Collectors.toList());

            optionMenu.setOptiondetail(optionDetails);
            return optionMenu;
        }).collect(Collectors.toList());

        menu.setOptionsmenu(optionMenus);
        menuRepository.save(menu);

        return "สร้างเมนูสำเร็จ";
    }

    @Transactional
    public List<menuitem> getAllMenuItems() {
        return menuRepository.findAll();
    }

    @Transactional
    public Optional<menuitem> getMenuItemById(Long id) {
        return menuRepository.findById(id);
    }

    @Transactional
    public String updateMenu(Long id, menuitem menuDTO) {
        Optional<menuitem> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            menuitem menu = menuOpt.get();
            menu.setNamemenu(menuDTO.getNamemenu());
            menu.setImg(menuDTO.getImg());
            menu.setPrice(menuDTO.getPrice());
            menu.setTotal(menuDTO.getTotal());
            menu.setDetailmenu(menuDTO.getDetailmenu());
            menu.setTypemenu(menuDTO.getTypemenu());

            List<optionmenu_admin> existingOptions = menu.getOptionsmenu();
            List<optionmenu_admin> newOptions = menuDTO.getOptionsmenu();

            existingOptions.removeIf(option -> !newOptions.contains(option));

            for (optionmenu_admin newOption : newOptions) {
                if (!existingOptions.contains(newOption)) {
                    newOption.setMenu(menu);
                    existingOptions.add(newOption);
                } else {
                    optionmenu_admin existingOption = existingOptions.get(existingOptions.indexOf(newOption));
                    existingOption.setOption_name(newOption.getOption_name());

                    List<optiondetail_admin> existingDetails = existingOption.getOptiondetail();
                    List<optiondetail_admin> newDetails = newOption.getOptiondetail();

                    existingDetails.removeIf(detail -> !newDetails.contains(detail));

                    for (optiondetail_admin newDetail : newDetails) {
                        if (!existingDetails.contains(newDetail)) {
                            newDetail.setOptionMenu(existingOption);
                            existingDetails.add(newDetail);
                        } else {
                            optiondetail_admin existingDetail = existingDetails.get(existingDetails.indexOf(newDetail));
                            existingDetail.setOptiondetails(newDetail.getOptiondetails());
                        }
                    }
                }
            }

            menuRepository.save(menu);
            return "อัพเดตเมนูสำเร็จ";
        } else {
            return "ไม่พบเมนู";
        }
    }

    @Transactional
    public String deleteMenu(Long id) {
        Optional<menuitem> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            menuRepository.deleteById(id);
            return "ลบเมนูสำเร็จ";
        } else {
            return "ไม่พบเมนู";
        }
    }

    @Transactional
    public String updateTotalsum(String namemenu, Long newTotal) {
        menuitem menuItem = menuRepository.findByNamemenu(namemenu)
            .orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        Long remainingTotal = menuItem.getTotal() - newTotal;
        menuItem.setTotal(remainingTotal);
        menuRepository.save(menuItem);

        notifyClients(menuItem.getMenuId(), remainingTotal);
        return "Remaining total for " + namemenu + " is " + remainingTotal;
    }

    @Transactional
    public String updateTotal(String namemenu, Long newTotal) {
        menuitem menuItem = menuRepository.findByNamemenu(namemenu)
            .orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        Long remainingTotal = menuItem.getTotal() - newTotal;
        menuItem.setTotal(remainingTotal);
        menuRepository.save(menuItem);

        notifyClients(menuItem.getMenuId(), remainingTotal);
        return "Remaining total for " + namemenu + " is " + remainingTotal;
    }

    @Async
    public void notifyClients(Long menuId, Long remainingTotal) {
        CopyOnWriteArrayList<SseEmitter> emittersList = emitters.get(menuId);
        if (emittersList != null) {
            for (SseEmitter emitter : emittersList) {
                try {
                    emitter.send(SseEmitter.event().name("totalUpdate").data("Remaining total: " + remainingTotal));
                } catch (IOException e) {
                    emittersList.remove(emitter);
                }
            }
        }
    }

    public SseEmitter subscribe(Long menuId) {
        SseEmitter emitter = new SseEmitter(300000000L);
        emitters.computeIfAbsent(menuId, id -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> emitters.get(menuId).remove(emitter));
        emitter.onTimeout(() -> {
            emitters.get(menuId).remove(emitter);
            emitter.complete();
        });
        return emitter;
    }



    
}
