//// 한국관광공사 TourAPI에 HTTP 요청을 보내고 응답 데이터를 받아오는 클래스

package com.coursepick.tour;

import com.coursepick.global.config.TourApiProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class TourApiClient {

    private final TourApiProperties properties;
    private final RestTemplate restTemplate = new RestTemplate();

    public String getAreas() {
        String url = properties.getBaseUrl()
                + "/areaCode2"
                + "?serviceKey=" + properties.getServiceKey()
                + "&MobileOS=ETC"
                + "&MobileApp=CoursePick"
                + "&_type=json"
                + "&numOfRows=20"
                + "&pageNo=1";

        return restTemplate.getForObject(url, String.class);
    }

    // 선택한 시/도 안의 시군구 목록을 조회
    public String getSigungu(String areaCode) {
        String url = properties.getBaseUrl()
                + "/areaCode2"
                + "?serviceKey=" + properties.getServiceKey()
                + "&MobileOS=ETC"
                + "&MobileApp=CoursePick"
                + "&_type=json"
                + "&areaCode=" + areaCode
                + "&numOfRows=100"
                + "&pageNo=1";

        return restTemplate.getForObject(url, String.class);
    }

    // 선택한 지역/시군구의 관광지 목록 조회
    public String getPlaces(String areaCode, String sigunguCode) {
        String url = properties.getBaseUrl()
                + "/areaBasedList2"
                + "?serviceKey=" + properties.getServiceKey()
                + "&MobileOS=ETC"
                + "&MobileApp=CoursePick"
                + "&_type=json"
                + "&areaCode=" + areaCode
                + "&sigunguCode=" + sigunguCode
                + "&contentTypeId=12"
                + "&arrange=P"
                + "&numOfRows=100"
                + "&pageNo=1";

        return restTemplate.getForObject(url, String.class);
    }

    // 관광지 상세정보 조회
    public String getPlaceDetail(String contentId) {
        String url = properties.getBaseUrl()
                + "/detailCommon2"
                + "?serviceKey=" + properties.getServiceKey()
                + "&MobileOS=ETC"
                + "&MobileApp=CoursePick"
                + "&_type=json"
                + "&contentId=" + contentId;

        return restTemplate.getForObject(url, String.class);
    }

    // 관광지 이미지 목록 조회
    public String getPlaceImages(String contentId) {
        String url = properties.getBaseUrl()
                + "/detailImage2"
                + "?serviceKey=" + properties.getServiceKey()
                + "&MobileOS=ETC"
                + "&MobileApp=CoursePick"
                + "&_type=json"
                + "&contentId=" + contentId
                + "&imageYN=Y"
                + "&numOfRows=10"
                + "&pageNo=1";

        return restTemplate.getForObject(url, String.class);
    }
}