package com.school.results.mapper;

import com.school.examination.ResultEntity;
import com.school.results.dto.ResultDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-17T20:56:16+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class ResultMapperImpl implements ResultMapper {

    @Override
    public ResultDTO toDTO(ResultEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ResultDTO resultDTO = new ResultDTO();

        resultDTO.setId( entity.getId() );
        resultDTO.setMarksObtained( entity.getMarksObtained() );
        resultDTO.setGrade( entity.getGrade() );
        resultDTO.setRemarks( entity.getRemarks() );

        return resultDTO;
    }

    @Override
    public ResultEntity toEntity(ResultDTO dto) {
        if ( dto == null ) {
            return null;
        }

        ResultEntity resultEntity = new ResultEntity();

        resultEntity.setId( dto.getId() );
        resultEntity.setMarksObtained( dto.getMarksObtained() );
        resultEntity.setGrade( dto.getGrade() );
        resultEntity.setRemarks( dto.getRemarks() );

        return resultEntity;
    }

    @Override
    public void updateEntityFromDTO(ResultDTO dto, ResultEntity entity) {
        if ( dto == null ) {
            return;
        }

        entity.setMarksObtained( dto.getMarksObtained() );
        entity.setGrade( dto.getGrade() );
        entity.setRemarks( dto.getRemarks() );
    }

    @Override
    public List<ResultDTO> toDTOList(List<ResultEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<ResultDTO> list = new ArrayList<ResultDTO>( entities.size() );
        for ( ResultEntity resultEntity : entities ) {
            list.add( toDTO( resultEntity ) );
        }

        return list;
    }
}
