/**
 * Cron 표현식 검증 결과 표시 컴포넌트
 */
export const CronExampleDisplay = ({ errorMessage, exampleList }) => {
  return (
    <div style={{ fontSize: '.815rem', color: '#999', marginTop: '1rem' }}>
      {errorMessage ? (
        <div>
          <strong style={{ color: '#900' }}>오류</strong> : {errorMessage}
        </div>
      ) : (
        <div>
          <h4 style={{ marginTop: 0, marginBottom: '.25rem' }}>
            다음 스케쥴 예제
          </h4>
          {exampleList.length === 0 ? (
            <div>- 스케쥴 없음</div>
          ) : (
            exampleList.map((item, idx) => <div key={idx}>{item}</div>)
          )}
        </div>
      )}
    </div>
  );
};
