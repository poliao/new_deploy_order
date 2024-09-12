package com.example.demo.service.token;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // สร้างคีย์สำหรับ HS256

    // สกัด username จาก token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // สกัดวันหมดอายุจาก token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // สกัดข้อมูลจาก token โดยใช้ claimsResolver
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // สกัดข้อมูลทั้งหมดจาก token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ตรวจสอบว่า token หมดอายุหรือไม่
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // สร้าง token โดยใช้ข้อมูลผู้ใช้
    public String generateToken(String username, String firstName, String lastName, String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("firstName", firstName);
        claims.put("lastName", lastName);
        claims.put("email", email);
        claims.put("role", role);
        return createToken(claims, username);
    }

    // สร้าง token จริงๆ พร้อมกำหนดข้อมูล claims
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 ชั่วโมง
                .signWith(key)
                .compact();
    }

    // ตรวจสอบว่า token นั้น valid หรือไม่
    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }
}