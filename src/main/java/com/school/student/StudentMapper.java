package com.school.student;

import org.mapstruct.*;
import com.school.dto.StudentDTO;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudentMapper {

    @Mapping(target = "classId", source = "studentClass.id")
    @Mapping(target = "className", source = "studentClass.name")
    @Mapping(target = "profilePhoto", source = "profilePhoto")
    @Mapping(target = "profilePhotoName", source = "profilePhotoName")
    StudentDTO toDTO(Student student);

    @Mapping(target = "studentClass.id", source = "classId")
    @Mapping(target = "studentClass.name", source = "className")
    @Mapping(target = "studentClass", ignore = true)
    @Mapping(target = "profilePhoto", source = "profilePhoto")
    @Mapping(target = "profilePhotoName", source = "profilePhotoName")
    Student toEntity(StudentDTO studentDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "studentClass.id", source = "classId")
    @Mapping(target = "studentClass.name", source = "className")
    @Mapping(target = "studentClass", ignore = true)
    @Mapping(target = "profilePhoto", source = "profilePhoto")
    @Mapping(target = "profilePhotoName", source = "profilePhotoName")
    void updateStudentFromDTO(StudentDTO studentDTO, @MappingTarget Student student);
}


