package com.coursepick.email;

import com.coursepick.user.UserRepository;
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
    private final UserRepository userRepository;

    // 인증번호 발송
    public void sendCode(String email) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }

        String code = createCode();

        redisTemplate.opsForValue()
                .set("email:signup:code:" + email, code, 5, TimeUnit.MINUTES);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[CoursePick] 이메일 인증번호");
        message.setText("인증번호는 " + code + " 입니다.\n5분 이내에 입력해주세요.");

        mailSender.send(message);
    }

    // 인증번호 검증
    public boolean verifyCode(String email, String code) {
        String savedCode = redisTemplate.opsForValue()
                .get("email:signup:code:" + email);

        if (savedCode == null) {
            return false;
        }

        if (!savedCode.equals(code)) {
            return false;
        }

        redisTemplate.opsForValue()
                .set("email:signup:verified:" + email, "true", 5, TimeUnit.MINUTES);

        redisTemplate.delete("email:signup:code:" + email);

        return true;
    }

    public boolean isSignupVerified(String email) {
        String verified = redisTemplate.opsForValue()
                .get("email:signup:verified:" + email);

        return "true".equals(verified);
    }

    public boolean isPasswordResetVerified(String email) {
        String verified = redisTemplate.opsForValue()
                .get("email:password-reset:verified:" + email);

        return "true".equals(verified);
    }

    // 6자리 인증번호 생성
    private String createCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }

    //비밀번호 재설정
    public void sendPasswordResetCode(String email) {

        if (!userRepository.existsByEmail(email)) {
            throw new RuntimeException("가입되지 않은 이메일입니다.");
        }

        String code = createCode();

        redisTemplate.opsForValue()
            .set("email:password-reset:code:" + email, code, 5, TimeUnit.MINUTES);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[CoursePick] 비밀번호 재설정 인증번호");
        message.setText("인증번호는 " + code + " 입니다.\n5분 이내에 입력해주세요.");

        mailSender.send(message);
    }

    public boolean verifyPasswordResetCode(String email, String code) {

        String savedCode = redisTemplate.opsForValue()
                .get("email:password-reset:code:" + email);

        if (savedCode == null) {
            return false;
        }

        if (!savedCode.equals(code)) {
            return false;
        }

        redisTemplate.opsForValue()
                .set("email:password-reset:verified:" + email,
                        "true", 5, TimeUnit.MINUTES);

        redisTemplate.delete("email:password-reset:code:" + email);

        return true;
    }
}