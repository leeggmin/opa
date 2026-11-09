/**
 * Predicate 데이터 준비 함수
 */
export const preparePredicateData = (params) => {
  const prepared = { ...params };

  if (prepared.predicateType === 'METHOD') {
    prepared.key = Object.keys(prepared.methods)
      .filter((method) => prepared.methods[method])
      .join(',');
  } else if (prepared.predicateType === 'HOST') {
    prepared.key = prepared.hostnames
      .split('\n')
      .map((hostname) => hostname.trim())
      .filter((hostname) => hostname)
      .join(',');
  } else if (prepared.predicateType === 'PATH') {
    prepared.key = prepared.paths
      .split('\n')
      .map((path) => path.trim())
      .filter((path) => path)
      .join(',');
  } else if (prepared.predicateType === 'WEIGHT') {
    let definition = parseInt(prepared.weight);
    if (isNaN(definition)) {
      definition = 1;
    }
    prepared.definition = definition;
  }

  return prepared;
};
