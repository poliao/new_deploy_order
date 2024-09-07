package com.example.demo.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.user.Basket_user;
import com.example.demo.entity.user.MenuOrder_user;
import com.example.demo.service.user.BasketUserService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/baskets")
public class BasketUserController {

    @Autowired
    private BasketUserService basketUserService;

    @GetMapping
    public List<Basket_user> getAllBaskets() {
        return basketUserService.getAllBaskets();
    }

    @GetMapping("/baskets")
    public Page<Basket_user> getBaskets(@RequestParam(name = "page", required = false, defaultValue = "0") int page) {
        return basketUserService.getBasketsWithPagination(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Basket_user> getBasketById(@PathVariable("id") Long id) {
        Optional<Basket_user> basket = basketUserService.getBasketById(id);
        return basket.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Basket_user createBasket(@RequestBody Basket_user basket) {
        return basketUserService.createBasket(basket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Basket_user> updateBasket(@PathVariable("id") Long id,
            @RequestBody Basket_user basketDetails) {
        Optional<Basket_user> updatedBasket = basketUserService.updateBasket(id, basketDetails);
        return updatedBasket.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBasket(@PathVariable("id") Long id) {
        boolean isDeleted = basketUserService.deleteBasket(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public Page<MenuOrder_user> getMenuOrdersPaginated(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page) {
        return basketUserService.getMenuOrdersPaginated(page);
    }
}
