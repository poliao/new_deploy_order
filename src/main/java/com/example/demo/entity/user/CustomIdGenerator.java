package com.example.demo.entity.user;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.util.UUID;

public class CustomIdGenerator implements IdentifierGenerator {
    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        // ตัวอย่างการสร้าง ID แบบ custom ด้วย UUID
        return UUID.randomUUID().toString();
    }
}
