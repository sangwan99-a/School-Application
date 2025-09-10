package com.school.certificates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    // CRUD operations for certificates


    @PostMapping
    public ResponseEntity<CertificateEntity> addCertificate(@RequestBody CertificateEntity certificateEntity) {
        return ResponseEntity.ok(certificateService.addCertificate(certificateEntity));
    }


    @GetMapping
    public ResponseEntity<List<CertificateEntity>> getAllCertificates() {
        return ResponseEntity.ok(certificateService.getAllCertificates());
    }


    @GetMapping("/{id}")
    public ResponseEntity<CertificateEntity> getCertificateById(@PathVariable Long id) {
        return ResponseEntity.ok(certificateService.getCertificateById(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<CertificateEntity> updateCertificate(@PathVariable Long id, @RequestBody CertificateEntity certificateEntity) {
        return ResponseEntity.ok(certificateService.updateCertificate(id, certificateEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        certificateService.deleteCertificate(id);
        return ResponseEntity.noContent().build();
    }

    // API to generate certificate data in PDF format
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generateCertificatePDF(@PathVariable Long id) {
        byte[] pdfData = certificateService.generateCertificatePDF(id);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=certificate.pdf")
                .body(pdfData);
    }
}
