# DualTabPanel (MVP)

[![CI](https://github.com/EunHyeokJung/react-dualtab-panel/workflows/CI/badge.svg)](https://github.com/EunHyeokJung/react-dualtab-panel/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)

https://github.com/user-attachments/assets/f30fe585-bf6a-4d87-86e8-c7fd1474dc1e

> 🚧 **개발 중** - 이 프로젝트는 아직 개발 중이에요! 뚝딱뚝딱

독립적인 탭 시스템을 가진 듀얼 패널 인터페이스를 위한 React 컴포넌트에요. 관리자 대시보드, IDE 같은 분할 화면이 필요한 애플리케이션에 적합해요.


## 🧐 어쩌다 라이브러리까지 만들게 되었나..

### "내가 쓸려고 만든 UI 라이브러리"

사이드 프로젝트로 만들고 있던 서비스가 있는데, '대시보드'가 메인 기능이에요. 저는 노션을 자주 사용하기 때문에 Drawer 형식으로 좌우를 나눈 패널을 보는게 익숙해서 이 서비스에도 똑같이 듀얼 탭으로 된 패널을 넣고 싶었어요.

가능하면 외부 라이브러리를 사용하려고 했는데, 듀얼을 지원하면서 탭이 포함된 라이브러리가 아직 없더라구요. 그래서 직접 만들게 되었어요.

그리고 이걸 더 편하게(?) 쓰기 위해 모듈화를 하다보니 라이브러리로 만들면 다른 사람들도 쓸 수 있겠다 싶어서 좀 더 다듬어 배포하려고 해요.

## ✨ 현재 구현된 기능

### 🎯 핵심 기능
- **듀얼 독립 패널**: 각 패널은 독립적인 탭 시스템을 가져요
- **레이아웃 지원**: 수평/수직 분할 레이아웃 변경이 가능해요
- **크기 조절**: 패널 간 드래그로 크기 조절이 가능해요
- **반응형 디자인**: ResizeObserver를 활용한 실시간 레이아웃 최적화

### 🖱️ 드래그앤드롭 시스템
- **탭 순서 변경**: 같은 패널 내에서 드래그앤드롭으로 탭 순서 변경
- **패널 간 탭 이동**: 서로 다른 패널 간 탭 이동 지원
- **빈 패널 드롭 지원**: 모든 탭이 제거된 빈 패널에도 탭을 드롭할 수 있어요
- **시각적 피드백**: 드래그 중 드롭 가능한 영역과 호버 상태를 명확하게 표시
- **탭 공유 제어**: `allowTabSharing` 옵션으로 패널 간 탭 이동을 허용/차단
- **향상된 성능**: 즉시 반응하는 드롭존과 최적화된 드래그 감지 영역

### 📏 스마트 탭 관리
- **동적 탭 너비 계산**: 패널 너비에 따라 탭 크기가 자동으로 조정 (100px~200px)
- **자동 스크롤**: 탭이 많아지면 자동으로 가로 스크롤 활성화
- **마우스 휠 지원**: 탭 영역에서 마우스 휠로 부드러운 스크롤 가능
- **스크롤바 스타일링**: 6px 높이의 둥근 모서리 스크롤바
- **드래그 중 최적화**: 드래그 중에는 스크롤 계산을 건너뛰어 성능 향상

### 🎨 커스터마이징
- **CSS 클래스 기반**: 완전한 스타일 커스터마이징 지원
- **타입 안전**: TypeScript로 모든 Props와 상태가 타입 검증됨
- **접근성**: 키보드 접근성과 ARIA 레이블 지원

## 📋 향후 계획

### ✅ 최근 완료된 주요 개선사항
- ✅ **드래그 앤 드랍 시스템** - 기본 구현 및 성능 최적화 완료
- ✅ **빈 패널 드래그앤드롭** - 버그 수정 및 UX 개선 완료  
- ✅ **탭 공유 제어** - allowTabSharing 옵션 구현 완료
- ✅ **스마트 탭 스크롤** - 동적 너비 계산 및 마우스 휠 지원 완료
- ✅ **코드 품질 리팩토링** - Toss Frontend Fundamentals 원칙 적용 완료
- ✅ **아키텍처 최적화** - 복잡한 상태 전파 시스템 단순화 완료

### 🚀 앞으로 할 일
- 🔄 **테스트 코드 작성** - 유닛 테스트 및 통합 테스트 추가 예정
- 🔄 **성능 최적화** - 메모이제이션 및 리렌더링 최적화 계획
- 🔄 **접근성 강화** - 키보드 내비게이션 및 스크린 리더 지원 개선
- 📱 **모바일 지원** - 터치 디바이스에서의 드래그앤드롭 지원
- 🎨 **테마 시스템** - 커스터마이징이 가능한 style token 지원
- 🔗 **하이라키 모드** - 좌측이 부모, 우측이 자식 페이지 관계 모드
- 📦 **JavaScript 버전** - TypeScript 없이도 사용 가능한 JS 버전 제작
- 🚀 **최종 목표: npm 배포!**

> 자세한 내용은 Issue를 참조해주세요!

## 🛠 로컬 개발 및 테스트

```bash
# 프로젝트 클론
git clone https://github.com/EunHyeokJung/react-dualtab-panel.git
cd react-dualtab-panel

# 의존성 설치
npm install

# 개발 서버 실행 (데모 포함)
npm run dev

# 라이브러리 빌드
npm run build
```

## 🚀 기본 사용법

Ant Design의 상태 관리 패턴을 참고하여 직관적인 API로 설계했어요.

```tsx
import React, { useState } from 'react';
import { DualTabPanel } from 'react-dualtab-panel';
import type { Panel } from 'react-dualtab-panel/types';

function App() {
  const [panels, setPanels] = useState<[Panel, Panel]>([
    {
      id: 'left',
      tabs: [
        { 
          id: 'tab1', 
          title: 'Dashboard', 
          content: <div>Awesome Dashboard Content</div> 
        },
        { 
          id: 'tab2', 
          title: 'Analytics', 
          content: <div>Cool Analytics Page</div> 
        }
      ],
      activeTabId: 'tab1'
    },
    {
      id: 'right',
      tabs: [
        { 
          id: 'tab3', 
          title: 'Settings', 
          content: <div>Awesome Settings Page</div> 
        }
      ],
      activeTabId: 'tab3'
    }
  ]);

  return (
    <div style={{ height: '100vh' }}>
      <DualTabPanel
        panels={panels}
        onPanelsChange={setPanels}
        orientation="horizontal"
        defaultSplitRatio={0.5}
        allowTabSharing={true}
      />
    </div>
  );
}
```

## 📖 주요 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `panels` | `[Panel, Panel]` | ✅ | - | 두 개 패널의 설정 배열 |
| `onPanelsChange` | `(panels: [Panel, Panel]) => void` | ✅ | - | 패널 상태 변경 콜백 |
| `orientation` | `'horizontal' \| 'vertical'` | ❌ | `'horizontal'` | 레이아웃 방향 |
| `defaultSplitRatio` | `number` | ❌ | `0.5` | 초기 분할 비율 (0.1 - 0.9) |
| `allowTabSharing` | `boolean` | ❌ | `true` | 패널 간 탭 이동 허용 여부 |
| `minPanelSize` | `number` | ❌ | `100` | 패널 최소 크기 (픽셀) |
| `className` | `string` | ❌ | - | 추가 CSS 클래스명 |
| `style` | `React.CSSProperties` | ❌ | - | 인라인 스타일 |

### Panel 인터페이스

```typescript
interface Panel {
  id: string;           // 패널 고유 식별자
  tabs: Tab[];          // 탭 배열
  activeTabId: string;  // 현재 활성 탭 ID
}

interface Tab {
  id: string;                    // 탭 고유 식별자
  title: string;                 // 탭 제목
  content: React.ReactNode;      // 탭 내용
  closable?: boolean;            // 닫기 버튼 표시 여부 (기본: true)
}
```

## 🎨 스타일링

### CSS 클래스 구조

```css
/* 메인 레이아웃 */
.dualtab-panel { /* 메인 컨테이너 */ }
.tab-container { /* 개별 패널 */ }
.panel-splitter { /* 크기 조절 구분선 */ }

/* 탭 헤더 */
.tab-header { /* 탭 헤더 영역 */ }
.tab-header--scrollable { /* 스크롤 가능한 탭 헤더 */ }
.tab-header__item { /* 개별 탭 */ }
.tab-header__item--active { /* 활성 탭 */ }
.tab-header__item--dragging { /* 드래그 중인 탭 */ }
.tab-header__item--drag-over { /* 드래그 호버 중인 탭 */ }
.tab-header__title { /* 탭 제목 텍스트 */ }
.tab-header__close { /* 탭 닫기 버튼 */ }
.tab-header__close-icon { /* 닫기 아이콘 */ }
.tab-header__drop-indicator { /* 드롭 위치 인디케이터 */ }
.tab-header__flex-drop-zone { /* 확장 가능한 드롭존 */ }

/* 탭 컨텐츠 */
.tab-content { /* 탭 내용 영역 */ }
.tab-content__empty { /* 빈 패널 기본 상태 */ }
.tab-content__empty--drag-active { /* 드래그 중일 때 빈 패널 */ }
.tab-content__empty--drag-over { /* 드래그 호버 중인 빈 패널 */ }
```

### 커스터마이징 예시

#### 탭 스크롤 커스터마이징
```css
/* 탭 너비 조정 */
.tab-header__item {
  min-width: 120px !important; /* 최소 탭 너비 변경 */
  max-width: 240px !important; /* 최대 탭 너비 변경 */
}

/* 스크롤바 스타일링 */
.tab-header::-webkit-scrollbar {
  height: 8px; /* 스크롤바 높이 조정 */
}

.tab-header::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.tab-header::-webkit-scrollbar-thumb {
  background: #007acc; /* 스크롤바 색상 */
  border-radius: 4px;
}

.tab-header::-webkit-scrollbar-thumb:hover {
  background: #005a9e; /* 호버 시 색상 */
}
```

#### 드래그앤드롭 피드백 커스터마이징
```css
/* 드롭 인디케이터 스타일링 */
.tab-header__drop-indicator {
  background-color: #1890ff; /* 드롭 위치 표시 색상 */
  width: 3px; /* 인디케이터 두께 */
}

/* 드래그 중인 탭 스타일 */
.tab-header__item--dragging {
  opacity: 0.5;
  transform: scale(0.95);
  z-index: 1000;
}

/* 빈 패널 드롭존 커스터마이징 */
.tab-content__empty--drag-over {
  background: linear-gradient(45deg, #e6f7ff, #f0f8ff);
  border: 2px solid #1890ff;
  border-radius: 8px;
}
```

#### 다크 테마 예시
```css
/* 다크 테마 */
.dualtab-panel.dark-theme {
  --bg-primary: #1f1f1f;
  --bg-secondary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --border-color: #404040;
  --accent-color: #007acc;
}

.dark-theme .tab-header__item {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border-color: var(--border-color);
}

.dark-theme .tab-header__item--active {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-bottom-color: var(--accent-color);
}
```

## ⚡ 성능 특징

- **ResizeObserver**: 패널 크기 변경을 효율적으로 감지하여 탭 레이아웃 자동 최적화
- **Debounced 계산**: 스플리터 드래그 중 300ms 지연으로 성능 향상
- **드래그 중 최적화**: 드래그 상태에서는 불필요한 스크롤 계산 생략
- **즉시 반응 드롭존**: 0.05초 빠른 전환으로 자연스러운 드래그 경험
- **메모이제이션**: useCallback을 활용한 불필요한 리렌더링 방지

## 🛡️ 타입 안전성

이 라이브러리는 TypeScript로 작성되어 완전한 타입 지원을 제공합니다:

```typescript
import type { 
  Panel, 
  Tab, 
  DualTabPanelProps,
  Orientation 
} from 'react-dualtab-panel/types';

// 모든 Props와 상태가 컴파일 타임에 검증됩니다
const panels: [Panel, Panel] = [/* ... */];
```

## 🤝 기여하기

이 프로젝트는 현재 개발 중으로, **1.0 정식 버전 배포 후 Contribution을 받을 예정**입니다!

관심 있으신 분들은 이슈나 디스커션에 의견을 남겨주세요. 피드백은 언제나 환영합니다! 🎉

## 📝 라이센스

**MIT License**

자유롭게 사용하시되, 책임은 본인에게 있습니다!

---

> 💡 **팁**: 이 라이브러리는 Toss Frontend Fundamentals 원칙을 따라 개발되었어요. 
> 가독성, 유지보수성, 그리고 예측 가능성을 중요하게 생각합니다!
