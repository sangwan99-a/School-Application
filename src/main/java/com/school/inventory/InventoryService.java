package com.school.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private AssetRepository assetRepository;

    // CRUD operations for school assets
    public AssetEntity addAsset(AssetEntity assetEntity) {
        return assetRepository.save(assetEntity);
    }

    public List<AssetEntity> getAllAssets() {
        return assetRepository.findAll();
    }

    public AssetEntity getAssetById(Long id) {
        return assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
    }

    public AssetEntity updateAsset(Long id, AssetEntity assetEntity) {
        AssetEntity existingAsset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
        existingAsset.setName(assetEntity.getName());
        existingAsset.setCategory(assetEntity.getCategory());
        existingAsset.setQuantity(assetEntity.getQuantity());
        existingAsset.setPurchaseDate(assetEntity.getPurchaseDate());
        existingAsset.setStatus(assetEntity.getStatus());
        return assetRepository.save(existingAsset);
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }

    // Fetch damaged assets
    public List<AssetEntity> getDamagedAssets() {
        return assetRepository.findByStatus("Damaged");
    }
}
