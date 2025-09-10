package com.school.certificates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    // CRUD operations

    public CertificateEntity addCertificate(CertificateEntity certificateEntity) {
        return certificateRepository.save(certificateEntity);
    }


    public List<CertificateEntity> getAllCertificates() {
        return certificateRepository.findAll();
    }


    public CertificateEntity getCertificateById(Long id) {
        return certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
    }


    public CertificateEntity updateCertificate(Long id, CertificateEntity certificateDetails) {
        CertificateEntity certificateEntity = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
        certificateEntity.setStudentId(certificateDetails.getStudentId());
        certificateEntity.setCertificateType(certificateDetails.getCertificateType());
        certificateEntity.setIssueDate(certificateDetails.getIssueDate());
        certificateEntity.setDescription(certificateDetails.getDescription());
        certificateEntity.setDigitalSignature(certificateDetails.getDigitalSignature());
        return certificateRepository.save(certificateEntity);
    }

    public void deleteCertificate(Long id) {
        certificateRepository.deleteById(id);
    }

    // Generate certificate data in PDF format
    public byte[] generateCertificatePDF(Long id) {
        CertificateEntity certificateEntity = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        // Logic to generate PDF (e.g., using iText or Apache PDFBox)
        return new byte[0]; // Placeholder for PDF data
    }
}
