# Sass

## 설치
```javascript
$npm i node-sass
```

## 변수
1. `$변수명 : 값`으로 지정
2. 스코프 - 블록 레벨 스코프를 가짐

## 데이터 타입
1. 숫자 - 1, 10, 10px
2. 문자열 - 따옴표('') 사용 여부와 상관없이 문자열 그대로 출력됨
3. 색 - red, #ff0000, rgba(255, 0, 0, 1)
4. boolean - true, false
5. null - null 값인 변수는 출력되지 않음
6. list -  공백 또는 콤마로 구분된 값 ex) 10px 20px 10px 20px
7. map -  key : value

## Nesting
서브루틴 안에 다른 서브루틴을 넣는 것
```scss
// scss
div {
    p {  // 후손 셀렉터를 간결하게 작성할 수 있다.
        color: #ff0000;
    }
}
div {
    p {
        font: {  // 프로퍼티도 간결하게 작성할 수 있따.
            size: 10px;
            weight: 500;
        }
    }
}
```
```scss
// css
div p { color: #ff0000; }
div p {
    font-size: 10px;
    font-weight: 500;
}
```
`&`를 사용하여 상위 요소를 참조할 수 있다
```scss
div.someclass {
    &:hover {
        background-color:#ff0000;
    }
    &_children {  // 클래스명도 바꿀수 있다 => .someclass_children
        background-color:#0000ff;
    }
}
```

## @import
@import 지시어를 통해 css, scss, sass파일을 import 가능
```scss
@import 'foo.scss';

@import 'foo'; // 확장자는 생략 가능하다

@import 'foo' 'bar'; // 여러 파일을 가져올수 있다
```

## @extend
@extend 지시어를 사용하여 기존 스타일을 상속 가능
```scss
.someclass {
    border: 1px solid #000000;
    padding: 10px;
}
.foo {
    @extend .someclass;
    color: #ff0000;
}
.bar {
    @extend .someclass;
    color: #0000ff;
}
```

## @mixin
@mixin 지시어는 공통적인 css값을 묶어 재사용 가능하도록 하는 것
`@mixin`으로 선언하고 `@include`로 호출한다
```scss
@mixin circle($r : 10px) {  // 파라미터를 받을 수 있고 초기값도 설정할 수 있다
    width: $r * 2;
    height: $r * 2;
    border-radius: 50%;
}

.circle {
    @include circle(50px);
    background: #ff0000;
}
```

## @function
`@mixin`과는 다르게 @function 지시어는 `@return` 지시어를 사용하여 리턴값을 반환하는 용도로 사용
```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

## 조건문
#### if()
```scss
$flag = false
div {
    background: if($flag == false , red, blue);
}
```
#### @if
```scss
$color = red;
div {
    @if $color == red {
        background: red;
    } @else if $color == blue {
        background: blue;
    } @else {
        background: black;
    }
}
```

## 반복문
#### @for
```scss
@for $i from 1 through 3 {
    .item-#{$i} { width: 2em * $1; }
}
```
#### @each
```scss
@each $animal in puma, sea-slug, egret, salamander {
    .#{$animal}-icon {
        background-image: url('/images/#{$animal}.png');
    }
}
```
#### @while
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

## #{}(Interpolation)
```scss
$name: foo;
$attr: border;

p.#{$name} {  // #{}를 사용하면 셀렉터에서도 변수 사용 가능하다
    #{$attr}-color: blue;  // 프로퍼티명으로도 사용 가능하다
}
.someclass {
    $font-size: 12px;
    $line-height: 30px;
    font: #{$font-size} / #{$line-height};  // #{}는 연산 하지 않는다
}
```

## !default
```scss
$content: 'first content' !default;  // !default는 할당되지 않은 변수에 초기값을 설정한다
$content: 'second content'; // 변수에 다른 값이 할당되면 초기값은 적용되지않는다
```