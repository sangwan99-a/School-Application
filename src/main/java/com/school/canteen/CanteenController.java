package com.school.canteen;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/canteen")
@RequiredArgsConstructor
public class CanteenController {
    private final CanteenService canteenService;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return canteenService.getAllCategories();
    }

    @GetMapping("/items/{categoryId}")
    public List<Item> getItemsByCategory(@PathVariable Long categoryId) {
        return canteenService.getItemsByCategory(categoryId);
    }

    @PostMapping("/item")
    public Item addItem(@RequestBody Item item) {
        return canteenService.saveItem(item);
    }

    @PostMapping("/category")
    public Category addCategory(@RequestBody Category category) {
        return canteenService.saveCategory(category);
    }
}
