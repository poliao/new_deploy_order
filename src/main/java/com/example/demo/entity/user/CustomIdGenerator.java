package com.example.demo.entity.user;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.security.SecureRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class CustomIdGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        // สร้างตัวเลขสุ่ม 20 ตัว
        return IntStream.range(0, 20)
                .mapToObj(i -> String.valueOf(new SecureRandom().nextInt(10))) // สุ่มเลข 0-9
                .collect(Collectors.joining());
    }
}