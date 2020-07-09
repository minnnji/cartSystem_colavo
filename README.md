# Cart System
개발기간 (2020.05.30. ~ 2020.06.02.)

![colavo_preview](./colavo_preview.gif)

## Features

- 해당 살롱에서 적용 가능한 시술, 장바구니에 추가/삭제 기능
  - '시술 추가' 버튼으로, 복수 개의 시술 선택 가능
  - 동일한 시술 중복 선택 불가
  - 수량 설정 가능, 하단 총 결제금액에 반영
- 해당 살롱에서 적용 가능한 할인, 장바구니 추가/삭제 기능
  - '할인 추가'버튼으로, 복수 개의 할인 선택 가능
  - 동일한 할인 중복 선택 불가
  - 할인 적용대상 시술 선택 가능
- 장바구니 내용 변경될 때 마다 총 결제 금액 업데이트

## Run

```
$ git clone https://github.com/minnnji/cartSystem_typeScript
$ cd cartSystem_typeScript
$ npm install
$ npm start
```

## Skills

- TypeScript
- React를 활용, 컴포넌트 베이스 UI 아키텍처 구현
- React Router를 활용한 routing
- Recoil.js를 활용한 State Management
- Promise 베이스의 axios로 HTTP 요청
- Styled-components을 통한 리액트 컴포넌트 스타일링

## Challenges

- TypeScript를 처음 사용하여 짧은 기간 내 기초 공부와 함께, 기능을 구현하는 데에 어려움이 있었습니다.  
  러닝커브가 높을거라는 부담을 원동력삼아 기본 내용을 찬찬히 살펴보며 익혔고, 최대한 타입을 자세히 지정하며 장단점을 느껴보겠다는 마음으로 과제에 임하였습니다.  
  그런 탓에 과제 시작이 조금 늦어져 일정 관리가 쉽지 않았지만, TypeScript를 짧은 시간에 조금이나마 경험해본 것이 좋은 경험이 되었습니다.  
  처음에는 타입이 맞지 않을 때 바로 오류를 여기저기서 보여주는 것이 당황스러웠는데, 몇 번 반복적으로 해결해가며 개발 단계에 IDE상으로 오류를 바로바로 확인한다는 장점을 체감하였습니다.  
  앞으로 더 깊이 공부해가며 새로운 내용들을 습득하면서, 이번에 잘못 사용한 내용이나 개선할 내용들을 함께 살펴보려합니다.
- Facebook에서 최근에 발표한 상태 관리 라이브러리 Recoil.js를 적용해보았습니다.  
  기존에 가볍게 사용해보긴 했었지만 중요한 과제에서 레퍼런스가 많지 않은 새로운 것을 적용해 본다는 것이 쉽지 않았는데, 공식 문서를 계속 읽어가며 redux와 비교하여 이해해보았습니다.  
  Redux가 여러모로 번거롭다는 생각을 했었는데, 한결 간단하게 상태를 관리하게 된 느낌을 받아 만족스러웠습니다.  
  우선은 간단한 기능들로만 사용해보았는데, 추후 토이프로젝트를 하게 되면 더 추가될 기능들도 공부하여 적용해 볼 예정입니다.
