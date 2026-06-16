package com.coursepick.user;

import com.coursepick.email.EmailService;
import com.coursepick.user.dto.SignupRequest;
import com.coursepick.user.dto.LoginRequest;
import com.coursepick.user.dto.ResetPasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public void signup(SignupRequest request) {

        if (!emailService.isSignupVerified(request.getEmail())) {
            throw new RuntimeException("이메일 인증이 필요합니다.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .nickname(request.getNickname())
                .nationality(request.getNationality())
                .language(request.getLanguage())
                .birthDate(request.getBirthDate())
                .build();

        userRepository.save(user);
    }

    public void login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
    }

    public void resetPassword(ResetPasswordRequest request) {

        if (!emailService.isPasswordResetVerified(request.getEmail())) {
            throw new RuntimeException("비밀번호 재설정 인증이 필요합니다.");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 이메일입니다."));

        String encodedPassword =
                passwordEncoder.encode(request.getNewPassword());

        user.changePassword(encodedPassword);
        userRepository.save(user);
    }

    public boolean existsEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}