# Node.JS

- Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임

- 자바스크립트가 독립적으로 동작할 수 있는 환경

## Node.Js 구조

- Single Thread: 작업을 처리하는 곳이 하나

- Non-blocking I/O: 앞선 작업이 오래 걸릴 경우, 먼저 처리된 결과를 리턴

```
- Node.js Core Library
- Node.js Bindings(API)
- V8
- Libuv: Event queue, Event Loop, Worker Thread Pool, I/O Polling
```

## Node.Js 특징

- NPM(Node Package Manager)

  - Node.js의 패키지를 관리할 수 있는 도구

  - 다야한 내부, 외부 모듈(패키지) 제공 -> 필요한 기능들이 미리 구현되어 있는 경우가 많음

  > Node.js의 개발을 도와주는 nvm, npx, yarn 등의 다양한 툴 사용 가능

## express

- 전 세계에서 가장 많이 사용되는 웹 프레임워크

- 웹 프레임워크: 많은 기능들이 미리 구현해놓은 도구로 이 동작 방식과 구조를 이해하면 빠르고 효율적인 개발 가능

- middleware(미들웨어)의 연결

  - middleware(미들웨어): 요청과 응답 사이에서 목적에 맞는 일을 수행하는 함수

  ```
  request -> middleware(미들웨어) -> middleware(미들웨어) -> middleware(미들웨어) -> response
  ```

## Template engine 템플릿 엔진

- Nunjucks 넌적스

  ```
  변수: {{ 변수명 }}
  반복: {% for x in a %} ... {% endfor %}
  조건: {% if X %}
      {% elif %}
      {% else %}
      {% endif %}
  레이아웃: {% extends 'base.html' %}
          {% block content %} ... {% endblock %}
  병합: {% include 'footer.html' %}
  ```

- example

  ```
  {% extends 'base.html' %}

  {% block header %}
  <h1>{{ title }}</h1>
  {% endblock %}

  {% block content %}
    <ul>
      {% for item in items %}
        <li>{{ item }}</li>
      {% endfor %}
    </ul>
  {% endblock %}
  ```

## MongoDB

- Schema: Node.js에서 데이터 처리를 쉽게 해줄 수 있는 스키마 기능 제공

- Schema 종류

  - String

  - Number

  - Date

  - Boolean

  - Buffer

  - Mixed(모든 데이터 타입 가능)

  - ObjectedId(객체 Id)

  - Array(배열)
