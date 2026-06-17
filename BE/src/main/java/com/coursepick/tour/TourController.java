package com.coursepick.tour;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
public class TourController {

    private final TourApiClient tourApiClient;

    // 지역 목록 조회 API
    @GetMapping("/api/tour/areas")
    public String getAreas() {
        return tourApiClient.getAreas();
    }
    //시군구 조회
    @GetMapping("/api/tour/areas/{areaCode}/sigungu")
    public String getSigungu(@PathVariable String areaCode) {
        return tourApiClient.getSigungu(areaCode);
    }
    //관광지 조회
    @GetMapping("/api/tour/places")
    public String getPlaces(
            @RequestParam String areaCode,
            @RequestParam String sigunguCode
    ) {
        return tourApiClient.getPlaces(areaCode, sigunguCode);
    }

    @GetMapping("/api/tour/places/{contentId}")
    public String getPlaceDetail(@PathVariable String contentId) {
        return tourApiClient.getPlaceDetail(contentId);
    }

    @GetMapping("/api/tour/places/{contentId}/images")
    public String getPlaceImages(@PathVariable String contentId) {
        return tourApiClient.getPlaceImages(contentId);
    }
}