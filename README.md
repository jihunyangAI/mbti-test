# MBTI성향 테스트

12가지 일상 질문으로 알아보는 1030 취향저격 MBTI성향 테스트입니다.

## 🌐 배포 주소

**https://jihunyangai.github.io/mbti-test/**

`main` 브랜치에 푸시하면 GitHub Actions가 자동으로 빌드해 GitHub Pages에 배포합니다.

## ✨ 주요 기능

- **성향 테스트**: 12개의 일상 질문에 답하면 MBTI 유형을 알려줍니다. 답을 고르면 다음 질문으로 자동으로 넘어갑니다.
- **결과 카드 저장**: 결과 카드를 PNG 이미지로 저장할 수 있습니다.
- **친구 공유**: 결과를 텍스트로 복사해 카카오톡 등에 붙여넣을 수 있습니다. `?mbti=ENFP`처럼 주소 뒤에 유형을 붙이면 해당 결과 화면이 바로 열립니다.

## 🛠 기술 스택

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Motion (애니메이션), html-to-image (이미지 저장)

## 🚀 로컬에서 실행하기

**필요한 것:** Node.js 또는 [Bun](https://bun.sh)

```bash
# 의존성 설치
bun install
# 또는 npm install --legacy-peer-deps

# 개발 서버 실행 (http://localhost:3000)
bun run dev

# 프로덕션 빌드 (dist/ 폴더에 생성)
bun run build
```

## 📁 폴더 구조

```
src/
├── App.tsx           # 시작 화면, 테스트 진행, 결과 카드
├── components/       # 화면 컴포넌트 (도감·궁합·기록 화면은 아직 App에 연결되지 않음)
├── data/             # 질문과 유형 데이터
├── types/            # 타입 정의
└── utils/            # MBTI 계산, 저장소 유틸
```
