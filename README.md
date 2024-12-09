# 시작

### 환경 설정
```angular2html
node.js v18.20.5 (LTS)
react 18
react-router-dom
axios
```

### 추천 프로젝트 구조
```angular2html
src/
├── components/                # 재사용 가능한 컴포넌트
│   ├── Header/                # 헤더 컴포넌트 (상단바)
│   │   ├── Header.js
│   │   ├── Header.module.css
│   │   └── SearchBar.js       # 헤더 내 검색창 컴포넌트
│   │
│   ├── Sidebar/               # 사이드바 컴포넌트
│   │   ├── Sidebar.js
│   │   ├── Sidebar.module.css
│   │   └── SidebarItem.js     # 사이드바 메뉴 항목 컴포넌트
│   │
│   ├── VideoCard/             # 동영상 카드 컴포넌트
│   │   ├── VideoCard.js
│   │   ├── VideoCard.module.css
│   │   └── Thumbnail.js      # 썸네일 하위 컴포넌트
│   │
│   └── Footer/                # 하단바 (선택 사항)
│       ├── Footer.js
│       └── Footer.module.css
│
├── pages/                     # 페이지 단위 컴포넌트
│   ├── Home/                  # 홈 페이지
│   │   ├── Home.js
│   │   └── Home.module.css
│   │
│   ├── VideoDetail/           # 동영상 상세 페이지
│   │   ├── VideoDetail.js
│   │   └── VideoDetail.module.css
│   │
│   ├── SearchResults/         # 검색 결과 페이지
│   │   ├── SearchResults.js
│   │   └── SearchResults.module.css
│   │
│   └── NotFound/              # 404 페이지
│       ├── NotFound.js
│       └── NotFound.module.css
│
├── hooks/                     # 사용자 정의 훅
│   ├── useFetchVideos.js      # 비디오 데이터 fetch 훅
│   └── useWindowSize.js       # 반응형 디자인용 훅
│
├── styles/                    # 전역 스타일
│   ├── variables.module.css   # 공통 CSS 변수
│   ├── mixins.module.css      # 공통 믹스인
│   └── global.css             # 전체 애플리케이션 전역 스타일
│
├── App.js                     # React Router 설정
├── App.module.css             # App 컴포넌트 스타일
├── index.js                   # ReactDOM 진입점
└── api/                       # API 요청 모듈
    ├── youtubeApi.js          # YouTube API 관련 함수
    └── mockData.js            # 개발용 Mock 데이터
```

### 프로젝트 설치 

```angular2html
// package.json 설치
npm install
```

### 역할 분담
- 송강
- 회의 내용과 코드 리뷰 내용
![img.png](https://private-user-images.githubusercontent.com/62008619/393841053-7b6fab69-8054-4beb-90fd-68b50801b29d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3NTUzNTEsIm5iZiI6MTczMzc1NTA1MSwicGF0aCI6Ii82MjAwODYxOS8zOTM4NDEwNTMtN2I2ZmFiNjktODA1NC00YmViLTkwZmQtNjhiNTA4MDFiMjlkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjA5VDE0MzczMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU5NDRiOWFmZTgyNzU5Y2YxMWM2OWZlZmJlODU4Y2NkMTI5YzcwMDI4ZGJjZTJmODc0NWUyYThhN2QwMjlmZTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.gEUIfCKWynNL2oGd6kLQphGeFJXW23qI1AlgzglJuL0)
- 장원영
- README.md 수정하기
  ![img.png](https://private-user-images.githubusercontent.com/62008619/393841095-6feb5b22-8b35-4b51-92d1-c458c6284bd0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3NTUzNTEsIm5iZiI6MTczMzc1NTA1MSwicGF0aCI6Ii82MjAwODYxOS8zOTM4NDEwOTUtNmZlYjViMjItOGIzNS00YjUxLTkyZDEtYzQ1OGM2Mjg0YmQwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjA5VDE0MzczMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZiMWMyZTc2OGZjNGJlODIwM2IxMDM1NjAzZDc1MjczZWZiYjVjMDcyMmRmNTM5M2I2YjJkZDNmYzczZDQ1YjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.4BIRQUCKG5AyXSKKCM3FqNFICo8Hmlj814RTqTenMbY)
- 카리나
- 계획서와 디자인 시안
![img.png](https://private-user-images.githubusercontent.com/62008619/393841130-a0de2d70-281b-4185-b1f0-7ae73dc387ca.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3NTUzNTEsIm5iZiI6MTczMzc1NTA1MSwicGF0aCI6Ii82MjAwODYxOS8zOTM4NDExMzAtYTBkZTJkNzAtMjgxYi00MTg1LWIxZjAtN2FlNzNkYzM4N2NhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjA5VDE0MzczMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZkNjNlYTkwNGM2NGUxODJjMWMyYmU1YmJkNmNiMzYzYmVjY2Y3YWI4ZmJiYjZjM2VmNWU0OGViMWFkZGY0ZDgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GhuE1TpwE0p9EoCbUklpY3OUlkkqku25JIg2Cw6n8dQ)
- 안유진
- PM ← 어디까지 했냐, 왜 안했냐, 잘했냐
![img.png](https://private-user-images.githubusercontent.com/62008619/393841159-0b1f3e88-5227-4523-a5fe-c88f871e8bca.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3NTUzNTEsIm5iZiI6MTczMzc1NTA1MSwicGF0aCI6Ii82MjAwODYxOS8zOTM4NDExNTktMGIxZjNlODgtNTIyNy00NTIzLWE1ZmUtYzg4Zjg3MWU4YmNhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjA5VDE0MzczMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNkOTA5Y2FmNTg2YWQ5YzRiZDYyNTBlMDY0NTk5OTJhNzIyNmU3YzViYTZkMzFhZjhlOWUzNzFmZGQ0Njk1YzImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.TaGtC8hTj0aWm0kLLACHJeuEFbKlGffMJ8i76JMv_0o)
- 한소희
- 트러블 슈팅 (버그 → issue page 등록 → 정리 → 해결방법)
![img.png](https://private-user-images.githubusercontent.com/62008619/393841235-2308a91a-8de1-4c9d-917c-6b97ed08a31a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3NTUzNTEsIm5iZiI6MTczMzc1NTA1MSwicGF0aCI6Ii82MjAwODYxOS8zOTM4NDEyMzUtMjMwOGE5MWEtOGRlMS00YzlkLTkxN2MtNmI5N2VkMDhhMzFhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjA5VDE0MzczMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA1NDU5M2E4OGQxODBlYjNhOTM5OGQwZTkwNDc5NWYyZWFiOGU3MmY1Mjg0Y2UwYjliNzVmY2NhNTc4ZDBiMzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.LTUZcRoJXyKoEGYVmf2Knf0MxEJjbLbItp2vj4ebwoM)
- 차은우
- 프로젝트 회고 및 문서화 ( 1~5 ) 다 되면 정리
![img.png](https://private-user-images.githubusercontent.com/62008619/393841254-a0cb3601-e645-4bd1-a7c4-a1da80c4d321.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3NTUzNTEsIm5iZiI6MTczMzc1NTA1MSwicGF0aCI6Ii82MjAwODYxOS8zOTM4NDEyNTQtYTBjYjM2MDEtZTY0NS00YmQxLWE3YzQtYTFkYTgwYzRkMzIxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjA5VDE0MzczMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI5ZWU4ZDAxZGRkYWMwOTYxOTBjNTgxMTViM2FiZTEyM2JmNTQ2MmYzNzVkZmRiZjlkMWY5YzIzMzczMjIwNDAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.v2VaMGQtENP9sst2OkQCivWOiqBsrQTxYh1LvaY3oqA)

### 깃 커밋 규칙
[깃모지 이용 참고 링크](https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-Gitmoji-%EC%82%AC%EC%9A%A9%EB%B2%95-Gitmoji-cli)

### 전체 일정
> 12.10 00:00 프로젝트 베이스 만들기
> 12.10 12:00 개발 시작
> 12.11 ~ 12.14 개발 종료
> 12.14 ~ 12.15 테스트 및 버그 수정 / 디버깅
> 12.15 : 문서작성
> 12.16 10:00 : 퍼실리데이터 면담