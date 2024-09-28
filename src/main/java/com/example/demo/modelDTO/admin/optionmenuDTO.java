package com.example.demo.modelDTO.admin;

import java.util.List;

import lombok.Data;

@Data
public class optionmenuDTO {
    private String option_name;
    private List<optiondetailDTO> optiondetail;
}
