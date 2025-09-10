package com.school.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // CRUD operations for school assets

    @PostMapping("/assets")
    public ResponseEntity<AssetEntity> addAsset(@RequestBody AssetEntity assetEntity) {
        return ResponseEntity.ok(inventoryService.addAsset(assetEntity));
    }

    @GetMapping("/assets")
    public ResponseEntity<List<AssetEntity>> getAllAssets() {
        return ResponseEntity.ok(inventoryService.getAllAssets());
    }

    @GetMapping("/assets/{id}")
    public ResponseEntity<AssetEntity> getAssetById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getAssetById(id));
    }

    @PutMapping("/assets/{id}")
    public ResponseEntity<AssetEntity> updateAsset(@PathVariable Long id, @RequestBody AssetEntity assetEntity) {
        return ResponseEntity.ok(inventoryService.updateAsset(id, assetEntity));
    }

    @DeleteMapping("/assets/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        inventoryService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }

    // Fetch damaged assets
    @GetMapping("/assets/damaged")
    public ResponseEntity<List<AssetEntity>> getDamagedAssets() {
        return ResponseEntity.ok(inventoryService.getDamagedAssets());
    }
}
