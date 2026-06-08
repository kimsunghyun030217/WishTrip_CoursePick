package com.coursepick.user;

import jakarta.persistence.*;  // JPA 기능 사용
import lombok.AllArgsConstructor; // User의 모든 필드를 한 번에 초기화하는 생성자 생성
import lombok.Builder; // 객체를 편하게 생성하기 위한 Builder 패턴
import lombok.Getter;
import lombok.NoArgsConstructor; // JPA가 사용할 기본 생성자 자동 생성

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;
    
    private String password;
    private String nickname;
    private String nationality;
    private String language;
    private LocalDate birthDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void changePassword(String password) {
        this.password = password;
    }
}