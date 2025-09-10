package com.school.canteen;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CanteenService {
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Item> getItemsByCategory(Long categoryId) {
        return itemRepository.findAll().stream()
            .filter(item -> item.getCategory().getId().equals(categoryId))
            .toList();
    }

    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
}
