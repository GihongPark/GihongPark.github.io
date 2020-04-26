# CSS3 정리

## 애니메이션 효과
### 트랜지션(transition)
트랜지션은 css프로퍼티의 변화가 생길때, `일정시간`에 걸쳐 변화가 일어날 수 있게 한다.
[트랜지션 예제](https://codepen.io/gipark/pen/BaoRWOe)


* **transition-property** : 트랜지션의 대상을 지정한다.
```scss
transition-property: width, height;
```
* **transition-duration** : 트랜지션이 일어나는 시간을 지정한다.
```scss
transition-duration: 1s

// duration속성은 property와 1:1 대응한다.
// width는 1초 동안 height는 2초 동안 변한다.
transition-property: width, height;
transition-duration: 1s 2s;

// transition 프로퍼티로 축약이 가능하다.
transition: width 1s, height 2s;
```

* **transition-timing-function** : 트랜지션 변화 속도를 지정한다.

|프로퍼티|효과|
|----|----|
|ease|느리게 시작하여 빨라졌다 느려지면서 종료|
|linear|일정한 속도|
|ease-in|느리게 시작하여 일정한 속도로 종료|
|ease-out|일정한 속도로 시작하여 느려지면서 종료|
|ease-in-out|느리게 시작하여 빨라졌다 느려지면서 종료|

* **transition-delay** : 대기시간을 지정한다.

### 애니메이션(animation)
애니메이션은 트렌지션보다 세부적인 움직임을 제어할 수 있다.

* **animation-name** : 애니메이션의 이름을 지정한다.

* **animation-duration** : 애니메이션이 일어나는 시간을 지정한다.

* **animation-timing-function** : 애니메이션 변화 속도를 지정한다.

* **animation-delay** : 대기시간을 지정한다.

* **animation-iteration-count** : 애니메이션 재생 횟수를 지정한다.

* **animation-direction** : 애니메이션 진행 방향을 지정한다.

|프로퍼티|효과|
|----|----|
|normal|from(0%) 에서 to(100%)로 진행|
|reverse|normal과 반대로 진행|
|alternate|홀수번째는 normal, 짝수번째는 reverse로 진행|
|alternate-reverse|alternate와 반대로 진행|


#### @keyframes
애니메이션은 `@keyframes` rule을 사용하여 흐름을 제어한다.
[@keyframes 예제](https://codepen.io/gipark/pen/wvKddPW)



### 트랜스폼(transform)
트랜스폼은 요소에 이동(translate), 회전(rotate), 확대축소(scale), 비틀기(skew) 효과를 부여한다.

#### 이동
* **translate(x,y)** : 요소를 X,y만큼 이동
* **translate3d(x,y,z)** : (3D) 요소를 x,y,z만큼 이동
* **translateX(x)** : 요소를 X축으로 x만큼 이동
* **translateY(y)** : 요소를 Y축으로 y만큼 이동
* **translateZ(z)** : (3D) 요소를 Z축으로 z만큼 이동

#### 회전
* **rotate(angle)** : 요소를 angle만큼 회전
* **rotate3d(x,y,z)** : (3D) 요소를 X축으로 x각도, Y축으로 y각도, Z축으로 z각도 회전
* **rotateX(x)** : (3D) 요소를 X축으로 x각도 회전
* **rotateY(y)** : (3D) 요소를 Y축으로 y각도 회전
* **rotateZ(z)** : (3D) 요소를 Z축으로 z각도 회전

#### 확대 축소
* **scale(x,y)** : 요소의 크기를 X축으로 x배, Y축으로 y배 확대 또는 축소
* **scale3d(x,y,z)** : (3D) 요소의 크기를 X축으로 x배, Y축으로 y배, Z축으로 z배 확대 또는 축소
* **scaleX(x)** : 요소의 크기를 X축으로 x배 확대 또는 축소
* **scaleY(y)** : 요소의 크기를 Y축으로 y배 확대 또는 축소
* **scaleY(z)** : (3D) 요소의 크기를 Z축으로 z배 확대 또는 축소

#### 비틀기
* **skew(x-angle,y-angle)** : 요소를 X축으로 x 각도만큼, Y축으로 y 각도만큼 비틂
* **skewX(x-angle)** : 요소를 X축으로 x 각도만큼 비틂
* **skewY(y-angle)** : 요소를 Y축으로 y 각도만큼 비틂


## 반응형 웹
### viewport
뷰포트는 웹페이지의 가시영역을 의미한다. 이 뷰포트를 이용하여 각 디바이스에 최적화된 웹페이지를 제공할 수 있다.
#### viewport meta tag
|프로퍼티|설명|
|----|----|
|width|viewport 너비|
|height|viewport 높이|
|initial-scale|viewport 초기배율|
|user-scale|확대 축소 가능 여부|
|maximum-scale|viewport 최대 배율|
|minimum-scale|viewport 최소 배율|
```html
<!-- meta tag 예시 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### @media
미디어 쿼리는 화면 크기에 따른 각각의 속성 값을 지정하기 위해 사용한다.
```scss
@media only all and ( 조건문 ) { 실행문 }
```
* **only** : 미디어 쿼리 구문을 해석하라는 명령어 (생략 가능)
* **all** : 미디어 쿼리를 해석해야 할 대상 (생략 가능)
    * all : 모든 미디어
    * print : 인쇄 장치
    * screen : 스크린
    * aural : 화면을 읽어 소리로 출력해주는 장치
    * tv : tv
    * handheld : 손에 들고 다니는 장치
    * projection : 프로젝터
* **and** : 앞과 뒤의 조건을 나타냄 (생략 가능)
* **( 조건문 )** : 해당 조건 설정
    * width : viewport 너비
    * height : viewport 높이
    * orientation : 디바이스 방향(가로 : landscape, 세로 : portrait)
    * resolution : 디바이스 해상도
* **{ 실행문 }** : 조건에 따른 실행 설정
```scss
/* sample */
/* All Device */

/* Large Devices, Wide Screens : ~ 1200px */
@media only screen and (max-width : 1200px) {

}
/* Medium Devices, Desktops : ~ 992px */
@media only screen and (max-width : 992px) {

}
/* Small Devices, Tablets : ~ 768px */
@media only screen and (max-width : 768px) {

}
/* Extra Small Devices, Phones : ~ 480px */
@media only screen and (max-width : 480px) {

}
/* Custom, iPhone Retina : ~ 320px */
@media only screen and (max-width : 320px) {

}
```