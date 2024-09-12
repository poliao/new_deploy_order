package com.example.demo.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.user.Table_user;
import com.example.demo.repository.user.TableUserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TableUserService {

    @Autowired
    private TableUserRepository tableUserRepository;

    public List<Table_user> getAllTables() {
        return tableUserRepository.findAll();
    }

    public Optional<Table_user> getTableById(Long id) {
        return tableUserRepository.findById(id);
    }

    public Table_user createTable(Table_user table) {
        return tableUserRepository.save(table);
    }

    public Optional<Table_user> updateTable(Long id, Table_user tableDetails) {
        Optional<Table_user> tableOptional = tableUserRepository.findById(id);
        if (tableOptional.isPresent()) {
            Table_user table = tableOptional.get();
            table.setTableName(tableDetails.getTableName());
            table.setStatus(tableDetails.getStatus());
            return Optional.of(tableUserRepository.save(table));
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteTable(Long id) {
        if (tableUserRepository.existsById(id)) {
            tableUserRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
