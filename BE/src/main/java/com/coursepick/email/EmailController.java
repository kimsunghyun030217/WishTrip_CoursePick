package com.coursepick.email;

import com.coursepick.email.dto.EmailCodeRequest;
import com.coursepick.email.dto.EmailVerifyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send-code")
    public ResponseEntity<String> sendCode(@RequestBody EmailCodeRequest request) {
        emailService.sendCode(request.getEmail());
        return ResponseEntity.ok("인증번호 발송 완료");
    }

    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@RequestBody EmailVerifyRequest request) {
        boolean result = emailService.verifyCode(
                request.getEmail(),
                request.getCode()
        );

        if (!result) {
            return ResponseEntity.badRequest().body("인증번호가 올바르지 않습니다.");
        }

        return ResponseEntity.ok("이메일 인증 성공");
    }
}