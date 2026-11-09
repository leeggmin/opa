import { Fragment } from 'react';
import { CRON_SYNTAX_HELP } from '../model/utils';

export const CronSyntaxHelp = () => {
  return (
    <div
      style={{
        fontSize: '.95rem',
        color: '#999',
        marginTop: '1rem',
      }}
    >
      <h4 style={{ marginTop: '1rem', marginBottom: 0 }}>
        {CRON_SYNTAX_HELP.title}
      </h4>
      <pre
        ref={(node) => {
          if (node)
            node.setAttribute(
              'style',
              'font-family: consolas, monaco, monospace !important; margin: .1rem 0;',
            );
        }}
      >
        {CRON_SYNTAX_HELP.pattern}
        <br />
        {CRON_SYNTAX_HELP.description.map((line, idx) => (
          <Fragment key={idx}>
            {line}
            <br />
          </Fragment>
        ))}
        {CRON_SYNTAX_HELP.examples.map((example, idx) => (
          <Fragment key={idx}>
            예시) {example}
            <br />
          </Fragment>
        ))}
      </pre>
    </div>
  );
};
