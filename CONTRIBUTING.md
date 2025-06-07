# Contributing to DualTabPanel

DualTabPanel에 기여해주셔서 감사합니다! 🎉

## 📋 현재 상태

이 프로젝트는 **MVP 단계**로 활발히 개발 중입니다. 
현재는 **v1.0 릴리즈 준비**에 집중하고 있으며, 그 이후에 본격적인 외부 기여를 받을 예정입니다.

## 🚀 v1.0 이전 (현재)

현재는 다음 작업들에 집중하고 있습니다:
- 코어 기능 안정화
- 에러 처리 개선
- 테스트 코드 작성
- 문서화 완성

## 🤝 v1.0 이후 기여 방법

v1.0 릴리즈 이후에는 다음과 같은 방식으로 기여할 수 있습니다:

### 1. 이슈 리포팅
- 버그 발견 시 [Bug Report 템플릿](.github/ISSUE_TEMPLATE/bug_report.md) 사용
- 새 기능 제안 시 [Feature Request 템플릿](.github/ISSUE_TEMPLATE/feature_request.md) 사용

### 2. 개발 환경 설정
```bash
# 저장소 포크 후 클론
git clone https://github.com/YOUR_USERNAME/react-dualtab-panel.git
cd react-dualtab-panel

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 3. 개발 프로세스 (GitHub Flow)
1. **feature 브랜치 생성**: `git checkout -b feature/your-feature-name`
2. **개발 및 커밋**: 작은 단위로 의미 있는 커밋
3. **테스트**: `npm run lint && npm run type-check && npm run build`
4. **Push**: `git push origin feature/your-feature-name`
5. **Pull Request 생성**: [PR 템플릿](.github/pull_request_template.md) 사용

### 4. 코딩 가이드라인
- **TypeScript**: 모든 코드는 TypeScript로 작성
- **ESLint**: `npm run lint`로 코드 스타일 검사
- **Naming**: camelCase (변수), PascalCase (컴포넌트)
- **Commit**: [Conventional Commits](https://www.conventionalcommits.org/) 형식

### 5. 기여 영역
- 🐛 **버그 수정**
- ✨ **새 기능 개발**
- 📚 **문서화 개선**
- 🧪 **테스트 코드 추가**
- 🎨 **UI/UX 개선**

## 📞 연락처

현재 질문이나 제안사항이 있으시면:
- [GitHub Issues](https://github.com/EunHyeokJung/react-dualtab-panel/issues)를 통해 문의
- 이메일: silverhyeok.dev@gmail.com

## 📜 라이센스

이 프로젝트에 기여하면 [MIT License](LICENSE) 하에 기여 내용이 라이센스됩니다.

---

**🎯 목표: 개발자들이 사랑하는 듀얼 패널 라이브러리 만들기!** 