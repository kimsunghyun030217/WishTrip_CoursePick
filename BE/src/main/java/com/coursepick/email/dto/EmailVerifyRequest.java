//Email 인증번호 검증용

package com.coursepick.email.dto;

import lombok.Getter;

@Getter
public class EmailVerifyRequest {
    private String email;
    private String code;

}