package com.example.demo.modelDTO.admin;

import java.util.List;

import lombok.Data;
@Data
public class menuitemDTO {
    private String namemenu;
    private String img;
    private Long pric;
    private List<optionmenuDTO> optionsmenu;

}
