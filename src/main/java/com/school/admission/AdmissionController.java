package com.school.admission;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/api/admissions")
public class AdmissionController {
    private static final Logger logger = LoggerFactory.getLogger(AdmissionController.class);

    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    @GetMapping
    public List<AdmissionEntity> getAllAdmissions() {
        List<AdmissionEntity> admissions = admissionService.getAllAdmissions();
        logger.info("Fetched admissions: {}", admissions);
        return admissions;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<AdmissionEntity> createAdmission(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String dob,
            @RequestParam String gender,
            @RequestParam String classApplied,
            @RequestParam String address,
            @RequestParam String phone,
            @RequestParam String email,
            @RequestParam String parentName,
            @RequestParam String parentPhone,
            @RequestParam String parentEmail,
            @RequestParam String motherName,
            @RequestParam String nationality,
            @RequestParam String guardianName,
            @RequestParam String guardianRelationship,
            @RequestParam String guardianNumber,
            @RequestPart(required = false) org.springframework.web.multipart.MultipartFile marksheet,
            @RequestPart(required = false) org.springframework.web.multipart.MultipartFile aadhaar,
            @RequestPart(required = false) org.springframework.web.multipart.MultipartFile birthCertificate,
            @RequestPart(required = false) org.springframework.web.multipart.MultipartFile studentPhoto,
            @RequestPart(required = false) org.springframework.web.multipart.MultipartFile parentsId,
            @RequestPart(required = false) org.springframework.web.multipart.MultipartFile transferCertificate
    ) {
        AdmissionEntity admission = new AdmissionEntity();
        admission.setFirstName(firstName);
        admission.setLastName(lastName);
        admission.setDob(dob);
        admission.setGender(gender);
        admission.setClassApplied(classApplied);
        admission.setAddress(address);
        admission.setPhone(phone);
        admission.setEmail(email);
        admission.setParentName(parentName);
        admission.setParentPhone(parentPhone);
        admission.setParentEmail(parentEmail);
        admission.setMotherName(motherName);
        admission.setNationality(nationality);
        admission.setGuardianName(guardianName);
        admission.setGuardianRelationship(guardianRelationship);
        admission.setGuardianNumber(guardianNumber);
        try {
            if (marksheet != null) {
                admission.setMarksheet(marksheet.getBytes());
                admission.setMarksheetName(marksheet.getOriginalFilename());
            }
            if (aadhaar != null) {
                admission.setAadhaar(aadhaar.getBytes());
                admission.setAadhaarName(aadhaar.getOriginalFilename());
            }
            if (birthCertificate != null) {
                admission.setBirthCertificate(birthCertificate.getBytes());
                admission.setBirthCertificateName(birthCertificate.getOriginalFilename());
            }
            if (studentPhoto != null) {
                admission.setStudentPhoto(studentPhoto.getBytes());
                admission.setStudentPhotoName(studentPhoto.getOriginalFilename());
            }
            if (parentsId != null) {
                admission.setParentsId(parentsId.getBytes());
                admission.setParentsIdName(parentsId.getOriginalFilename());
            }
            if (transferCertificate != null) {
                admission.setTransferCertificate(transferCertificate.getBytes());
                admission.setTransferCertificateName(transferCertificate.getOriginalFilename());
            }
        } catch (Exception e) {
            logger.error("Error processing uploaded files: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        AdmissionEntity createdAdmission = admissionService.createAdmission(admission);
        logger.info("Created admission: {}", createdAdmission);
        return new ResponseEntity<>(createdAdmission, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdmissionEntity> getAdmissionById(@PathVariable Long id) {
        AdmissionEntity admission = admissionService.getAdmissionById(id);
        return ResponseEntity.ok(admission);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmission(@PathVariable Long id) {
        admissionService.deleteAdmission(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveAdmission(@PathVariable Long id, @RequestParam Long classId) {
        try {
            boolean success = admissionService.approveAdmission(id, classId);
            if (success) {
                return ResponseEntity.ok().build();
            } else {
                logger.error("Failed to approve admission for id {}: Service returned false", id);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to approve admission. See server logs for details.");
            }
        } catch (Exception e) {
            logger.error("Exception while approving admission for id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Exception: " + e.getMessage());
        }
    }
}
