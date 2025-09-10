package com.school.results.mapper;

import com.school.examination.ResultEntity;
import com.school.results.dto.ResultDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ResultMapper {
    ResultDTO toDTO(ResultEntity entity);
    ResultEntity toEntity(ResultDTO dto);
    
    @Mapping(target = "id", ignore = true)
    void updateEntityFromDTO(ResultDTO dto, @MappingTarget ResultEntity entity);
    
    List<ResultDTO> toDTOList(List<ResultEntity> entities);
}
