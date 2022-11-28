<h1>🧢 [너의트렌드] NuT</h1>

사이트 : https://jihoon8730.github.io/nutSide/

<h3>💡 프로젝트 목표</h3>

<p> - 본인의 스타일 이나 옷 사진을 올리고 자유롭게 의견을 주고 받을 수 있는 커뮤니티</p>
<p> - 대상 : 20대 대학생, 30대 직장인</p>
<p> - 옷을 입는 스타일을 공유하고 옷 구매에 대한 구매처를 공유함</p>

<h3>🗓 참여 & 기간<h3>

<p>2022. 11. 02 ~ 2022. 11. 14</p>
<p>신지훈(jihoon8730)</p>

<hr />

<h3>🌈 디자인</h3>

- 디자인 참고<br />
  https://wwit.design/2021/03/31/29cm/ (29CM)<br />
  https://www.pinterest.co.kr/pin/578149670929241788/ (레이아웃 디자인 샘플)<br />
  https://www.pinterest.co.kr/pin/422281201614997/ (레이아웃 디자인 샘플)

🌈 Figma(피그마)

[NuT와이어프레임](https://www.figma.com/file/G99c5ynwPsde6v10PLoZbV/NuT-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1&t=R7FfDkpq1mCjV7Y7-1)

<hr />

<h3>📚 기술 </h3>
<div>
  <img src="https://img.shields.io/badge/HTML5-red?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/Sass-pink?style=for-the-badge&logo=Sass&logoColor=white">
  <img src="https://img.shields.io/badge/Javascript-yellow?style=for-the-badge&logo=Javascript&logoColor=white">
  <img src="https://img.shields.io/badge/React-skyblue?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-orange?style=for-the-badge&logo=Firebase&logoColor=white">
</div>

<h3>💡 페이지</h3>
- Home (메인) <br />
- Auth (로그인) <br />
- Post (스타일 등록) <br />
- Postlist (유저 스타일 리스트) <br />
- Mylist (본인 스타일 리스트)

### 💡 깨달은 점

- **프로젝트의 Github Pages를 통해 배포까지 경험하면서 유저들의 피드백을 직접 받아 수정 했습니다**
- **리액트를 프로젝트에 적용함으로써의 이점**
  - SPA의 장점은 새로고침을 하여도 기존의 사용하던 데이터를 재랜더링하지 않기 때문에 데이터를 불러오는 속도 측면에서 빠르게 화면을 전환할 수 있고 이미지도 로드할 수 있습니다
  - 리액트의 우수한 라이브러리 중 가장 많이 사용되는 리액트 라우터를 통해 페이지를 관리하고 DB에 저장된 데이터를 가장 상위 컴포넌트에서 관리하여 내려 줄 수 있습니다 이로 인해 데이터 처리 속도가 향상 됩니다
- **Firebase를 적용함으로써의 이점**

  - No-SQL을 사용하여 프론트엔드 개발자들도 비교적 간단하게 DB에 데이터를 저장하고 사용 할 수 있고 JSON 형식과 비슷한 구조로 이루어져 있어 데이터 객체에 접근하는 것이 익숙합니다.
  - Firebase만의 CRUD를 구현할 수 있는 문법이 존재하고 문법이 어렵지 않기 때문에 이후 많이 사용되는 Node.js와 Express의 마이그레이션을 고려해 볼 수 있기에 확장성 측면에서도 좋다고 판단 하였습니다.

- **보완해야 할 점**
  - 프로젝트의 Root상 컴포넌트안에 컴포넌트가 여러개 존재하는 경우 데이터를 PROPS하고 또 PROPS하는 (프롭스드릴) 현상 발생하기 때문에 전역 상태관리를 할 수 있는 redux 사용을 고려 해봐야 합니다 redux사용 시 무분별하게 데이터를 두번 받아오게되는 비효율적인 데이터처리를 막을 수 있으며 전역상태관리를 통해 데이터를 관리하는 측면에서도 좋은 가독성을 보여 줄 수 있는 코드로 예상 합니다

<h3>💡 화면 </h3>
<img width="1765" alt="스크린샷 2022-11-15 오후 4 32 14" src="https://user-images.githubusercontent.com/88140865/201857597-3ae45f43-d285-4a3b-bccd-f9db28b439b3.png">
<h3>💡 반응형 </h3>
<div>
  <img src="https://user-images.githubusercontent.com/88140865/201858290-1680d4f4-c516-4aab-8c3b-f69fe625d6f8.png" width="200px" />
  <img src="https://user-images.githubusercontent.com/88140865/201858356-fb956e68-a3dd-4033-9520-5c74789d6638.png" width="200px" />
  <img src="https://user-images.githubusercontent.com/88140865/201858370-18b80d17-baf5-45ca-bc55-3e97c6fea1e7.png" width="200px" />
</div>
