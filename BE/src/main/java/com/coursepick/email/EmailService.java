package com.coursepick.email;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final StringRedisTemplate redisTemplate;

    // 인증번호 발송
    public void sendCode(String email) {
        String code = createCode();

        redisTemplate.opsForValue()
                .set("email:code:" + email, code, 5, TimeUnit.MINUTES);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[CoursePick] 이메일 인증번호");
        message.setText("인증번호는 " + code + " 입니다.\n5분 이내에 입력해주세요.");

        mailSender.send(message);
    }

    // 인증번호 검증
    public boolean verifyCode(String email, String code) {
        String savedCode = redisTemplate.opsForValue()
                .get("email:code:" + email);

        if (savedCode == null) {
            return false;
        }

        if (!savedCode.equals(code)) {
            return false;
        }

        redisTemplate.opsForValue()
                .set("email:verified:" + email, "true", 5, TimeUnit.MINUTES);

        redisTemplate.delete("email:code:" + email);

        return true;
    }

    // 6자리 인증번호 생성
    private String createCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }
}