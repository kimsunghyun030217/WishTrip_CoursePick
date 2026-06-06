package com.coursepick.user;

import com.coursepick.user.dto.LoginRequest;
import com.coursepick.user.dto.SignupRequest; //회원가입 요청 DTO 가져오기
import lombok.RequiredArgsConstructor; //final 필드 생성자 자동 생성
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; //API관련 어노테이션 사용

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        userService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        userService.login(request);
        return ResponseEntity.ok("로그인 성공");
    }

}