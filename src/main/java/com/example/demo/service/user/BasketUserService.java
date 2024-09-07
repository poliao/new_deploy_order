package com.example.demo.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.entity.user.Basket_user;
import com.example.demo.entity.user.MenuOrder_user;
import com.example.demo.repository.user.BasketUserRepository;
import com.example.demo.repository.user.MenuOrderUserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BasketUserService {

    @Autowired
    private BasketUserRepository basketUserRepository;
    @Autowired
    private MenuOrderUserRepository menuOrderUserRepository;

    public List<Basket_user> getAllBaskets() {
        return basketUserRepository.findAll();
    }

    public Page<MenuOrder_user> getMenuOrdersPaginated(int page) {
        Pageable pageable = PageRequest.of(page, 5); // หน้าที่ต้องการ (page) และขนาดต่อหน้า (5)
        return menuOrderUserRepository.findAll(pageable);
    }

    public Optional<Basket_user> getBasketById(Long id) {
        return basketUserRepository.findById(id);
    }

     public Page<Basket_user> getBasketsWithPagination(int page) {
        Pageable pageable = PageRequest.of(page, 5); // page คือหน้า, 5 คือจำนวนต่อหน้า
        return basketUserRepository.findAll(pageable);
    }

    public Basket_user createBasket(Basket_user basket) {
        return basketUserRepository.save(basket);
    }

    public Optional<Basket_user> updateBasket(Long id, Basket_user basketDetails) {
        Optional<Basket_user> basketOptional = basketUserRepository.findById(id);
        if (basketOptional.isPresent()) {
            Basket_user basket = basketOptional.get();
            basket.setTable(basketDetails.getTable());
            basket.setMenuOrders(basketDetails.getMenuOrders());
            return Optional.of(basketUserRepository.save(basket));
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteBasket(Long id) {
        if (basketUserRepository.existsById(id)) {
            basketUserRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
