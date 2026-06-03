package com.coursepick.user.dto;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class SignupRequest {
    private String email;
    private String password;
    private String nickname;
    private String nationality;
    private String language;
    private LocalDate birthDate;
}