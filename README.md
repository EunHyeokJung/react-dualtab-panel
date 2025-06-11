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

사이드 프로젝트에 있던 코드를 옮기고 있어서, 아직 기본적인 기능만 구현되어 있어요.

- **듀얼 독립 패널**: 각 패널은 독립적인 탭을 가져요
- **탭 드래그앤드롭**: 탭 순서 변경 및 패널 간 이동 지원
  - **빈 패널 드롭 지원**: 모든 탭이 제거된 빈 패널에도 탭을 드롭할 수 있어요
  - **시각적 피드백**: 드래그 중 드롭 가능한 영역과 호버 상태를 명확하게 표시해요
  - **탭 공유 제어**: 패널 간 탭 이동을 허용/차단할 수 있어요
- **레이아웃 지원**: 수평/수직 분할 레이아웃 변경이 가능해요
- **크기 조절**: 패널 간 드래그로 크기 조절이 가능해요
- **반응형**: 반응형 디자인으로 설계되어 있어요
- **커스터마이징**: CSS 클래스 기반으로 완전한 스타일 커스터마이징 지원

## 📋 향후 계획

- 코드 품질 검토
- 테스트 코드 작성
- 몇가지 기능 개발과 모드 추가
  - ✅ 드래그 앤 드랍으로 탭 순서 이동 (기본 구현 완료)
  - ✅ 빈 패널 드래그앤드롭 지원 (버그 수정 완료)
  - ✅ 탭 공유 제어 옵션 (allowTabSharing 구현 완료)
  - 하이라키 모드(좌측이 부모 페이지, 우측이 자식 페이지) 개발 예정
- js 버전 제작
- 최종 목표: npm에 배포!!

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

Ant-design의 SideMenu 상태 관리 방법과 비슷하게 만들었어요.

```tsx
import React, { useState } from 'react';
import { DualTabPanel } from './src';
import type { Panel } from './src/types';

function App() {
  const [panels, setPanels] = useState<[Panel, Panel]>([
    {
      id: 'left',
      tabs: [
        { 
          id: 'tab1', 
          title: 'Dashboard', 
          content: <div>Awesome Dashboard Content</div> 
        }
      ],
      activeTabId: 'tab1'
    },
    {
      id: 'right',
      tabs: [
        { 
          id: 'tab2', 
          title: 'Settings', 
          content: <div>Awesome Preference Page?</div> 
        }
      ],
      activeTabId: 'tab2'
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

## 🎨 스타일링

기본 CSS 클래스들을 오버라이드하여 커스터마이징 가능합니다.

```css
/* 메인 레이아웃 */
.dualtab-panel { /* 메인 컨테이너 */ }
.tab-container { /* 개별 패널 */ }
.panel-splitter { /* 크기 조절 구분선 */ }

/* 탭 헤더 */
.tab-header { /* 탭 헤더 영역 */ }
.tab-header__item { /* 개별 탭 */ }
.tab-header__item--active { /* 활성 탭 */ }
.tab-header__item--dragging { /* 드래그 중인 탭 */ }
.tab-header__item--drag-over { /* 드래그 호버 중인 탭 */ }
.tab-header__close { /* 탭 닫기 버튼 */ }
.tab-header__drop-indicator { /* 드롭 위치 인디케이터 */ }

/* 탭 컨텐츠 */
.tab-content { /* 탭 내용 영역 */ }
.tab-content__empty { /* 빈 패널 기본 상태 */ }
.tab-content__empty--drag-active { /* 드래그 중일 때 빈 패널 */ }
.tab-content__empty--drag-over { /* 드래그 호버 중인 빈 패널 */ }
```

### 빈 패널 스타일 커스터마이징 예시

```css
/* 빈 패널 커스터마이징 */
.tab-content__empty {
  color: #999;
  font-size: 14px;
}

.tab-content__empty--drag-active {
  background-color: #f5f5f5;
  border: 2px dashed #d9d9d9;
}

.tab-content__empty--drag-over {
  background-color: #e6f7ff;
  border: 2px solid #1890ff;
}
```

## 🤝 기여하기

이 프로젝트는 아직 개발 중으로, 1.0 배포 후 Contribute를 받을 예정이에요!

## 📝 라이센스

**MIT License**

자유롭게 사용하시되, 책임은 본인에게 있습니다!

---
