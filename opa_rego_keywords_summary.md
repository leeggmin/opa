# OPA Rego 예약어 및 규칙 요약

> OPA 정책 언어 Rego 기준. `allow`와 `deny`는 예약어가 아니라 개발자가 정의한 규칙 이름입니다.

## 1. 예약어 및 예약된 이름

| 분류        | 키워드·이름                                   | 역할                                                                         |
| ----------- | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| 정책 선언   | `package`, `import`, `as`                | 패키지 및 참조 선언                                                          |
| 규칙 정의   | `default`, `if`, `else`, `contains`    | 기본값, 조건, 분기, 집합 생성                                                |
| 조건·반복  | `not`, `in`, `some`, `every`, `with` | 부정, 포함 여부, 순회, 전체 검사, 입력 대체                                  |
| 특수 참조   | `input`, `data`                            | 요청 데이터 및 로드된 정책·데이터 참조                                      |
| 상수        | `true`, `false`, `null`                  | 불리언, null                                                                 |
| 추가 키워드 | `and`, `or`                                | 논리 연산. 별도 `future.keywords.and` / `future.keywords.or` import 필요 |

이 이름들은 규칙 이름이나 변수 이름으로 사용할 수 없습니다. `and`, `or`는 예약되어 있지만 **일반 Rego v1에서 바로 사용할 수 없고 별도 import가 필요**합니다.

## 2. 사용자 정의 규칙과 내장 함수

```rego
package deploy

import rego.v1

default allow := false

allow if {
    valid_input
    count(deny) == 0
}

deny contains "Privileged containers are forbidden." if {
    input.privileged == true
}
```

| 코드                                                       | 구분                            |
| ---------------------------------------------------------- | ------------------------------- |
| `package`, `import`, `default`, `if`, `contains` | 예약어                          |
| `input`, `false`                                       | 예약된 이름·상수               |
| `allow`, `deny`, `valid_input`                       | **사용자 정의 규칙 이름** |
| `count()`                                                | **내장 함수**             |

## 3. 여러 `deny`가 연결되는 이유

```rego
deny contains "latest 태그 금지" if {
    endswith(input.image, ":latest")
}

deny contains "특권 컨테이너 금지" if {
    input.privileged == true
}
```

- 같은 패키지의 `deny contains ...` 규칙은 결과를 **하나의 집합(Set)** 으로 합칩니다.
- `allow`의 `count(deny) == 0`은 위반 메시지가 없는지 확인합니다.
- **`deny`는 특별한 예약어가 아닙니다.** `allow`가 `deny` 규칙을 참조하므로 평가됩니다.
- 이름을 `violations`로 바꿔도 Rego 자체에서는 동일하게 동작합니다. 단, 일부 외부 도구는 `deny`라는 이름을 관례로 사용합니다.

## 4. 핵심 요약

**예약어는 문법**, **내장 함수는 연산**, **사용자 정의 규칙은 정책 판단 로직**입니다.

OPA 1.0 이상에서는 Rego v1 문법이 기본이므로 `import rego.v1`을 생략할 수 있습니다.

## 공식 참고 자료

- [Rego Policy Reference — Reserved Names &amp; Keywords](https://www.openpolicyagent.org/docs/policy-reference)
- [contains 키워드](https://www.openpolicyagent.org/docs/policy-reference/keywords/contains)
- [import / Rego v1](https://www.openpolicyagent.org/docs/policy-reference/keywords/import)
