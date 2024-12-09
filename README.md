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